import { hashMessage } from '@ethersproject/hash';
import { DBInterface, Familiar, User, Rarity } from "./DatabaseInterface";
import { Database } from "./DatabaseImplementation";
import { Validator } from './Validator';
import { extractNumberEnvVar } from "./Environment";
import { Request } from './MintRegister';

export class RegisterController {
    DB: DBInterface;

    constructor(cachedDB: Database) {
        this.DB = cachedDB;
    }

    /**
     * Guardian function validating requests for minting NFTs. Checks
     * whether user progress data, game code hash, and signature are valid.
     * @param request mint request send by user
     * @param user user data document
     * @returns true if request is valid, otherwise return failure reason
     */
    verifyRequest(request: Request, user: User): boolean | string {
        if(!Validator.verifyCode(request)){return "BAD_CODEHASH"};
        if(!Validator.verifyStamp(user)){return "BAD_INTERVALS"};
        if(!Validator.verifyData(request, user)){return "BAD_STAMPS"};
        if(!Validator.verifySignature(request)){return "BAD_SIGNATURE"};
        return true;
    }

    /**
     * Gets user data document for a given address.
     * @param address eth address of user requesting mint
     * @returns user data document
     */
    async getUserData(address: string): Promise<User | undefined> {
        // Initialize database connection
        if(!this.DB.isInitialized) {
            await this.DB.init();
        }

        const user: User | undefined = await this.DB.getUserByAddress(address);
        if(user === undefined) {
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
    async generateNextFamiliar(user: User): Promise<Familiar | undefined> {
        // Initialize database connection
        if(!this.DB.isInitialized) {
            await this.DB.init();
        }
        
        // Calculate user's tier
        const tiers: Array<Rarity> = RegisterController.#calculateTiers(user.total_minted);

        // Generate list of available NFTs based on tier
        const availableTemplates: Array<Familiar> | undefined = await this.DB.getTemplatesByTier(tiers);
        if(availableTemplates === undefined) {
            console.error("Error: Unable to get available templates");
            return undefined;
        }

        // Generate pseudo-random number to select one template
        const selector: number = RegisterController.#generateNumber(user._id, user.total_minted);

        // Select one template
        const index: number = selector % availableTemplates.length;
        const selectedFamiliar: Familiar = availableTemplates[index];

        return selectedFamiliar;
    }

    /**
     * Core logic of NFT registration workflow. Creates new familiar record
     * on database based on given template for given user.
     * @param template base template to generate new familiar
     * @param user user data document
     * @returns true if successfully registered familiar
     */
    async registerFamiliar(template: Familiar, user: User): Promise<boolean | undefined> {
        // Initialize database connection
        if(!this.DB.isInitialized) {
            await this.DB.init();
        }

        const success: boolean | undefined = await this.DB.registerNewFamiliar(template, user);
        if(success === undefined) {
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
    static #calculateTiers(total_minted: number): Array<Rarity> {
        let tiers = [Rarity.common];

        const tier_1 = extractNumberEnvVar("TIER_1");
        const tier_2 = extractNumberEnvVar("TIER_2");
        const tier_3 = extractNumberEnvVar("TIER_3");
        const tier_4 = extractNumberEnvVar("TIER_4");

        if(total_minted > tier_1) { tiers.push(Rarity.uncommon) }
        if(total_minted > tier_2) { tiers.push(Rarity.rare) }
        if(total_minted > tier_3) { tiers.push(Rarity.secret) }
        if(total_minted > tier_4) { tiers.push(Rarity.legendary) }

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
    static #generateNumber(userAddress: string, total_minted: number): number {
        let minted: string = total_minted.toString();
        let seed: string = userAddress.concat(minted);
        return parseInt(hashMessage(seed).slice(2, 8), 16);
    }  
}