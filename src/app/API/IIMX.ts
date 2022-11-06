import { Authentication, Familiar, UserInfo } from "../Definitions";

export interface IIMX {
    // Initialization
    setupUserAccount(): Promise<UserInfo["address"]>,
    // Getters
    getNFTAssets(address: string, collection: string): Promise<Array<Familiar>>,
    getMetadata(id: number, collection: string): Promise<Familiar>,
    getUserBalances(address: string): Promise<UserInfo["balance"]>,
    authenticate(address: string): Promise<Authentication>,
    // Setters
    transferNFT(id: number, recipient: string): Promise<any>,
    importToEthereum(id: number): Promise<any>,
}