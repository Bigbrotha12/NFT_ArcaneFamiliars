import { extractNumberEnvVar, extractStringEnvVar } from "./Environment";
import { Ability, Collections, Familiar, Query, Rarity, Session, User } from "./Definitions";
import IDatabase from "./IDatabase";
import { 
    MongoClient, MongoClientOptions, Collection, AggregationCursor, ClientSession, 
    TransactionOptions, ReadPreference, Db, UpdateOptions, UpdateResult
} from "mongodb";

export default class Database implements IDatabase {
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
     * Token ID Metadata
     * @param tokenId token ID being queried
     * @returns Metadata for given token ID as well as mint status
     */
    async getTokenMetadata(tokenId: number): Promise<Familiar> {
        if(this.client === undefined) {
            throw new Error("Database not initialized");
        }

        const collection: Collection<Familiar> = this.client.db(this.namespace).collection<Familiar>(Collections.Familiar);
        let cursor: AggregationCursor<Familiar>;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: tokenId }}
            ]);

            const documents: Array<Familiar> = await cursor.toArray();
            const familiar: Familiar | undefined = documents.shift();

            // check is document is empty
            if(!familiar || Object.keys(familiar).length === 0) {
                throw new Error("Nonexistent token id");
            }

            return familiar;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Getter for Familiar descriptions
     * @param q Query parameter be either Familiar template ID or name
     * @returns Familiar template data
     */
    async getFamiliar(q: Query): Promise<Familiar> {
        if(this.client === undefined) {
            throw new Error("Database not initialized");
        }

        let query;
        if(q.id) { query = { _id: q.id };} else 
        if (q.name) { query = { name: q.name };} else 
        { 
            throw new Error("ID or name required for query")
        }

        const collection: Collection<Familiar> = this.client.db(this.namespace).collection<Familiar>(Collections.Template);
        let cursor: AggregationCursor<Familiar>;
        try {
            cursor = collection.aggregate([
                { "$match": query }
            ]);

            const documents: Array<Familiar> = await cursor.toArray();
            const familiar: Familiar | undefined = documents.shift();

            // check is document is empty
            if(!familiar || Object.keys(familiar).length === 0) {
                throw new Error("Nonexistent token id");
            }

            return familiar;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Getter for ability descriptions.
     * @param q Query parameter can be either ability number ID or ability string name
     * @returns Ability descriptions
     */
    async getAbility(q: Query): Promise<Ability> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        let query;
        if(q.id) { query = { _id: q.id };} else 
        if (q.name) { query = { name: q.name };} else 
        { 
            throw new Error("ID or name required for query");
        }

        const collection: Collection<Ability> = this.client.db(this.namespace).collection<Ability>(Collections.Ability);
        let cursor: AggregationCursor<Ability>;
        try {
            cursor = collection.aggregate([
                { "$match": query }
            ]);

            const documents: Array<Ability> = await cursor.toArray();
            const ability: Ability | undefined = documents.shift();

            // check is document is empty
            if(!ability || Object.keys(ability).length === 0) {
                throw new Error("Nonexistent Ability");
            }

            return ability;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Retrieves any existing or expired session data for given user
     * @param address eth address of user
     * @returns session data regardless of validity
     */
     async getSession(address: string): Promise<Session> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const collection: Collection<Session> = this.client.db(this.namespace).collection<Session>(Collections.Session);
        let cursor: AggregationCursor<any>;
        try {
            cursor = collection.aggregate([
                { "$match": { address: address }}
            ]);

            const result: Array<Session> = await cursor.toArray();
            const document: Session | undefined = result.shift();

            // check if query returned no documents
            if(!document){
                throw new Error("Query returned no documents");
            }

            return document;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Retrieves a given user's data document, including game data.
     * @param address eth address of user
     * @returns user data document
     */
    async getUserByAddress(address: string): Promise<User> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const collection: Collection<User> = this.client.db(this.namespace).collection<User>(Collections.User);
        let cursor: AggregationCursor<User>;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: address }}
            ]);

            const result: Array<User> = await cursor.toArray();
            const document: User | undefined = result.shift();

            // check if query returned no documents
            if(!document){
                throw new Error("Query returned no documents");
            }

            return document;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Handles new user registration into database.
     * @param address eth address of user
     * @returns true if user was registered successfully
     */
    async registerNewUser(address: string): Promise<boolean> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const now: number = Math.floor(Date.now()/1000);
        const DB: Db = this.client.db(this.namespace);
        const newUser: User = {
            _id: address,
            total_minted: 0,
            register_timestamp: now,
            last_active_timestamp: now,
            saveData: {
                name: address,
                level: 1,
                items: [],
                locations: { hub: "0001" },
                progress: [0, 0, 0, 0]
            },
            blacklist: false,
            reason: ""
        };

        let commandResult: any;
        try {
            commandResult = await DB.command(
                {
                    insert: Collections.User,
                    documents: [newUser],
                }
            );

            // successful insert should result { ok: 1 }
            if(commandResult.ok !== 1) {
                console.error(commandResult.writeErrors);
                throw new Error("User insert operation failed")
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Handles session creation and validation for users.
     * @param address eth address of user
     * @param stamp unique identifier to be used as session id
     * @returns true is session was initiated successfully
     */
    async createSession(address: string, stamp: string): Promise<Session> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const now: number = Math.floor(Date.now()/1000);
        const session: Session = {
            address: address,
            session_id: stamp,
            login_timestamp: now,
            expiration: now + (extractNumberEnvVar("EXPIRATION") * 60 * 60),
            max_expiration: now + (extractNumberEnvVar("MAX_EXPIRATION") * 60 * 60)
        }
        const options: UpdateOptions = { upsert: true};
        const collection: Collection<Session> = this.client.db(this.namespace).collection<Session>(Collections.Session);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                { address: address },
                { "$set": session }, 
                options
            );

            // check if update was successful
            if(!(result.upsertedCount === 1 || result.modifiedCount === 1)){
                throw new Error("Session creation failed");
            }

            return session;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Increases valid session duration.
     * @param address eth address of user
     * @returns true is session was extended successfully
     */
     async extendSession(address: string, newExpiration: number): Promise<boolean> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }
    
        const collection: Collection<Session> = this.client.db(this.namespace).collection<Session>(Collections.Session);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                { address: address },
                { "$set": { expiration: newExpiration }}, 
            );

            // check if update was successful
            if(result.modifiedCount === 0){
                throw new Error("Session creation failed");
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Handles session termination for users
     * @param address eth address of user
     * @returns true if session was terminated successfully
     */
    async logoutSession(address: string): Promise<boolean> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const now: number = Math.floor(Date.now()/1000);
        const collection: Collection<Session> = this.client.db(this.namespace).collection<Session>(Collections.Session);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                { address: address },
                { "$set": 
                    {
                        expiration: now,
                        max_expiration: now
                    }
                }
            );

            // check if update was successful
            if(result.modifiedCount === 0){
                throw new Error("Session deletion failed");
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Stores game data to database and updates progress tracker if applicable.
     * @param address eth address of user
     * @param gameData game data to be saved to database
     * @param progress flag for updating progress tracker
     * @returns true if game data was saved successfully
     */
    async saveGameData(address: string, gameData: User["saveData"], progress: boolean): Promise<boolean> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const now: number = Math.floor(Date.now()/1000);
        const query = { _id: address };
        const update = { 
            "saveData.name": gameData.name,
            "saveData.level": gameData.level,
            "saveData.items": gameData.items,
            "saveData.locations": gameData.locations
        }
        const collection: Collection<User> = this.client.db(this.namespace).collection<User>(Collections.User);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                progress ? { ...query, "saveData.progress": 0 } : query,
                { "$set": progress ? { ...update, "saveData.progress.$": now } : update }
            );

            // check if update was successful
            if(result.modifiedCount === 0){
                throw new Error("Session deletion failed");
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
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
     async registerNewFamiliar(template: Familiar, user: User): Promise<boolean> {
        if(this.client === undefined) {
            throw new Error("Database not initialized");
        }
    
        // Prepare for transaction    
        const session: ClientSession = this.client.startSession();
        const familiarsCol: Collection<Familiar> = this.client.db(this.namespace).collection<Familiar>(Collections.Familiar);
        const templatesCol: Collection<Familiar> = this.client.db(this.namespace).collection<Familiar>(Collections.Template);
        const userCol: Collection<User> = this.client.db(this.namespace).collection<User>(Collections.User);
        const db: Db = this.client.db(this.namespace);
        const transactionOptions: TransactionOptions | any = { 
            readPreference: ReadPreference.PRIMARY
        };
     
        try {
            let result = await session.withTransaction(async () => {

                // stage 1: Get and Update token id counter
                // command returns { value: original_document }
                const counter = await db.command(
                {
                    findAndModify: Collections.Counter,
                    query: { name: "token_ids" },
                    update: { "$inc": { value: 1 }}
                }, { session });

                // // stage 2: Update template mint count
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

                // // stage 4: Create new familiar record based on template
                await familiarsCol.insertOne(
                    {
                        ...template,
                        _id: counter.value.value,
                        familiarId: template._id,
                        meta: 
                        {
                            status: "Pending",
                            mint_timestamp: 0,
                            origin_owner: user._id
                        }
                    },
                    { session });
            }, transactionOptions);

            if(!result) {return false}
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await session.endSession();
        }

        return true;
    }

    /**
     * Core logic for Familiar registration workflow. Select list of familiar templates
     * to generate new familiar asset.
     * @param tier Array of rarities to choose familiar from
     * @returns Promise resolving to array of Familiar templates
     */
    async getTemplatesByTier(tier: Rarity[]): Promise<Array<Familiar>> {
        if(!this.client) {
            throw new Error("Database not initialized");
        }

        const generation: number = extractNumberEnvVar("CURRENT_GENERATION");
        const collection: Collection<Familiar> = this.client.db(this.namespace).collection<Familiar>(Collections.Template);
        let cursor: AggregationCursor<Familiar>;
        
        try {
            cursor = collection.aggregate([
                {
                  '$match': 
                  { 
                    'rarity': { '$in': tier }, 
                    'generation': generation, 
                    '$expr': { '$lt': ['$meta.minted', '$meta.limit']}
                  }
                }
              ]);
        
            const result: Array<Familiar> = await cursor.toArray();

            // check if query returned no documents
            let test: Familiar = result[0];
            if(!test || Object.keys(test).length === 0){
                throw new Error("Query returned no documents");
            }
            return result;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    } 

    /**
     * Initializes connection to MongoDB server. Must be run prior
     * to any database query.
     */
    async init(): Promise<void> {
        try {
            this.client = await MongoClient.connect(this.URI, this.options);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Getter for initialization status
     * @returns true if DB connection client is defined
     */
    isInitialized(): boolean {
        return this.client !== undefined;
    }
}