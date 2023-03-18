import { Authentication, Familiar, Error, IMXBalance } from "./Definitions";

export interface IController {
    connectIMX(): Promise<[Error | null, string | null]>,
    getAuthentication(address: string): Promise<[Error | null, Authentication | null]>,
    getUserFamiliars(address: string): Promise<[Error | null, Array<Familiar> | null]>,
    getUserBalances(address: string): Promise<[Error | null, IMXBalance | null]>,
    storeUserData(data: string): void,
    deleteUserData(): void
}