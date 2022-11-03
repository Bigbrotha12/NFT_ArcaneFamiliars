import { 
    ImmutableX, Config, ImmutableXConfiguration, GetProjectsResponse, 
    Project, CreateProjectResponse, CreateProjectRequest, 
    MetadataApiGetMetadataSchemaRequest, MetadataSchemaProperty, 
    CreateMetadataRefreshRequest, CreateMetadataRefreshResponse, 
    CreateCollectionRequest, Collection, AddMetadataSchemaToCollectionRequest, 
    SuccessResponse, MetadataSchemaRequest, CollectionsApiGetCollectionRequest, 
    CollectionsApiListCollectionsRequest, ListCollectionsResponse, UpdateCollectionRequest, 
    /*WalletConnection, StarkSigner, RegisterUserResponse, */GetMetadataRefreshResponse, 
    AssetsApiGetAssetRequest,
    Asset
} from '@imtbl/core-sdk';
import { Wallet } from '@ethersproject/wallet';
import { extractStringEnvVar } from './Environment';
import IIMX from './IIMX';

export default class IMX implements IIMX {
    client: ImmutableX;
    signer: Wallet;
    collection: string;

    constructor() {
        const env: string = extractStringEnvVar("ENVIRONMENT");
        let config: ImmutableXConfiguration;
        if(env === "PROD") {
            config = Config.PRODUCTION;
        } else {
            config = Config.SANDBOX;
        }
        
        this.client = new ImmutableX(config);
        this.signer = new Wallet(extractStringEnvVar("MINTER_KEY"));
        this.collection = extractStringEnvVar("COLLECTION");
    }

    async createProject(): Promise<number> {
        const request: CreateProjectRequest = {
            company_name: extractStringEnvVar("COMPANY"),
            contact_email: extractStringEnvVar("EMAIL"),
            name: extractStringEnvVar("PROJECT_NAME"),
        };

        const response: CreateProjectResponse = await this.client.createProject(this.signer, request);
        return response.id
    }

    async getProjectsData(): Promise<Array<Project>> {

        const response: GetProjectsResponse = await this.client.getProjects(this.signer);
        return response.result

    }

    async createCollection(id: number) {

        const request: CreateCollectionRequest = {
            contract_address: extractStringEnvVar("CONTRACT_ADDRESS"),
            name: extractStringEnvVar("COLLECTION_NAME"),
            owner_public_key: extractStringEnvVar("MINTER_ADDRESS"),
            project_id: id,
            collection_image_url: "",
            description: "",
            icon_url: "",
            metadata_api_url: ""
        };

        const response: Collection = await this.client.createCollection(this.signer, request);
        return response;
    }
    
    async addMetadataSchema(): Promise<string> {
        const schema: MetadataSchemaRequest = {
            name: "",
            type: "text",
            filterable: false
        };

        const request: AddMetadataSchemaToCollectionRequest = {
            metadata: [schema]
        };
        
        const response: SuccessResponse = 
            await this.client.addMetadataSchemaToCollection(this.signer, this.collection, request);
        
        return response.result;
    }

    async getCollectionDetails() {
        const request: CollectionsApiGetCollectionRequest = {
            address: this.collection
        };

        const response: Collection = await this.client.getCollection(request);
        return response;
    }

    async getAllCollections() {
        const request: CollectionsApiListCollectionsRequest = {
            blacklist: "",
            cursor: "",
            direction: "asc",
            keyword: "",
            orderBy: "name",
            pageSize: 10,
            whitelist: ""
        };

        const response: ListCollectionsResponse = await this.client.listCollections(request);
        return response;
    }

    async updateCollection(request: UpdateCollectionRequest) {
        
        const response: Collection = 
            await this.client.updateCollection(this.signer, this.collection, request);
        
        return response;
    }

    async getMetadataSchema(): Promise<MetadataSchemaProperty[]> {
        const request: MetadataApiGetMetadataSchemaRequest = {
            address: this.collection
        };
        
        const response: Array<MetadataSchemaProperty> = await this.client.getMetadataSchema(request);
        return response;
    }

    async updateMetadataById(id: Array<string>) {
        const request: CreateMetadataRefreshRequest = {
            collection_address: this.collection,
            token_ids: id
        };

        const response: CreateMetadataRefreshResponse = await this.client.createMetadataRefresh(this.signer, request);
        return response.refresh_id;
    }

    async getRefreshResult(id: string) {

        const response: GetMetadataRefreshResponse = await this.client.getMetadataRefreshResults(this.signer, id);
        return response;
    }

    async getAsset(id: string): Promise<Asset> {
        const request: AssetsApiGetAssetRequest = {
            tokenAddress: this.collection,
            tokenId: id
        }
        
        const response = await this.client.getAsset(request);
        return response;
    }
}
