import { Authentication, AppError, IMXBalance } from "../types/IMX";
import { Familiar } from "../types/familiar";
import { IController } from "./IController";
import { IMX } from "./API/IMX";
import Config from "./constants/AppConfig";
import { IIMX } from "./API/IIMX";
import { Link } from "@imtbl/imx-sdk";
import { hashMessage } from '@ethersproject/hash';

const LinkEndpoint = Config.Mode === "Production" ? Config.API.Link.Mainnet : Config.API.Link.Sandbox;
const IMXEndpoint = Config.Mode === "Production" ? Config.API.IMX.Mainnet : Config.API.IMX.Sandbox;
const Collection = Config.Mode === "Production" ? Config.Blockchain.Collection.Mainnet : Config.Blockchain.Collection.Sandbox;

export class AppController implements IController {
    cache: {
        assets: {
            data: Array<Familiar>,
            expiration: number
        }
    };

    /**
     * Sets up user account connection with IMX Link
     * @returns eth address of user
     */
    async connectIMX(): Promise<[AppError | null, string | null]> {
        let link: Link = new Link(LinkEndpoint);
    
        try {
            const userInfo = await link.setup({});
            const userAddress = userInfo.address;
            return [null, userAddress];
        } catch (error) {
            return [{code: error.code || 10, reason: 'Unable to set-up user account.', stack: error.stack}, null];
        }
    }

    /**
     * Creates request for user to sign timestamp data to verify account ownership.
     * @param address User address to be authenticated.
     * @returns signed timestamp from user's wallet.
     */
    async getAuthentication(address: string): Promise<[AppError | null, Authentication | null]> {
        let link: Link = new Link(LinkEndpoint);

        try {
            const now: string = Math.floor(Date.now()/1000).toString();
            const message: string = hashMessage(now);
            const signature: { result: string } = await link.sign({ 
                message: message, 
                description: "Authentication Request"});
            const authentication: Authentication = {
                eth_address: address,
                eth_timestamp: Number(now),
                eth_signature: signature.result
            }
            return [null, authentication];
        } catch (error) {
            return [{code: error.code || 11, reason: "Could not obtain authentication data", stack: error.stack}, null];
        }
    }

    /**
     * Fetches user's NFT assets from cache, if available, or IMX API.
     * @param address eth address of user
     * @returns array of familiars the user owns
     */
    async getUserFamiliars(address: string): Promise<[AppError | null, Array<Familiar> | null]> {
        const now = Math.floor(Date.now()/1000);
        if(this.cache && now < this.cache.assets.expiration) {
            console.log("Returning data from cache");
            return [null, this.cache.assets.data];
        }

        let IMXClient: IIMX = new IMX(IMXEndpoint);

        try {
            console.log("Fetching data from IMX");
            const familiars = await IMXClient.getNFTAssets(address);
            this.cache = {
                assets: {
                    data: familiars,
                    expiration: now + (Config.API.IMX.CacheExpiration * 60)
                }
            }
            return [null, familiars];
        } catch (error) {
            return [{code: error.code || 1, reason: "Unable to fetch user's NFT assets.", stack: error.stack}, null];
        }
    }

    async getUserBalances(address: string): Promise<[AppError | null, IMXBalance | null]> {
        let IMXClient: IIMX = new IMX(IMXEndpoint);

        try {
            const balances: IMXBalance = await IMXClient.getUserBalances(address);

            return [null, balances];
        } catch (error) {
            return [{code: error.code || 1, reason: "Unable to fetch user's balance.", stack: error.stack}, null];
        }
    }

    // Browser API
    storeUserData(value: string): void {
        try {
            localStorage.setItem("UserAddress", value);
        } catch (error) {
            console.error(error);
        }
    }

    getUserData(): [AppError | null , string | null] {
        try {
            const data: string | null = localStorage.getItem("UserAddress");
            if (data === null) { return [{code: 5, reason: "No stored data."}, null]}
            
            const info: string | undefined = JSON.parse(data);
            if (info === undefined) { return [{code: 6,  reason: "Data parsing error."}, null]}
            return [null, info];

        } catch (error) {
            return [{code: 7, reason: "Unable to get browser data.", stack: error.stack}, null];
        }
    }

    deleteUserData(): void {
        try {
            localStorage.removeItem("UserAddress");
        } catch(error) {
            console.error(error);
        }
    }
}