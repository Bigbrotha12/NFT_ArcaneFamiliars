import { Familiar, Ability, Query } from "./Definitions";

export interface IDatabase {
    // Initializer
    init(): Promise<void>,
    isInitialized(): boolean,
    // Getters
    getTokenMetadata(tokenId: number): Promise<Familiar>,
    getFamiliar(q: Query): Promise<Familiar>,
    getAbility(q: Query): Promise<Ability>
    // Setters  
}

