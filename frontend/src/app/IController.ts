import { Familiar, UserInfo } from "./Definitions";

export interface IController {
    connectIMX(): Promise<string | null>,
    getUserFamiliars(address: UserInfo["address"]): Promise<Array<Familiar> | null>,
    getUserData(): UserInfo | null,
    storeUserData(data: UserInfo): void,
    deleteUserData(): void
}