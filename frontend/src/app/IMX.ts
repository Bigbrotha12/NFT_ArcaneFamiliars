import { Familiar } from "./Definitions";
import { IIMX } from "./IIMX";

export class IMX implements IIMX {
    init(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getNFTAssets(address: string, collection: string): Promise<Familiar[]> {
        throw new Error("Method not implemented.");
    }
    getMetadata(id: number, collection: string): Promise<Familiar> {
        throw new Error("Method not implemented.");
    }
    getUserBalances(address: string): Promise<{ imx: number; preparing: number; withdrawable: number; }> {
        throw new Error("Method not implemented.");
    }
    transferNFT(id: number, recipient: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    importToEthereum(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}