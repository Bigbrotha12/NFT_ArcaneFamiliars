
export interface IEthereum {
    // Initialization
    init(): Promise<void>,
    // Getters
    getNFTBalance(address: string): Promise<number>,
    getBlueprint(id: number): Promise<string>,
    getEndpoint(): Promise<string>,
    getOwnerOf(id: number): Promise<string>,
    getOwner(): Promise<string>,
    // Setters
    transferNFT(id: number, recipient: string): Promise<any>,
    setApproval(controller: string): Promise<any>,
    importToIMX(id: number): Promise<any>,
}