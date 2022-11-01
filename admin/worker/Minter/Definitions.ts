export enum Collections {
    Ability = "abilities",
    Counter = "counters",
    Familiar = "familiars",
    Session = "session",
    Template = "templates",
    User = "users"
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
    meta: {
        status: string,
        mint_timestamp: number,
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

export type Stage1 = {
    tokenId: number,
    address: string,
    blueprint: Array<string>
}

export type Stage2 = {
    tokens:
    [{
        blueprint: string,
        id: string,
    }],
    user: string
}