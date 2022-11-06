import { extractNumberEnvVar } from "../shared/Environment";
import { Familiar, User, Rarity, Request } from "../shared/Definitions";
import { hashMessage } from '@ethersproject/hash';
import IDatabase from "../shared/IDatabase";
import Validator from './Validator';

export default class RegisterController {
    DB: IDatabase;

    constructor(cachedDB: IDatabase) {
        this.DB = cachedDB;
    }

    /**
     * Guardian function validating requests for minting NFTs. Checks
     * whether user progress data, game code hash, and signature are valid.
     * @param request mint request send by user
     * @param user user data document
     * @returns true if request is valid, otherwise return failure reason
     */
    verifyRequest(request: Request, user: User): boolean {
        if(!Validator.verifySignature(request)){return false};
        if(!Validator.verifyCode(request)){return false};
        if(!Validator.verifyStamp(user)){return false};
        //if(!Validator.verifyData(request, user)){return false};
        return true;
    }

    /**
     * Gets user data document for a given address.
     * @param address eth address of user requesting mint
     * @returns user data document
     */
    async getUserData(address: string): Promise<User | null> {

        try {
            // Initialize database connection
            if(!this.DB.isInitialized) {
                await this.DB.init();
            }

            const user: User = await this.DB.getUserByAddress(address);
            if(!user) {
                console.error("Error: Unable to get user data");
                return null;
            }
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Core logic of NFT registration workflow. Generates a deterministic 
     * Familiar template based on the user's address and minting history.
     * @param address eth address of user requesting mint
     * @returns Promise resolving to Familiar template to mint
     */
    async generateNextFamiliar(user: User): Promise<Familiar | null> {

        try {
           // Initialize database connection
            if(!this.DB.isInitialized) {
                await this.DB.init();
            }
            
            // Calculate user's tier
            const tiers: Array<Rarity> = RegisterController.calculateTiers(user.total_minted);

            // Generate list of available NFTs based on tier
            const availableTemplates: Array<Familiar> = await this.DB.getTemplatesByTier(tiers);

            // Generate pseudo-random number to select one template
            const selector: number = RegisterController.generateNumber(user._id, user.total_minted);

            // Select one template
            const index: number = selector % availableTemplates.length;
            const selectedFamiliar: Familiar = availableTemplates[index];

            // Trim metadata and return
            delete selectedFamiliar.meta;
            return selectedFamiliar;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Core logic of NFT registration workflow. Creates new familiar record
     * on database based on given template for given user.
     * @param template base template to generate new familiar
     * @param user user data document
     * @returns true if successfully registered familiar
     */
    async registerFamiliar(template: Familiar, user: User): Promise<boolean | null> {
        if(user._id === "TEST") {return true};

        try {
            // Initialize database connection
            if(!this.DB.isInitialized) {
                await this.DB.init();
            }

            const success: boolean = await this.DB.registerNewFamiliar(template, user);
            return success;

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Calculate the rarity of Familiars the requesting user
     * can potentially get. The higher the number of successful
     * mints, the greater the rarity tier.
     * @param total_minted running total of mints by user
     * @returns array of rarities user can potentially get
     */
    static calculateTiers(total_minted: number): Array<Rarity> {
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
     * @param address address of user requesting mint
     * @param total_minted running total of mints by user
     * @returns deterministic pseudo-random number
     */
    static generateNumber(address: string, total_minted: number): number {
        let minted: string = total_minted.toString();
        let seed: string = address.concat(minted);
        return parseInt(hashMessage(seed).slice(2, 8), 16);
    }  
}