import ethers from "ethers";
import { IEthereum } from "./IEthereum";

export class Ethereum implements IEthereum {
    init(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getNFTBalance(address: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getBlueprint(id: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getEndpoint(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getOwnerOf(id: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getOwner(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    transferNFT(id: number, recipient: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    setApproval(controller: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    importToIMX(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}