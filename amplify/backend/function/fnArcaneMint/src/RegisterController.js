"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const hash_1 = require("@ethersproject/hash");
const DatabaseInterface_1 = require("./DatabaseInterface");
const Validator_1 = require("./Validator");
const Environment_1 = require("./Environment");
class RegisterController {
    DB;
    constructor(cachedDB) {
        this.DB = cachedDB;
    }
    /**
     * Guardian function validating requests for minting NFTs. Checks
     * whether user progress data, game code hash, and signature are valid.
     * @param request mint request send by user
     * @param user user data document
     * @returns true if request is valid, otherwise return failure reason
     */
    verifyRequest(request, user) {
        if (!Validator_1.Validator.verifyCode(request)) {
            return "BAD_CODEHASH";
        }
        ;
        if (!Validator_1.Validator.verifyStamp(user)) {
            return "BAD_INTERVALS";
        }
        ;
        if (!Validator_1.Validator.verifyData(request, user)) {
            return "BAD_STAMPS";
        }
        ;
        if (!Validator_1.Validator.verifySignature(request)) {
            return "BAD_SIGNATURE";
        }
        ;
        return true;
    }
    /**
     * Gets user data document for a given address.
     * @param address eth address of user requesting mint
     * @returns user data document
     */
    async getUserData(address) {
        // Initialize database connection
        if (!this.DB.isInitialized) {
            await this.DB.init();
        }
        const user = await this.DB.getUserByAddress(address);
        if (user === undefined) {
            console.error("Error: Unable to get user data");
            return undefined;
        }
        return user;
    }
    /**
     * Core logic of NFT registration workflow. Generates a deterministic
     * Familiar template based on the user's address and minting history.
     * @param address eth address of user requesting mint
     * @returns Promise resolving to Familiar template to mint
     */
    async generateNextFamiliar(user) {
        // Initialize database connection
        if (!this.DB.isInitialized) {
            await this.DB.init();
        }
        // Calculate user's tier
        const tiers = RegisterController.#calculateTiers(user.total_minted);
        // Generate list of available NFTs based on tier
        const availableTemplates = await this.DB.getTemplatesByTier(tiers);
        if (availableTemplates === undefined) {
            console.error("Error: Unable to get available templates");
            return undefined;
        }
        // Generate pseudo-random number to select one template
        const selector = RegisterController.#generateNumber(user._id, user.total_minted);
        // Select one template
        const index = selector % availableTemplates.length;
        const selectedFamiliar = availableTemplates[index];
        return selectedFamiliar;
    }
    /**
     * Core logic of NFT registration workflow. Creates new familiar record
     * on database based on given template for given user.
     * @param template base template to generate new familiar
     * @param user user data document
     * @returns true if successfully registered familiar
     */
    async registerFamiliar(template, user) {
        // Initialize database connection
        if (!this.DB.isInitialized) {
            await this.DB.init();
        }
        const success = await this.DB.registerNewFamiliar(template, user);
        if (success === undefined) {
            console.error("Registration transaction failed");
            return undefined;
        }
        return success;
    }
    /**
     * Calculate the rarity of Familiars the requesting user
     * can potentially get. The higher the number of successful
     * mints, the greater the rarity tier.
     * @param total_minted running total of mints by user
     * @returns array of rarities user can potentially get
     */
    static #calculateTiers(total_minted) {
        let tiers = [DatabaseInterface_1.Rarity.common];
        const tier_1 = (0, Environment_1.extractNumberEnvVar)("TIER_1");
        const tier_2 = (0, Environment_1.extractNumberEnvVar)("TIER_2");
        const tier_3 = (0, Environment_1.extractNumberEnvVar)("TIER_3");
        const tier_4 = (0, Environment_1.extractNumberEnvVar)("TIER_4");
        if (total_minted > tier_1) {
            tiers.push(DatabaseInterface_1.Rarity.uncommon);
        }
        if (total_minted > tier_2) {
            tiers.push(DatabaseInterface_1.Rarity.rare);
        }
        if (total_minted > tier_3) {
            tiers.push(DatabaseInterface_1.Rarity.secret);
        }
        if (total_minted > tier_4) {
            tiers.push(DatabaseInterface_1.Rarity.legendary);
        }
        return tiers;
    }
    /**
     * Generates pseudo-random number to be used for selecting
     * NFT template to be selected. This approach should allow
     * simulation of NFTs per address, and validate whether user's
     * NFTs were generated correctly.
     * @param userAddress address of user requesting mint
     * @param total_minted running total of mints by user
     * @returns deterministic pseudo-random number
     */
    static #generateNumber(userAddress, total_minted) {
        let minted = total_minted.toString();
        let seed = userAddress.concat(minted);
        return parseInt((0, hash_1.hashMessage)(seed).slice(2, 8), 16);
    }
}
exports.RegisterController = RegisterController;
