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
    meta?: {
        status?: string,
        mint_timestamp?: string,
        origin_owner?: string,
        minted?: number,
        limit?: number
    }
}

export type User = {
    _id: string,
    total_minted: number,
    register_timestamp: string,
    last_active_timestamp: string,
    saveData: {
        name: string,
        level: number,
        items: Array<string>,
        locations: Object,
        progress: Array<number>
    }
    blacklist: boolean,
    reason: string
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

export type Request = {
    headers: {
        eth_address: string,
        eth_timestamp: string,
        eth_signature: string
    },
    body: {
        game_data: string,
        game_codehash: string
    }
}

export type Response = {
    statusCode: number,
    status: string,
    headers?: Object,
    body?: Object,
    error?: any
}

export const Responses = {
    200: { statusCode: 200, status: "OK" }, // The request succeeded.
    201: { statusCode: 201, status: "Created" }, // The request succeeded, and a new resource was created as a result.
    202: { statusCode: 202, status: "Accepted" }, // The request has been received but not yet acted upon. 
    400: { statusCode: 400, status: "Bad Request" }, // The server cannot or will not process the request due to something that is perceived to be a client error
    401: { statusCode: 401, status: "Unauthorized" }, // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". 
    403: { statusCode: 403, status: "Forbidden" }, // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.
    404: { statusCode: 404, status: "Not Found" }, // The server can not find the requested resource.
    405: { statusCode: 405, status: "Method Not Allowed" }, // The request method is known by the server but is not supported by the target resource.
    500: { statusCode: 500, status: "Internal Server Error" }, // The server has encountered a situation it does not know how to handle.
}