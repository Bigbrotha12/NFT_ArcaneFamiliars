import { Familiar, Response, Responses } from "../shared/Definitions";
import IDatabase from "../shared/IDatabase";
import MetadataController from "./MetadataController";

export default async function MetadataManager(tokenId: number, cachedDB: IDatabase): Promise<Response> {
    const controller: MetadataController = new MetadataController(cachedDB);
    const metadata: Familiar | null = await controller.getMetadata(tokenId);

    if(!metadata) {
        console.error("Metadata for token id not found: ", tokenId);
        let body = { message: "Metadata for token id not found" };
        let response: Response = {...Responses[404], body: JSON.stringify(body)};
        return response;
    }
    delete metadata.meta;
    let response: Response = {...Responses[200], body: JSON.stringify(metadata)};
    return response;
}