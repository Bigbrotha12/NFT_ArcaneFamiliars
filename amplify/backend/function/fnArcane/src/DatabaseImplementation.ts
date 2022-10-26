import { extractStringEnvVar } from "./Environment";
import { Ability, Collections, Familiar, Query } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { 
    MongoClient, MongoClientOptions, Collection, AggregationCursor
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

    async getTokenMetadata(tokenId: number): Promise<Familiar | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
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
            if(familiar === undefined || Object.keys(familiar).length === 0) {
                console.error("Nonexistent token id");
                return undefined;
            }

            return familiar;
        } catch (error) {
            return Database.handleDBError(error);
        }
    }

    async getFamiliar(q: Query): Promise<Familiar | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        let query;
        if(q.id) { query = { _id: q.id };} else 
        if (q.name) { query = { name: q.name };} else 
        { 
            console.error("ID or name required for query")
            return undefined;
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
            if(familiar === undefined || Object.keys(familiar).length === 0) {
                console.error("Nonexistent token id");
                return undefined;
            }

            return familiar;
        } catch (error) {
            return Database.handleDBError(error);
        }
    }

    async getAbility(q: Query): Promise<Ability | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        let query;
        if(q.id) { query = { _id: q.id };} else 
        if (q.name) { query = { name: q.name };} else 
        { 
            console.error("ID or name required for query")
            return undefined;
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
            if(ability === undefined || Object.keys(ability).length === 0) {
                console.error("Nonexistent token id");
                return undefined;
            }

            return ability;
        } catch (error) {
            return Database.handleDBError(error);
        }
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
     * Helper function for logging database error.
     * @param error unknown error thrown by MongoDB driver
     * @returns undefined value to be handled by higher-level functions
     */
    static handleDBError(error: any): undefined {
        console.error(error.stack);
        return undefined;
    }
}