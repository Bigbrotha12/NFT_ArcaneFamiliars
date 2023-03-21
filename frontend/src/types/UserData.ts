import { Familiar } from "./Familiar";

export type UserData = {
    address: string,
    balance: {
        available: string,
        preparing: string,
        withdrawable: string
    },
    assets: Array<Familiar>
}