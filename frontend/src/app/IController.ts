import { Authentication, AppError, IMXBalance } from "../types/IMX";
import { Familiar } from "../types/familiar";

export interface IController {
    connectIMX(): Promise<[AppError | null, string | null]>,
    getAuthentication(address: string): Promise<[AppError | null, Authentication | null]>,
    getUserFamiliars(address: string): Promise<[AppError | null, Array<Familiar> | null]>,
    getUserBalances(address: string): Promise<[AppError | null, IMXBalance | null]>,
    storeUserData(data: string): void,
    deleteUserData(): void
}