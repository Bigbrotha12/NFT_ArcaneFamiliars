import { Familiar, Rarity, User } from "./Definitions";

export interface IDatabase {
    // Initializer
    init(): Promise<void>,
    isInitialized(): boolean,
    // Getters
    getFamiliarByID(tokenId: number): Promise<Familiar>,
    getTemplatesByTier(tier: Array<Rarity>): Promise<Array<Familiar>>,
    getUserByAddress(address: string): Promise<User>,
    // Setters
    registerNewFamiliar(template: Familiar, user: User): Promise<boolean>
}

