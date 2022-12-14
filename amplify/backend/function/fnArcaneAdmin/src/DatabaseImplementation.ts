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
     * Initializes connection to MongoDB server. Must be run prior
     * to any database query.
     */
    async init(): Promise<void> {
        try {
            this.client = await MongoClient.connect(this.URI, this.options);
        } catch (error: any) {
            throw new Error("Initialization failed");
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