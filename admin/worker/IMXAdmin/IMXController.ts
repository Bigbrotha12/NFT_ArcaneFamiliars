import { UpdateCollectionRequest } from "@imtbl/core-sdk";
import Config from "./Config.json";
import IIMX from "./IIMX";
import IMX from "./IMX";

export default class IMXController {
    IMX: IIMX;

    constructor() {
        this.IMX = new IMX();
    }

    async createProject() {
        console.error("Not Implemented");
    }

    async getProjectData() {
        console.error("Not Implemented");
    }

    async createCollection() {
        console.error("Not Implemented");
    }

    async addMetadataSchema() {
        console.error("Not Implemented");
    }

    async getCollectionDetails(): Promise<void> {
        const response = await this.IMX.getCollectionDetails();
        console.log(response);
    }

    async getAllCollections() {
        console.error("Not Implemented");
    }

    async updateCollection() {
        const request: UpdateCollectionRequest = {
            collection_image_url: Config.Collections[0].Collection_image_url,
            description: Config.Collections[0].Description,
            icon_url: Config.Collections[0].Icon_url,
            metadata_api_url: Config.Collections[0].Metadata_api_url,
            name: Config.Collections[0].Collection_name
        }

        const response = await this.IMX.updateCollection(request);
        console.log(response);
    }

    async getMetadataSchema() {
        const response = await this.IMX.getMetadataSchema();
        console.log(response);
    }

    async updateMetadataByName() {

    }

    async updateMetadataById(id: Array<string>) {
        console.log("Updating metadata for token id:");
        console.log(id);

        const response = await this.IMX.updateMetadataById(id);
        console.log(response);
    }

    async metadataRefreshStatus(id: string) {
        
        const response = await this.IMX.getRefreshResult(id);
        console.log(response);
    }

    async getAsset(id: string) {
        const response = await this.IMX.getAsset(id);
        console.log(response);
    }
}