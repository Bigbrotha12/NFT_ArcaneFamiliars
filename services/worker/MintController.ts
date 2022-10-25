import { extractStringEnvVar } from "./Environment";
import { MintTokensResponse } from "@imtbl/core-sdk";
import { IMXEndpoint } from "./IMXInterface";
import { DBInterface, Familiar } from "./DatabaseInterface";
import { Database } from "./DatabaseImplementation";
import { IMX_API } from "./IMXImplementation";

import { AlchemyProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";

export class MinterController {
    signer: Wallet;
    IMX: IMXEndpoint;
    DB: DBInterface;

    constructor() {
        let network: string = extractStringEnvVar("ALCHEMY_NETWORK");
        let key: string = extractStringEnvVar("ALCHEMY_API");
        const provider = new AlchemyProvider(network, key);

        try {
            this.signer = new Wallet(extractStringEnvVar("MINTER_KEY")).connect(provider);
        } catch (error: any) {
            console.error(error);
            process.exit(1);
        }
        
        this.IMX = new IMX_API();
        this.DB = new Database();
    }

    async getMintBatch(): Promise<Array<Familiar>> {
        // Initialize database connection
        await this.DB.init();

        let batch = await this.DB.getPendingMints();
        if(batch === undefined) {
            console.error("Error: Cannot get pending mints");
            process.exit(1)
        }
        return batch;
    }

    async signAndSend(batch: Array<Familiar>): Promise<MintTokensResponse> {
        let request = this.IMX.generateMintRequest(batch);
        let result = await this.IMX.mintToken(this.signer, request);
        if(!result.results) {
            console.error(result);
            process.exit(1);
        }
        return result;
    }

    async updatePendings(batch: Array<Familiar>): Promise<void> {
        let success = await this.DB.updatePendingMints(batch);
        if(!success) {
            console.error("Unable to update pending mints")
            process.exit(1);
        }
    }
}