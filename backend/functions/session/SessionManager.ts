import { Request, Response, Responses, Path, Method, Session, User } from "../shared/Definitions";
import IDatabase from "../shared/IDatabase";
import SessionController from "./SessionController";

/**
 * Routes requests by paths and methods to the appropriate handler.
 * @param event request from user
 * @param cachedDB cached database connection
 * @returns HTTP response depending on resource
 */
export default async function Router(event: Request, cachedDB: IDatabase): Promise<Response> {
    const controller: SessionController = new SessionController(cachedDB);

    switch(event.path) {
        case Path.REGISTER:
            if(event.httpMethod === Method.POST) { 
                return await registration(event, controller) }
            else if(event.httpMethod === Method.GET) { 
                return await isRegistered(event, controller) }
            else { return {...Responses[405], body: JSON.stringify({ message: "Invalid method" })}}
        case Path.LOGIN:
            if(event.httpMethod === Method.PUT) { 
                return await userLogin(event, controller) }
            else if(event.httpMethod === Method.GET) {
                return await getSessionStatus(event, controller)}
            else { return {...Responses[405], body: JSON.stringify({ message: "Invalid method" })}}
        case Path.LOGOUT:
            if(event.httpMethod === Method.DELETE) { 
                return await userLogout(event, controller) }
            else { return {...Responses[405], body: JSON.stringify({ message: "Invalid method" })}}
        case Path.SAVE:
            if(event.httpMethod === Method.POST) { 
                return await saveGame(event, controller) }
            else { return {...Responses[405], body: JSON.stringify({ message: "Invalid method" })}}
        case Path.LOAD:
            if(event.httpMethod === Method.GET) { 
                return await loadGame(event, controller) }
            else { return {...Responses[405], body: JSON.stringify({ message: "Invalid method" })}}
        default:
            return {...Responses[404], body: JSON.stringify({ message: "Invalid resource" })};
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
    
    // validate authentication data
    const validRequest: boolean = controller.verifyAuthentication(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        let body = { message: "Incorrect authentication data" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }

    // register the user
    const success: boolean | null = await controller.registerUser(event.headers.eth_address);
    if(!success) {
        console.error("Registration failed.");
        let body = { message: "Registration failed." }
        let response: Response = {...Responses[400], body: JSON.stringify(body)};
        return response;
    }

    // if registration is successful, login user as well
    let session = await controller.loginUser(event.headers.eth_address, event.headers.eth_signature);
    let body = { message: "Registration successful", isLoggedIn: true, expiration: session?.expiration, max_expiration: session?.max_expiration }
    let response: Response = {...Responses[201], body: JSON.stringify(body)};
    return response;
}

/**
 * Checks whether user is already registered on database.
 * @param event registration check request from user
 * @param controller session controller instance
 */
 async function isRegistered(event: Request, controller: SessionController): Promise<Response> {
    
    // if user data document is null, then user is not registered
    const user: User | null = await controller.getUserData(event.headers.eth_address);
    if(!user) {
        let body = { isRegistered: false };
        let response: Response = {...Responses[200], body: JSON.stringify(body)};
        return response;
    }

    // if user data was found, then user is registered
    let body = { isRegistered: true };
    let response: Response = {...Responses[200], body: JSON.stringify(body)};
    return response;
}

/**
 * Checks user's login status and expiration dates, if applicable.
 * @param event session status check request from user
 * @param controller session controller instance
 */
async function getSessionStatus(event: Request, controller: SessionController): Promise<Response> {

    // validate user signature
    const validRequest: boolean = controller.verifyUserSignature(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        let body = { message: "Incorrect authentication data" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }

    // if user data document is null, then user is not logged in
    const session: Session | null = await controller.getSessionData(event.headers.eth_address);
    if(!session) {
        let body = { isLoggedIn: false, expiration: 0, max_expiration: 0 }
        let response: Response = {...Responses[200], body: JSON.stringify(body)};
        return response;
    }

    // if user data was found, then user is registered
    let body = { message: "Session found", isLoggedIn: true, expiration: session.expiration, max_expiration: session.max_expiration }
    let response: Response = {...Responses[200], body: JSON.stringify(body)};
    return response;
}

/**
 * Allows user to create new session with server or refresh it if one already exist.
 * Requires authentication and user registration.
 * @param event login request sent by user
 * @param controller session controller instance 
 */
async function userLogin(event: Request, controller: SessionController): Promise<Response> {
    
    // validate authentication data
    const validRequest: boolean = controller.verifyAuthentication(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        let body = { message: "Incorrect authentication data" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }

    // check if user is registered
    // if user data document is undefined, then user is not registered
    const user: User | null = await controller.getUserData(event.headers.eth_address);
    if(!user) {
        let body = { message: "Not registered." }
        let response: Response = {...Responses[400], body: JSON.stringify(body)};
        return response;
    }
   
    // login user
    const session: Session | null = await controller.loginUser(event.headers.eth_address, event.headers.eth_signature);
    if(!session) {
        console.error("Login attempt failed");
        let body = { message: "Login attempt failed" }
        let response: Response = {...Responses[500], body: JSON.stringify(body)};
        return response;
    }

    let body = { message: "Login successful", isLoggedIn: true, expiration: session.expiration, max_expiration: session.max_expiration }
    let response: Response = {...Responses[200], body: JSON.stringify(body)};
    return response; 
}

/**
 * Allows user to logout session. Requires valid signature.
 * @param event logout request sent by user
 * @param controller session controller instance 
 */
async function userLogout(event: Request, controller: SessionController): Promise<Response> {
    
    // validate user signature
    const validRequest: boolean = controller.verifyUserSignature(event);
    if(!validRequest) {
        console.error("Incorrect authentication data");
        let body = { message: "Incorrect authentication data" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }

    // log user out
    const success: boolean | null = await controller.logoutUser(event.headers.eth_address);
    if(!success) {
        console.error("Logout attempt failed");
        let body = { message: "Logout attempt failed" }
        let response: Response = {...Responses[500], body: JSON.stringify(body)};
        return response;
    }

    let body = { message: "Logout successful" }
    let response: Response = {...Responses[200], body: JSON.stringify(body)};
    return response;
}

/**
 * Allows user to save their game progress. Requires valid signature,
 * valid session, and valid game signature.
 * @param event game save request sent by user
 * @param controller session controller instance
 */
async function saveGame(event: Request, controller: SessionController): Promise<Response> {
    
    // parse the body from string to json
    const data: Request["body"] = JSON.parse(event.body as string);

    // check that there's game data to be saved
    if(!data || data.game_savedata === undefined || data.progress === undefined) {
        console.error("Invalid save data received");
        let body = { message: "Invalid save data received" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }

    // validate user request 
    const validSignature: boolean = controller.verifyUserSignature(event);
    const validGame: boolean = controller.verifyGameSignature(event);
    const session: Session | null = await controller.getSessionData(event.headers.eth_address);
    if(!session) {
        console.error("Not valid session found");
        let body = { message: "Not valid session found" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }
    const validSession: boolean = controller.checkValidSession(event, session);
    if(!validSignature || !validGame || !validSession) {
        console.error("Invalid request data");
        let body = { message: "Invalid request data" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }

    // save user data to database
    const success: boolean | null = await controller.saveUserGame(session, data.game_savedata, data.progress);
    if(!success) {
        console.error("Data could not be saved to server");
        let body = { ...data.game_savedata }
        let response: Response = {...Responses[500], body: JSON.stringify(body)};
        return response;
    }
    
    let body = { message: "Saved successfully" }
    let response: Response = {...Responses[200], body: JSON.stringify(body)};
    return response;
}

/**
 * Retrieves saved game data for the user. Requires valid session, and
 * valid signature.
 * @param event Load game request sent by user
 * @param controller session controller instance 
 */
async function loadGame(event: Request, controller: SessionController): Promise<Response> {
    
    // validate user request
    const validSignature: boolean = controller.verifyUserSignature(event);
    const session: Session | null = await controller.getSessionData(event.headers.eth_address);
    if(!session) {
        console.error("Not valid session found");
        let body = { message: "Not valid session found" }
        let response: Response = {...Responses[401], body: JSON.stringify(body)};
        return response;
    }
    const validSession: boolean = controller.checkValidSession(event, session);
    if(!validSignature || !validSession) {
        console.error("Invalid request data");
        let body = { message: "Invalid request data" }
        let response: Response = {...Responses[400], body: JSON.stringify(body)};
        return response;
    }

    // Retrieve user's save data
    const saveData: User["saveData"] | null = await controller.loadUserGame(session);
    if(!saveData) {
        console.error("Game data could not be retrieved");
        let body = { message: "Game data could not be retrieved" }
        let response: Response = {...Responses[500], body: JSON.stringify(body)};
        return response;
    }

    let response: Response = {...Responses[200], body: JSON.stringify(saveData)};
    return response;
}