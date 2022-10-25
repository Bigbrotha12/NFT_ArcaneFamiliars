"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const Environment_1 = require("./Environment");
const mongodb_1 = require("mongodb");
var Collections;
(function (Collections) {
    Collections["Ability"] = "abilities";
    Collections["Counter"] = "counters";
    Collections["Familiar"] = "familiars";
    Collections["Session"] = "session";
    Collections["Template"] = "templates";
    Collections["User"] = "users";
})(Collections || (Collections = {}));
class Database {
    client;
    URI;
    namespace;
    options;
    constructor() {
        this.URI = (0, Environment_1.extractStringEnvVar)("MONGODB_URI");
        this.namespace = (0, Environment_1.extractStringEnvVar)("MONGODB_NS");
        this.options = { w: "majority" };
    }
    /**
     * Initializes connection to MongoDB server. Must be run prior
     * to any database query.
     */
    async init() {
        try {
            this.client = await mongodb_1.MongoClient.connect(this.URI, this.options);
        }
        catch (error) {
            Database.handleDBError(error);
        }
    }
    /**
     * Getter for initialization status
     * @returns true if DB connection client is defined
     */
    isInitialized() {
        return this.client !== undefined;
    }
    /**
     * Getter function for registered familiars
     * @param tokenId id of token being queried
     * @returns Familiar document for token id
     */
    async getFamiliarByID(tokenId) {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        const collection = this.client.db(this.namespace).collection(Collections.Familiar);
        let cursor;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: tokenId } }
            ]);
            const result = await cursor.toArray();
            const document = result?.shift();
            // check if query returned no documents
            if (document === undefined) {
                console.info("Query returned no documents");
                return undefined;
            }
            return document;
        }
        catch (error) {
            return Database.handleDBError(error);
        }
    }
    /**
     * Core logic for IMX Minting workflow. Gets all NFTs marked as pending
     * for signing and sending to IMX L2.
     * @returns Array of Familiar to be minted
     */
    async getPendingMints() {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        const collection = this.client.db(this.namespace).collection(Collections.Familiar);
        let cursor;
        try {
            cursor = collection.aggregate([
                { '$match': { 'meta.status': 'Pending' } }
            ]);
            const result = await cursor.toArray();
            // check if query returned no documents
            let test = result?.at(0);
            if (test === undefined || Object.keys(test).length === 0) {
                console.info("Query returned no documents");
                return undefined;
            }
            return result;
        }
        catch (error) {
            return Database.handleDBError(error);
        }
    }
    /**
     * Function checking mint status of specific token id.
     * @param tokenId id of token to be checked
     * @returns return string status either "Minted" or "Pending"
     */
    async getMintStatus(tokenId) {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        const collection = this.client.db(this.namespace).collection(Collections.Familiar);
        const batchSize = (0, Environment_1.extractNumberEnvVar)("BATCH_SIZE");
        let cursor;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: tokenId } },
                { "$project": { meta: 1 } },
                { "$limit": { batchSize } }
            ]);
            let result = await cursor.toArray();
            let document = result?.shift();
            // check if query returned no documents
            if (document === undefined) {
                console.info("Query returned no documents");
                return undefined;
            }
            return document.meta?.status;
        }
        catch (error) {
            return Database.handleDBError(error);
        }
    }
    /**
     * Updater function for IMX Minting workflow. Marks NFT as
     * minted after successful response from IMX.
     * @param tokens Array of Familiar to be marked as "Minted"
     * @returns Promise resolving to true on successful update
     */
    async updatePendingMints(tokens) {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        const collection = this.client.db(this.namespace).collection(Collections.Familiar);
        const options = { ordered: false };
        const operations = tokens.map(token => {
            return {
                updateOne: {
                    filter: { _id: token._id },
                    update: {
                        "$set": {
                            "meta.status": "Minted",
                            "meta.mint_timestamp": Math.floor(Date.now() / 1000)
                        }
                    }
                }
            };
        });
        try {
            await collection.bulkWrite(operations, options);
            return true;
        }
        catch (error) {
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
    async registerNewFamiliar(template, user) {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        // Prepare for transaction    
        const session = this.client.startSession();
        const familiarsCol = this.client.db(this.namespace).collection(Collections.Familiar);
        const templatesCol = this.client.db(this.namespace).collection(Collections.Template);
        const userCol = this.client.db(this.namespace).collection(Collections.User);
        const db = this.client.db(this.namespace);
        const transactionOptions = {
            readPreference: mongodb_1.ReadPreference.PRIMARY
        };
        try {
            await session.withTransaction(async () => {
                // stage 1: Get and Update token id counter
                // command returns { value: original_document }
                const counter = await db.command({
                    findAndModify: Collections.Counter,
                    query: { name: "token_ids" },
                    update: { $inc: { value: 1 } }
                }, { session });
                // stage 2: Update template mint count
                await templatesCol.updateOne({ name: template.name }, { "$inc": { "meta.minted": 1 } }, { session });
                // stage 3: Update user's mint count, active timestamp and progress
                await userCol.updateOne({ _id: user._id }, {
                    "$inc": { total_minted: 1 },
                    "$set": {
                        last_active_timestamp: Math.floor(Date.now() / 1000),
                        "saveData.progress": [0, 0, 0, 0]
                    }
                }, { session });
                // stage 4: Create new familiar record based on template
                await familiarsCol.insertOne({
                    ...template,
                    _id: counter.value.value,
                    meta: {
                        status: "Pending",
                        mint_timestamp: 0,
                        origin_owner: user._id
                    }
                }, { session });
            }, transactionOptions);
        }
        catch (error) {
            return Database.handleDBError(error);
        }
        finally {
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
    async getTemplatesByTier(tier) {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        const generation = (0, Environment_1.extractNumberEnvVar)("CURRENT_GENERATION");
        const collection = this.client.db(this.namespace).collection(Collections.Template);
        let cursor;
        try {
            cursor = collection.aggregate([
                {
                    rarity: { "$in": tier },
                    generation: generation,
                    "$expr": { "$lt": ["$meta.minted", "$meta.limit"] }
                }
            ]);
            const result = await cursor.toArray();
            // check if query returned no documents
            let test = result?.at(0);
            if (test === undefined || Object.keys(test).length === 0) {
                console.info("Query returned no documents");
                return undefined;
            }
            return result;
        }
        catch (error) {
            return Database.handleDBError(error);
        }
    }
    /**
     * Getter for user data by eth address.
     * @param address eth address of user requesting mint
     * @returns user data document
     */
    async getUserByAddress(address) {
        if (this.client === undefined) {
            console.error("Database not initialized");
            return undefined;
        }
        const collection = this.client.db(this.namespace).collection(Collections.User);
        let cursor;
        try {
            cursor = collection.aggregate([
                { "$match": { _id: address } }
            ]);
            const result = await cursor.toArray();
            const document = result?.shift();
            // check if query returned no documents
            if (document === undefined) {
                console.info("Query returned no documents");
                return undefined;
            }
            return document;
        }
        catch (error) {
            return Database.handleDBError(error);
        }
    }
    /**
     * Helper function for logging database error.
     * @param error unknown error thrown by MongoDB driver
     * @returns undefined value to be handled by higher-level functions
     */
    static handleDBError(error) {
        console.error(error.stack);
        return undefined;
    }
}
exports.Database = Database;
