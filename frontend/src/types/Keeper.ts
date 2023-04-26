export type Keeper = {
    _id: number,
    keeperId: number,
    name: string,
    description: string,
    image_url: string,
    image: string,
    levels: number,
    meta?: {
        status?: string,
        mint_timestamp?: number,
        origin_owner?: string,
        minted?: number,
        limit?: number
    }
}