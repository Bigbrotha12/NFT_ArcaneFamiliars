import { extractStringEnvVar, extractNumberEnvVar } from "./Environment";
import { Collections, Familiar } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { MongoClient, MongoClientOptions, Collection, AggregationCursor, BulkWriteOptions } from "mongodb";

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
    
    async init(): Promise<void> {
        try {
            this.client = await MongoClient.connect(this.URI, this.options);
        } catch (error: any) {
            Database.handleDBError(error);
        }
    }

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

            let result: Array<Familiar> | undefined = await cursor.toArray();
            let document: Familiar | undefined = result?.shift();

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

    async getPendingMints(): Promise<Familiar[] | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.Familiar);
        let cursor: AggregationCursor<any>;
        try {
            cursor = collection.aggregate(
                [{ '$match': { 'meta.status': 'Pending' }}
            ]);
            let result: Array<Familiar> | undefined = await cursor.toArray();

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
            
            return document.meta.status;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }
    
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
                    update: { "$set": 
                        {"meta.status": "Minted", 
                        "meta.mint_timestamp": `${Math.floor(Date.now()/1000)}`}}
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

    static handleDBError(error: any): undefined {
        console.error(error.stack);
        return undefined;
    }
}