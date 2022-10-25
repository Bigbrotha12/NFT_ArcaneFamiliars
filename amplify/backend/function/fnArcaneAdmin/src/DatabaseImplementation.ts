import { extractStringEnvVar, extractNumberEnvVar } from "./Environment";
import { Collections, Session, User } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { 
    MongoClient, MongoClientOptions, Collection, 
    AggregationCursor, Db, UpdateResult, UpdateOptions
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
     * Retrieves any existing or expired session data for given user
     * @param address eth address of user
     * @returns session data regardless of validity
     */
    async getSession(address: string): Promise<Session | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const collection: Collection = this.client.db(this.namespace).collection(Collections.Session);
        let cursor: AggregationCursor<any>;
        try {
            cursor = collection.aggregate([
                { "$match": { address: address }}
            ]);

            const result: Array<Session> | undefined = await cursor.toArray();
            const document: Session | undefined = result?.shift();

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
     * Retrieves a given user's data document, including game data.
     * @param address eth address of user
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
     * Handles new user registration into database.
     * @param address eth address of user
     * @returns true if user was registered successfully
     */
    async registerNewUser(address: string): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
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
                locations: "0001",
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
                console.error("User insert operation failed")
                console.error(commandResult.writeErrors);
                return undefined;
            }

            return true;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Handles session creation and validation for users.
     * @param address eth address of user
     * @param stamp unique identifier to be used as session id
     * @returns true is session was initiated successfully
     */
    async createSession(address: string, stamp: string): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
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
        const collection: Collection = this.client.db(this.namespace).collection(Collections.Session);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                { address: address },
                { "$set": session }, 
                options
            );

            // check if update was successful
            if(result.modifiedCount === 0){
                console.info("Session creation failed");
                return undefined;
            }

            return true;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Increases valid session duration.
     * @param address eth address of user
     * @returns true is session was extended successfully
     */
     async extendSession(address: string, newExpiration: number): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
    
        const collection: Collection = this.client.db(this.namespace).collection(Collections.Session);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                { address: address },
                { "$set": { expiration: newExpiration }}, 
            );

            // check if update was successful
            if(result.modifiedCount === 0){
                console.info("Session creation failed");
                return undefined;
            }

            return true;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Handles session termination for users
     * @param address eth address of user
     * @returns true if session was terminated successfully
     */
    async logoutSession(address: string): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const now: number = Math.floor(Date.now()/1000);
        const collection: Collection = this.client.db(this.namespace).collection(Collections.Session);
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
                console.info("Session deletion failed");
                return undefined;
            }

            return true;
        } catch (error: any) {
            return Database.handleDBError(error);
        }
    }

    /**
     * Stores game data to database and updates progress tracker if applicable.
     * @param address eth address of user
     * @param gameData game data to be saved to database
     * @param progress flag for updating progress tracker
     * @returns true if game data was saved successfully
     */
    async saveGameData(address: string, gameData: User["saveData"], progress: boolean): Promise<boolean | undefined> {
        if(this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }

        const now: number = Math.floor(Date.now()/1000);
        const query = { _id: address };
        const update = { 
            "saveData.name": gameData.name,
            "saveData.level": gameData.level,
            "saveData.items": gameData.items,
            "saveData.locations": gameData.locations
        }
        const collection: Collection = this.client.db(this.namespace).collection(Collections.User);
        let result: UpdateResult;
        try {
            result = await collection.updateOne(
                progress ? { ...query, "saveData.progress": 0 } : query,
                { "$set": progress ? { ...update, "saveData.progress.$": now } : update }
            );

            // check if update was successful
            if(result.modifiedCount === 0){
                console.info("Session deletion failed");
                return undefined;
            }

            return true;
        } catch (error: any) {
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