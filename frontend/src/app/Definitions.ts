import React from "react"

export type UserInfo = {
    address: string,
    balance: {
        imx: number,
        preparing: number,
        withdrawable: number
    },
    isConnected: boolean,
    preferences: {
        theme: "light" | "dark"
    },
    NFTs: Array<Familiar>
}

export type UserContextType = [UserInfo, React.Dispatch<React.SetStateAction<UserInfo>>]

export type Familiar = {
    _id: number,
    familiarId: number,
    name: string,
    description: string,
    image_url: string,
    image: string,
    affinity: Affinity,
    HP: number,
    MP: number,
    attack: number,
    defense: number,
    arcane: number,
    speed: number,
    ability_1: string,
    ability_2: string,
    ability_3: string,
    ability_4: string,
    rarity: Rarity,
    generation: number
    meta?: {
        status?: string,
        mint_timestamp?: number,
        origin_owner?: string,
        minted?: number,
        limit?: number
    }
}

export type Ability = {
    _id: any,
    name: string,
    description: string,
    effect: Array<any>,
    drawback: Array<any>
}

export enum Affinity {
    Light = "Light",
    Dark = "Dark",
    Fire = "Fire",
    Water = "Water",
    Earth = "Earth",
    Wind = "Wind"
}

export enum Rarity {
    common = "common",
    uncommon = "uncommon",
    rare = "rare",
    secret = "secret",
    legendary = "legendary",
}
