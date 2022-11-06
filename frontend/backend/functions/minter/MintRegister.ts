import { Familiar, User, Request, Response, Responses } from "../shared/Definitions";
import IDatabase from "../shared/IDatabase";
import RegisterController from "./RegisterController";

/**
 * Core business logic for processing mint requests and handling
 * user response.
 * @param event HTTP mint request received from user
 * @returns HTTP response to user request
 */
export default async function MintRegister(event: Request, cachedDB: IDatabase): Promise<Response> {

    const controller: RegisterController = new RegisterController(cachedDB);
    const user: User | null = await controller.getUserData(event.headers.eth_address);
    if(!user) {
        console.error("No such user registered");
        console.info("Invalid request from %s", event.headers.eth_address);
        let response: Response = {...Responses[400], body: JSON.stringify({ message: "No such user registered" })}; 
        return response;
    }

    const validation: boolean = controller.verifyRequest(event, user);
    if(!validation) {
        console.info("Invalid request from %s", event.headers.eth_address);
        let response: Response = {...Responses[401], body: JSON.stringify({ message: "Data verification failed" })}; 
        return response;
    } 

    const familiar: Familiar | null = await controller.generateNextFamiliar(user);
    if(!familiar) {
        console.error("Failed to generate familiar");
        console.info("Valid but failed request from %s", event.headers.eth_address);
        let response: Response = {...Responses[500], body: JSON.stringify({ message: "NFT generation failed" })}; 
        return response;
    }

    const result: boolean | null = await controller.registerFamiliar(familiar, user);
    if(!result) {
        console.error("Failed to register familiar");
        console.info("Valid but failed request from %s", event.headers.eth_address);
        let response: Response = {...Responses[500], body: JSON.stringify({ message: "NFT registration failed" })};
        return response;
    }

    if(result) {
        let response: Response = {...Responses[200], body: ""};
        delete familiar.meta;
        response.body = JSON.stringify(familiar);
        return response;
    } else {
        let response: Response = {...Responses[500], body: JSON.stringify({ message: "Unknown Error" })};
        return response;
    }
}
