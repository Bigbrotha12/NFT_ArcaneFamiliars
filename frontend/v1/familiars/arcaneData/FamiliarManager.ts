import { Familiar, Response, Responses } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { FamiliarController } from "./FamiliarController";

export async function FamiliarManager(tokenId: number, cachedDB: IDatabase): Promise<Response> {
    const controller: FamiliarController = new FamiliarController(cachedDB);

    const metadata: Familiar | null = await controller.getMetadata(tokenId);
    
    let response: Response
    if(!metadata) {
        console.error("Metadata for token id not found: ", tokenId);
        response = Responses[404];
        return response;
    }
    response = Responses[200];
    response.body = JSON.stringify(metadata);
    return response;
}