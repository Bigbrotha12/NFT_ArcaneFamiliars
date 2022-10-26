import { Familiar, Rarity, User } from "./Definitions";

export interface IDatabase {
    // Initializer
    init(): Promise<void | undefined>,
    isInitialized(): boolean,
    // Getters
    getFamiliarByID(tokenId: number): Promise<Familiar | undefined>,
    getTemplatesByTier(tier: Array<Rarity>): Promise<Array<Familiar> | undefined>,
    getUserByAddress(address: string): Promise<User | undefined>,
    // Setters
    registerNewFamiliar(template: Familiar, user: User): Promise<boolean | undefined>
}

