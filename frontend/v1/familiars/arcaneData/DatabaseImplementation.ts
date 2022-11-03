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