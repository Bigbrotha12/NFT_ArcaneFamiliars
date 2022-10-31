import { Familiar, User, Request, Response, Responses } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { RegisterController } from "./RegisterController";

/**
 * Core business logic for processing mint requests and handling
 * user response.
 * @param event HTTP mint request received from user
 * @returns HTTP response to user request
 */
export async function MintRegister(event: Request, cachedDB: IDatabase): Promise<Response> {
    let response: Response;
    const controller: RegisterController = new RegisterController(cachedDB);

    const user: User | undefined = await controller.getUserData(event.headers.eth_address);
    if(user === undefined) {
        console.error("No such user registered");
        console.info("Invalid request from %s", event.headers.eth_address);
        response = Responses[400]; 
        response.error = { message: "No such user registered" };

        return response;
    }

    const validation: boolean = controller.verifyRequest(event, user);
    if(!validation) {
        console.info("Invalid request from %s", event.headers.eth_address);
        response = Responses[401]; 
        response.error = { message: "Data verification failed" };
        return response;
    } 

    const familiar: Familiar | undefined = await controller.generateNextFamiliar(user);
    if(familiar === undefined) {
        console.error("Failed to generate familiar");
        console.info("Valid but failed request from %s", event.headers.eth_address);
        response = Responses[500]; 
        response.error = {message: "NFT generation failed"}
        return response;
    }

    const result: boolean | undefined = await controller.registerFamiliar(familiar, user);
    if(result === undefined) {
        console.error("Failed to register familiar");
        console.info("Valid but failed request from %s", event.headers.eth_address);
        response = Responses[500];
        response.error = { message: "NFT registration failed" }
        return response;
    }

    if(result) {
        response = Responses[200];
        delete familiar.meta;
        response.body = familiar;
        return response;
    } else {
        response = Responses[500];
        response.error = { message: "Unknown Error" }
        return response;
    }
}