import { Session, User } from "./Definitions";

export interface IDatabase {
    // Initializer
    init(): Promise<void | undefined>,
    isInitialized(): boolean,
    // Getters
    getSession(address: string): Promise<Session | undefined>,
    getUserByAddress(address: string): Promise<User | undefined>,
    // Setters
    registerNewUser(address: string): Promise<boolean | undefined>,
    createSession(address: string, stamp: string): Promise<boolean | undefined>,
    extendSession(address: string, newExpiration: number): Promise<boolean | undefined>,
    logoutSession(address: string): Promise<boolean | undefined>,
    saveGameData(address: string, gameData: User["saveData"], progress: boolean): Promise<boolean | undefined>
    
}

