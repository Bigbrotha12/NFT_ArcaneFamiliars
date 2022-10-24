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
    meta: {
        status: string,
        mint_timestamp: string,
        origin_owner: string
    }
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

export interface DBInterface {
    init(): Promise<void>,
    getFamiliarByID(tokenId: number): Promise<Familiar | undefined>,
    getPendingMints(): Promise<Array<Familiar> | undefined>,
    getMintStatus(tokenId: number): Promise<string | undefined>,
    updatePendingMints(tokens: Array<Familiar>): Promise<boolean | undefined>
}

