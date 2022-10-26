import { Request, Response, Responses, Path, Method, Session, User } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { SessionController } from "./SessionController";

/**
 * Routes requests by paths and methods to the appropriate handler.
 * @param event request from user
 * @param cachedDB cached database connection
 * @returns HTTP response depending on resource
 */
export async function Router(event: Request, cachedDB: IDatabase): Promise<Response> {
    const controller: SessionController = new SessionController(cachedDB);

    switch(event.path) {
        case Path.REGISTER:
            if(event.httpMethod === Method.POST) { 
                return await registration(event, controller) }
            else if(event.httpMethod === Method.GET) { 
                return await isRegistered(event, controller) }
            else { return Responses[405] }
        case Path.LOGIN:
            if(event.httpMethod === Method.PUT) { 
                return await userLogin(event, controller) }
            else { return Responses[405] }
        case Path.LOGOUT:
            if(event.httpMethod === Method.DELETE) { 
                return await userLogout(event, controller) }
            else { return Responses[405] }
        case Path.SAVE:
            if(event.httpMethod === Method.PATCH) { 
                return await saveGame(event, controller) }
            else { return Responses[405] }
        case Path.LOAD:
            if(event.httpMethod === Method.GET) { 
                return await loadGame(event, controller) }
            else { return Responses[405] }
        default:
            return Responses[404];
    }
}

/**
 * Creates new record for user at given address. User registration 
 * requires user address not be present in database. Requires valid
 * authentication data.
 * @param event registration request from user
 * @param controller session controller instance
 */
async function registration(event: Request, controller: SessionController): Promise<Response> {
    
    let response: Response;
    // validate authentication data
    const validRequest: boolean = controller.verifyAuthentication(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        response = Responses[401];
        return response;
    }

    // register the user
    const success: boolean | undefined = await controller.registerUser(event.headers.eth_address);
    if(success === undefined) {
        console.error("Registration failed.")
        response = Responses[400];
        return response;
    }

    // if registration is successful, login user as well
    await controller.loginUser(event.headers.eth_address, event.headers.eth_signature);
    response = Responses[201];
    return response;
}

/**
 * Checks whether user is already registered on database.
 * @param event registration check request from user
 * @param controller session controller instance
 */
 async function isRegistered(event: Request, controller: SessionController): Promise<Response> {
    
    let response: Response;
    // if user data document is undefined, then user is not registered
    const user: User | undefined = await controller.getUserData(event.headers.eth_address);
    if(user === undefined) {
        response = Responses[200];
        response.body = { isRegistered: false }
        return response;
    }

    // if user data was found, then user is registered
    response = Responses[200];
    response.body = { isRegistered: true }
    return response;
}

/**
 * Allows user to create new session with server or refresh it if one already exist.
 * Requires authentication and user registration.
 * @param event login request sent by user
 * @param controller session controller instance 
 */
async function userLogin(event: Request, controller: SessionController): Promise<Response> {
    
    let response: Response;
    // validate authentication data
    const validRequest: boolean = controller.verifyAuthentication(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        response = Responses[401];
        return response;
    }

    // check if user is registered
    // if user data document is undefined, then user is not registered
    const user: User | undefined = await controller.getUserData(event.headers.eth_address);
    if(user === undefined) {
        response = Responses[400];
        response.error = { message: "Not registered, user must be registered prior to login" }
        return response;
    }
   
    // login user
    const success: boolean | undefined = await controller.loginUser(event.headers.eth_address, event.headers.eth_signature);
    if(success === undefined) {
        console.error("Login attempt failed");
        response = Responses[500];
        return response;
    }

    response = Responses[200];
    return response; 
}

/**
 * Allows user to logout session. Requires valid signature.
 * @param event logout request sent by user
 * @param controller session controller instance 
 */
async function userLogout(event: Request, controller: SessionController): Promise<Response> {
    
    let response: Response;
    // validate user signature
    const validRequest: boolean = controller.verifyUserSignature(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        response = Responses[401];
        return response;
    }

    // log user out
    const success: boolean | undefined = await controller.logoutUser(event.headers.eth_address);
    if(success === undefined) {
        console.error("Logout attempt failed");
        response = Responses[500];
        return response;
    }

    response = Responses[200];
    return response;
}

/**
 * Allows user to save their game progress. Requires valid signature,
 * valid session, and valid game signature.
 * @param event game save request sent by user
 * @param controller session controller instance
 */
async function saveGame(event: Request, controller: SessionController): Promise<Response> {
    
    let response: Response;
    // check that there's game data to be saved
    if(!event.body?.game_savedata || !event.body?.progress) {
        console.error("Invalid save data received");
        response = Responses[400];
        response.error = {message: "Expected field \"game_savedata\" and \"progress\" to be defined"}
        return response;
    }
    // validate user request
    const validSignature: boolean = controller.verifyUserSignature(event);
    const validGame: boolean = controller.verifyGameSignature(event);
    const session: Session | undefined = await controller.getSessionData(event.headers.eth_address);
    if(session === undefined) {
        console.error("Not valid session found");
        response = Responses[401];
        return response;
    }
    const validSession: boolean = controller.checkValidSession(event, session);
    if(!validSignature || !validGame || !validSession) {
        console.error("Invalid request data");
        response = Responses[401];
        return response;
    }

    // save user data to database
    const success: boolean | undefined = await controller.saveUserGame(session, event.body.game_savedata, event.body.progress);
    if(success === undefined) {
        console.error("Data could not be saved to server");
        response = Responses[500];
        response.error = {message: "Save data could not be saved"};
        return response;
    }
    
    response = Responses[200]
    return response;
}

/**
 * Retrieves saved game data for the user. Requires valid session, and
 * valid signature.
 * @param event Load game request sent by user
 * @param controller session controller instance 
 */
async function loadGame(event: Request, controller: SessionController): Promise<Response> {
    
    let response: Response;
    // validate user request
     const validSignature: boolean = controller.verifyUserSignature(event);
     const session: Session | undefined = await controller.getSessionData(event.headers.eth_address);
     if(session === undefined) {
         console.error("Not valid session found");
         response = Responses[401];
         return response;
     }
     const validSession: boolean = controller.checkValidSession(event, session);
     if(!validSignature || !validSession) {
         console.error("Invalid request data");
         response = Responses[400];
         return response;
     }

     // Retrieve user's save data
     const saveData: User["saveData"] | undefined = await controller.loadUserGame(session);
     if(saveData === undefined) {
        console.error("Game data could not be retrieved");
        response = Responses[500];
        response.error = { message: "Save data could not be loaded" };
        return response;
     }

     response = Responses[200];
     response.body = saveData;
     return response;
}