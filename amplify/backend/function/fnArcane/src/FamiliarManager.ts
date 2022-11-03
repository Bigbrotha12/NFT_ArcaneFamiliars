import { Familiar, Response, Responses } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { FamiliarController } from "./FamiliarController";

export async function FamiliarManager(tokenId: number, cachedDB: IDatabase): Promise<Response> {
    const controller: FamiliarController = new FamiliarController(cachedDB);
    const metadata: Familiar | null = await controller.getMetadata(tokenId);
    
    if(!metadata) {
        console.error("Metadata for token id not found: ", tokenId);
        let response: Response = {...Responses[404], body: "Metadata for token id not found"};
        return response;
    }
    let response: Response = {...Responses[200], body: ""};
    response.body = JSON.stringify(metadata);
    return response;
}