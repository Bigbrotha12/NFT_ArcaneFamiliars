import { Session, User } from "./Definitions";

export interface IDatabase {
    // Initializer
    init(): Promise<void>,
    isInitialized(): boolean,
    // Getters
    getSession(address: string): Promise<Session>,
    getUserByAddress(address: string): Promise<User>,
    // Setters
    registerNewUser(address: string): Promise<boolean>,
    createSession(address: string, stamp: string): Promise<boolean>,
    extendSession(address: string, newExpiration: number): Promise<boolean>,
    logoutSession(address: string): Promise<boolean>,
    saveGameData(address: string, gameData: User["saveData"], progress: boolean): Promise<boolean>
}

