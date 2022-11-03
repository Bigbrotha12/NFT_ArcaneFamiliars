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

export type Query = {
    id?: number | string,
    name?: string
}

export type User = {
    _id: string,
    total_minted: number,
    register_timestamp: number,
    last_active_timestamp: number,
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

export type Session = {
    address: string,
    session_id: string,
    login_timestamp: number,
    expiration: number,
    max_expiration: number
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
    path: Path,
    method: Method,
    headers: {
        eth_address: string,
        eth_timestamp: string,
        eth_signature: string
    },
    body?: {
        game_codehash?: string,
        game_savedata?: User["saveData"],
        progress?: boolean
    }
}

export type Response = {
    statusCode: number,
    status: string,
    headers: Object,
    body?: Object,
    error?: any
}

export const Responses = {
    200: { statusCode: 200, status: "OK", headers: { 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The request succeeded.
    201: { statusCode: 201, status: "Created", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The request succeeded, and a new resource was created as a result.
    202: { statusCode: 202, status: "Accepted", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The request has been received but not yet acted upon. 
    400: { statusCode: 400, status: "Bad Request", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The server cannot or will not process the request due to something that is perceived to be a client error
    401: { statusCode: 401, status: "Unauthorized", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". 
    403: { statusCode: 403, status: "Forbidden", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.
    404: { statusCode: 404, status: "Not Found", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The server can not find the requested resource.
    405: { statusCode: 405, status: "Method Not Allowed", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The request method is known by the server but is not supported by the target resource.
    500: { statusCode: 500, status: "Internal Server Error", headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-Type' : 'application/json' }, isBase64Encoded: false }, // The server has encountered a situation it does not know how to handle.
}

export enum Path {
    REGISTER = "/v1/user/register",
    LOGIN = "/v1/user/login",
    LOGOUT = "/v1/user/logout",
    SAVE = "/v1/user/save",
    LOAD = "/v1/user/load"
}

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}