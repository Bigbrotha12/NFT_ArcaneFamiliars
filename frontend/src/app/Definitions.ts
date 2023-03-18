export type UserData = {
    address: string,
    balance: IMXBalance,
    assets: Array<Familiar>
}

export type IMXClient = {
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    authenticate: () => Promise<void>,
}
export type IMXBalance = {
    available: string,
    preparing: string,
    withdrawable: string
}

export type Error = {
    code: number,
    reason: string,
    stack?: unknown
}

export type Authentication = {
    eth_address: string,
    eth_timestamp: number,
    eth_signature: string
}

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
