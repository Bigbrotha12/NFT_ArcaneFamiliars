import { IIMX } from "./IIMX";
import { IMXBalance, AppError, assetResponseOK, balancesResponseOK, assetRequest } from "../../types/IMX";
import { Familiar } from "../../types/familiar";
import AppConfig from "../constants/AppConfig";
import axios, { Axios } from "axios";

const collection: string = AppConfig.Mode === 'Production' ? AppConfig.Blockchain.Collection.Mainnet : AppConfig.Blockchain.Collection.Sandbox;

export class IMX implements IIMX {
    provider: string;
    client: Axios;
        
    constructor(provider: string) {
        this.provider = provider;
        this.client = axios.create({ 
            baseURL: provider, 
            timeout: 3000,
            headers: { "Content-Type": "application/json" }
        });
    }
    

    // Direct API call
    // GET method. Parameters: assetRequest, URL-encoded
    async getNFTAssets(address: string): Promise<Array<Familiar>> {
        const URI: string = "/v1/assets";
        const request: assetRequest = { user: address, collection: collection };

        try {
            const { data } = await this.client.get(URI, {
                params: request
            });
            if (!data) throw new Error("Unable to fetch IMX assets");
            
            const result: Array<Familiar> = this.parseAssetResponse(data);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Unable to fetch IMX assets");
        }
    }

    async getMetadata(id: number): Promise<Familiar> {
         const URI: string = `/v1/assets/${collection}/${id}`;

        try {
            const { data } = await this.client.get(URI);
            if (!data || !data.metadata) throw new Error("Unable to fetch asset metadata.");
            
            const result: Familiar = data.metadata;
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Unable to fetch IMX assets.");
        }
    }

    async getUserBalances(address: string): Promise<IMXBalance> {
        let URI: string = `/v2/balances/${address}`;

        try {
            const { data } = await this.client.get(URI);
            if (!data || !data.metadata) throw new Error("Unable to fetch asset metadata.");
            
            const [, result] = this.parseUserBalances(data);
            if (result) return result;
            else throw new Error("No ETH balance found.");
        } catch (error) {
            console.error(error);
            throw new Error("Unable to fetch IMX assets.");
        }
    }

    transferNFT(id: number, recipient: string): Promise<any> {
        throw new Error(id.toString()+recipient);
    }
    importToEthereum(id: number): Promise<any> {
        throw new Error(id.toString());
    }

    // Helper function to retrieve familiar metadata
    parseAssetResponse(response: assetResponseOK): Array<Familiar> {
        return response.result?.map( (result) => {
            return result.metadata;
        });
    }

    parseUserBalances(response: balancesResponseOK): [AppError | null, IMXBalance | null] {
        let ethBalance = response.find((token) => { return token.token_address === ""; });
        if (!ethBalance) return [{ code: 1, reason: "No ETH balance found." }, null];
        
        return [null, { available: ethBalance.balance, preparing: ethBalance.preparing_withdrawal, withdrawable: ethBalance.withdrawable }];
    }
}