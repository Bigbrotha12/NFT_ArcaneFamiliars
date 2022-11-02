import { Familiar } from "./Definitions";

export interface IDatabase {
    init(): Promise<void>,
    getFamiliarByID(tokenId: number): Promise<Familiar | undefined>,
    getPendingMints(): Promise<Array<Familiar> | undefined>,
    getMintStatus(tokenId: number): Promise<string | undefined>,
    updatePendingMints(tokens: Array<Familiar>): Promise<boolean | undefined>
}

