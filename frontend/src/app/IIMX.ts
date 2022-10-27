import { Familiar, UserInfo } from "./Definitions";

export interface IIMX {
    // Initialization
    init(): Promise<void>,
    // Getters
    getNFTAssets(address: string, collection: string): Promise<Array<Familiar>>,
    getMetadata(id: number, collection: string): Promise<Familiar>,
    getUserBalances(address: string): Promise<UserInfo["balance"]>,
    // Setters
    transferNFT(id: number, recipient: string): Promise<any>,
    importToEthereum(id: number): Promise<any>,
}