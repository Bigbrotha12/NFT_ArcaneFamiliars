import { Asset, MetadataSchemaProperty, UpdateCollectionRequest } from "@imtbl/core-sdk"

export default interface IIMX {
    createProject(): any,
    getProjectsData(): any
    createCollection(id: number): any,

    addMetadataSchema(): any
    getCollectionDetails(): any,
    getAllCollections(): any,
    updateCollection(request: UpdateCollectionRequest): any,
    getMetadataSchema(): Promise<MetadataSchemaProperty[]>,
    updateMetadataById(id: Array<string>): any,
    getRefreshResult(id: string): any,
    getAsset(id: string): Promise<Asset>
}