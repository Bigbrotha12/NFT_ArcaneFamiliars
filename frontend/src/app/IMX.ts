import { Familiar } from "./Definitions";
import { IIMX } from "./IIMX";

export class IMX implements IIMX {
    init(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getNFTAssets(address: string, collection: string): Promise<Familiar[]> {
        throw new Error(address + collection);
    }
    getMetadata(id: number, collection: string): Promise<Familiar> {
        throw new Error(id.toString()+collection);
    }
    getUserBalances(address: string): Promise<{ imx: number; preparing: number; withdrawable: number; }> {
        throw new Error(address);
    }
    transferNFT(id: number, recipient: string): Promise<any> {
        throw new Error(id.toString()+recipient);
    }
    importToEthereum(id: number): Promise<any> {
        throw new Error(id.toString());
    }
    
}