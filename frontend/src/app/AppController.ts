import { UserInfo, Familiar } from "./Definitions";
import { IController } from "./IController";
import { IIMX } from './API/IIMX';
import { IMX } from "./API/IMX";
import Config from "./constants/AppConfig.json";

export class AppController implements IController {
    IMX: IIMX;
    cache: {
        assets: {
            data: Array<Familiar>,
            expiration: number
        }
    } | null;

    constructor() {
        this.IMX = new IMX(Config.API.Link.Sandbox);
        this.cache = null;
    }

    // IMX API

    /**
     * Sets up user account connection with IMX Link
     */
    async connectIMX(): Promise<string | null> {

        try {
            const userAddress: string = await this.IMX.setupUserAccount();
            return userAddress;
        } catch (error) {
            return null;
        }
    }

    /**
     * Fetches user's NFT assets from cache, if available, or IMX API.
     * @param address eth address of user
     * @returns array of familiars the user owns
     */
    async getUserFamiliars(address: UserInfo["address"]): Promise<Array<Familiar> | null> {
        if(address === null) {return null};

        const now = Math.floor(Date.now()/1000);
        if(this.cache && now < this.cache?.assets.expiration) {
            return this.cache.assets.data;
        } 

        try {
            const familiars = await this.IMX.getNFTAssets(address, Config.Blockchain.Collection.Sandbox);
            this.cache = {
                assets: {
                    data: familiars,
                    expiration: now + (Config.API.IMX.CacheExpiration * 60)
                }
            }
            return familiars;
        } catch (error) {
            return null;
        }
    }

    // Browser API
    storeUserData(value: UserInfo): void {
        const data = JSON.stringify(value);

        try {
            localStorage.setItem("UserData", data);
        } catch (error) {
            console.error(error);
        }
    }

    getUserData(): UserInfo | null {
        try {
            const data = localStorage.getItem("UserData");
            if(data === null) { return null}
            
            const info: UserInfo | undefined = JSON.parse(data);
            if(info === undefined) { return null}

            return info;
        } catch (error) {
            return null;
        }
    }

    deleteUserData(): void | null {
        try {
            localStorage.removeItem("UserData");
        } catch(error) {
            return null;
        }
    }
}