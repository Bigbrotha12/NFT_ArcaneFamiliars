import { Familiar, Ability, Query } from "./Definitions";

export interface IDatabase {
    // Initializer
    init(): Promise<void | undefined>,
    isInitialized(): boolean,
    // Getters
    getTokenMetadata(tokenId: number): Promise<Familiar | undefined>,
    getFamiliar(q: Query): Promise<Familiar | undefined>,
    getAbility(q: Query): Promise<Ability | undefined>
    // Setters  
}

