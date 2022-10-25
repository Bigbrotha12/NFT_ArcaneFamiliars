import { extractStringEnvVar, extractNumberEnvVar } from "./Environment";
import { Collections, Familiar, Rarity, User } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { 
    MongoClient, MongoClientOptions, Collection, AggregationCursor, 
    BulkWriteOptions, TransactionOptions,ReadPreference,
    ClientSession, Db, Document
} from "mongodb";

export class Database implements IDatabase {
    client: MongoClient | undefined;
    URI: string;
    namespace: string;
    options: MongoClientOptions;

    constructor() {
        this.URI = extractStringEnvVar("MONGODB_URI");
        this.namespace = extractStringEnvVar("MONGODB_NS");
        this.options = { w: "majority" };
    }
    
    /**
     * Initializes connection to MongoDB server. Must be run prior
     * to any database query.
     */
    async init(): Promise<void | undefined> {
        try {
            this.client = await MongoClient.connect(this.URI, this.options);
        } catch (error: any) {
            Database.handleDBError(error);
        }
    }

    /**
     * Getter for initialization status
     * @returns true if DB connection client is defined
     */
    isInitialized(): boolean {
        return this.client !== undefined;
    }

    /**
     * Getter function for registered familiars
     * @param tokenId id of token being queried
     * @returns Familiar document for token id
     */
    async getFamiliarByID(tokenId: number): Promise<Familiar | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.Familiar);
        let cursor: AggregationCursor<any>;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: tokenId }}
            ]);

            const result: Array<Familiar> | undefined = await cursor.toArray();
            const document: Familiar | undefined = result?.shift();

            // check if query returned no documents
            if(document === undefined){
                console.info("Query returned no documents");
                return undefined;
            }

            return document;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Core logic for IMX Minting workflow. Gets all NFTs marked as pending
     * for signing and sending to IMX L2.
     * @returns Array of Familiar to be minted
     */
    async getPendingMints(): Promise<Familiar[] | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.Familiar);
        let cursor: AggregationCursor<any>;
        try {
            cursor = collection.aggregate([
                { '$match': { 'meta.status': 'Pending' }}
            ]);
            const result: Array<Familiar> | undefined = await cursor.toArray();

            // check if query returned no documents
            let test: Familiar | undefined = result?.at(0);
            if(test === undefined || Object.keys(test).length === 0){
                console.info("Query returned no documents");
                return undefined;
            }

            return result;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Function checking mint status of specific token id.
     * @param tokenId id of token to be checked
     * @returns return string status either "Minted" or "Pending"
     */
    async getMintStatus(tokenId: number): Promise<string | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.Familiar);
        const batchSize: number = extractNumberEnvVar("BATCH_SIZE");
        let cursor: AggregationCursor<any>;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: tokenId }},
                { "$project": { meta: 1 }},
                { "$limit": { batchSize }}
            ]);

            let result: Array<Familiar> | undefined = await cursor.toArray();
            let document: Familiar | undefined = result?.shift();
                
            // check if query returned no documents
            if(document === undefined){
                console.info("Query returned no documents");
                return undefined;
            }
            
            return document.meta?.status;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }
    
    /**
     * Updater function for IMX Minting workflow. Marks NFT as 
     * minted after successful response from IMX.
     * @param tokens Array of Familiar to be marked as "Minted"
     * @returns Promise resolving to true on successful update
     */
    async updatePendingMints(tokens: Familiar[]): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.Familiar);
        const options: BulkWriteOptions = { ordered: false };
        const operations = tokens.map(token => {
            return {
                updateOne: {
                    filter: { _id: token._id },
                    update: 
                    { 
                        "$set": 
                        {
                            "meta.status": "Minted", 
                            "meta.mint_timestamp": Math.floor(Date.now()/1000) 
                        }
                    }
                }
            }
        });

        try {
            await collection.bulkWrite(operations, options);
            return true;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Core logic for Familiar registration workflow. Update process must be 
     * atomic in order to maintain data integrity. Records are labeled as "Pending"
     * and will be picked up by Minter service for bulk minting in IMX L2.
     * @param template Familiar template to generate new familiar
     * @param user User who will receive NFT
     * @returns Promise resolving to true on successful registration
     */
    async registerNewFamiliar(template: Familiar, user: User): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
    
        // Prepare for transaction    
        const session: ClientSession = this.client.startSession();
        const familiarsCol: Collection = this.client.db(this.namespace).collection(Collections.Familiar);
        const templatesCol: Collection = this.client.db(this.namespace).collection(Collections.Template);
        const userCol: Collection = this.client.db(this.namespace).collection(Collections.User);
        const db: Db = this.client.db(this.namespace);
        const transactionOptions: TransactionOptions | any = { 
            readPreference: ReadPreference.PRIMARY
        };
     
        try {
            await session.withTransaction(async () => {
                // stage 1: Get and Update token id counter
                // command returns { value: original_document }
                const counter: Document = await db.command(
                {
                    findAndModify: Collections.Counter,
                    query: { name: "token_ids" },
                    update: { $inc: { value: 1 }}
                }, { session });

                // stage 2: Update template mint count
                await templatesCol.updateOne(
                    { name: template.name }, 
                    { "$inc": { "meta.minted": 1 }}, 
                    { session });

                // stage 3: Update user's mint count, active timestamp and progress
                await userCol.updateOne(
                    { _id: user._id }, 
                    { 
                        "$inc": { total_minted: 1 },
                        "$set": 
                        { 
                            last_active_timestamp: Math.floor(Date.now()/1000),
                            "saveData.progress": [0, 0, 0, 0] 
                        }
                    },
                    { session });

                // stage 4: Create new familiar record based on template
                await familiarsCol.insertOne(
                    {
                        ...template,
                        _id: counter.value.value,
                        meta: 
                        {
                            status: "Pending",
                            mint_timestamp: 0,
                            origin_owner: user._id
                        }
                    },
                    { session });
            }, transactionOptions);
        } catch (error) {
            return Database.handleDBError(error);
        } finally {
            await session.endSession();
            return true;
        }
    }

    /**
     * Core logic for Familiar registration workflow. Select list of familiar templates
     * to generate new familiar asset.
     * @param tier Array of rarities to choose familiar from
     * @returns Promise resolving to array of Familiar templates
     */
    async getTemplatesByTier(tier: Rarity[]): Promise<Array<Familiar> | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const generation: number = extractNumberEnvVar("CURRENT_GENERATION");
        const collection: Collection = this.client.db(this.namespace).collection(Collections.Template);
        let cursor: AggregationCursor<any>;
        
        try {
            cursor = collection.aggregate([
            {
                rarity: { "$in": tier },
                generation: generation,
                "$expr": { "$lt": [ "$meta.minted", "$meta.limit" ]}
            }]);
        
            const result: Array<Familiar> | undefined = await cursor.toArray();

            // check if query returned no documents
            let test: Familiar | undefined = result?.at(0);
            if(test === undefined || Object.keys(test).length === 0){
                console.info("Query returned no documents");
                return undefined;
            }
            return result;
        }
        catch (error: any) {
            return Database.handleDBError(error);
        }
    }   

    /**
     * Getter for user data by eth address.
     * @param address eth address of user requesting mint
     * @returns user data document
     */
    async getUserByAddress(address: string): Promise<User | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.User);
        let cursor: AggregationCursor<any>;

        try {
            cursor = collection.aggregate([
                { "$match": { _id: address }}
            ]);

            const result: Array<User> | undefined = await cursor.toArray();
            const document: User | undefined = result?.shift();
            // check if query returned no documents
            if(document === undefined){
                console.info("Query returned no documents");
                return undefined;
            }
            return document;

        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Helper function for logging database error.
     * @param error unknown error thrown by MongoDB driver
     * @returns undefined value to be handled by higher-level functions
     */
    static handleDBError(error: any): undefined {
        console.error(error.stack);
        return undefined;
    }
}