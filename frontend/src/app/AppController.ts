import { UserInfo } from "./Definitions";

export class AppController {

    constructor() {

    }

    storeUserData(value: UserInfo): void {
        const data = JSON.stringify(value);

        try {
            localStorage.setItem("UserData", data);
        } catch (error) {
            console.error(error);
        }
    }

    getUserData(): UserInfo | null {
        const data = localStorage.getItem("UserData");
        if(data === null) {
            return null;
        }
        
        const info: UserInfo | undefined = JSON.parse(data);
        if(info === undefined) {
            return null
        }
        return info;
    }
}