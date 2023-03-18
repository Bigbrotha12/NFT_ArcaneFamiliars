import { Familiar, IMXBalance,  } from "../Definitions";

export interface IIMX {

    // Getters
    getNFTAssets(address: string): Promise<Array<Familiar>>,
    getMetadata(id: number): Promise<Familiar>,
    getUserBalances(address: string): Promise<IMXBalance>,

    // Setters
    transferNFT(id: number, recipient: string): Promise<any>,
    importToEthereum(id: number): Promise<any>,
}