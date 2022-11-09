import { Familiar, Ability, Query, Session, User, Rarity } from "./Definitions";

export default interface IDatabase {
    // Initializer
    init(): Promise<void>,
    isInitialized(): boolean,

    // Getters
    getUser(address: string): Promise<User>,
    getTokenMetadata(tokenId: number): Promise<Familiar>,
    getFamiliar(q: Query): Promise<Familiar>,
    getTemplatesByTier(tier: Array<Rarity>): Promise<Array<Familiar>>,
    getAbility(q: Query): Promise<Ability>
    getSession(address: string): Promise<Session>,
    
    // Setters
    registerNewUser(address: string): Promise<boolean>,
    registerNewFamiliar(template: Familiar, user: User): Promise<boolean>
    createSession(address: string, stamp: string): Promise<Session>,
    extendSession(address: string, newExpiration: number): Promise<boolean>,
    logoutSession(address: string): Promise<boolean>,
    saveGameData(address: string, gameData: User["saveData"], progress: boolean): Promise<boolean>
}

