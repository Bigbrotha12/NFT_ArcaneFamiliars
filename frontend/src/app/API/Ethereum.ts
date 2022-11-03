//import ethers from "ethers";
import { IEthereum } from "./IEthereum";

export class Ethereum implements IEthereum {
    init(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getNFTBalance(address: string): Promise<number> {
        throw new Error(address);
    }
    getBlueprint(id: number): Promise<string> {
        throw new Error(id.toString());
    }
    getEndpoint(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getOwnerOf(id: number): Promise<string> {
        throw new Error(id.toString());
    }
    getOwner(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    transferNFT(id: number, recipient: string): Promise<any> {

        throw new Error(id.toString() + recipient);
    }
    setApproval(controller: string): Promise<any> {
        throw new Error(controller);
    }
    importToIMX(id: number): Promise<any> {
        throw new Error(id.toString());
    }
    
}