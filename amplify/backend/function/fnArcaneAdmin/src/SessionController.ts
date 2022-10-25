import { Request, Session, User } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";
import { Validator } from "./Validator";
import { extractNumberEnvVar } from "./Environment";

export class SessionController {
    DB: IDatabase

    constructor(cachedDB: IDatabase) {
        this.DB = cachedDB;
    }

    /**
     * Verifies incoming request was sent by the owner of a given address.
     * @param request user request requiring full authentication
     * @returns true if authentication data is valid
     */
    verifyAuthentication(request: Request): boolean {
        if(!Validator.verifyTimestamp(request)) {
            console.error("Invalid timestamps: %n", request.headers.eth_timestamp);
            return false;
        }
        if(!Validator.verifySignature(request)) {
            console.error("Unable to recover address from: %s", request.headers.eth_address);
            return false;
        }
        return true;
    }

    /**
     * Verifies incoming request was sent by owner of given address, but skips 
     * checks for signature staleness. Useful if user already has valid session.
     * @param request user request to be verified
     * @returns true if signature is valid for given user address
     */
    verifyUserSignature(request: Request): boolean {
        if(!Validator.verifySignature(request)) {
            console.error("Unable to recover address from: %s", request.headers.eth_address);
            return false;
        }
        return true;
    }

    /**
     * Verifies to game client's code has not be altered
     * @param request user request to be validated
     * @returns true if game signature matches canonical game signature
     */
    verifyGameSignature(request: Request): boolean {
        if(!Validator.verifyGame(request)) {
            console.error("Invalid game signature from: %s", request.headers.eth_address);
            return false;
        }
        return true;
    }

    /**
     * Helper function checks if given session is still active. Ensures there is
     * at least minute remaining on their session and signature matches
     * the current session id.
     * @param request request from user being validated
     * @param session user's session data
     * @returns true if user's session is still active
     */
    checkValidSession(request: Request, session: Session): boolean {
        
        const now: number = Math.floor(Date.now()/1000);
        const timeRemaining: number = Math.max(0, (session.expiration - now));
        return (timeRemaining > 1 * 60 && request.headers.eth_signature === session.session_id);
    }

    /**
     * Retrieves any current or expired session data for given user.
     * @param address eth address of user
     * @returns session data if it exists
     */
    async getSessionData(address: string): Promise<Session | undefined> {
        const session: Session | undefined = await this.DB.getSession(address);
        if(session === undefined) {
            console.error("No session data found");
            return undefined;
        }
        return session;
    }

    /**
     * Retrieves user data from database.
     * @param address eth address of user
     * @returns user data document, including game data
     */
    async getUserData(address: string): Promise<User | undefined> {
        const user: User | undefined = await this.DB.getUserByAddress(address);
        if(user === undefined) {
            console.error("No such user");
            return undefined;
        }
        return user;
    }

    /**
     * Registers new users to database to allow login and game saving features.
     * @param address eth address of user
     * @returns true if user was registered successfully
     */
    async registerUser(address: string): Promise<boolean | undefined> {
        const success: boolean | undefined = await this.DB.registerNewUser(address);
        if(success === undefined) {
            console.error("Register attempt failed");
            return undefined;
        }
        return success;
    }

    /**
     * Creates or re-validates user session.
     * @param address eth address of user
     * @param stamp unique identified for session
     * @returns 
     */
    async loginUser(address: string, stamp: string): Promise<boolean | undefined> {
        const success: boolean | undefined = await this.DB.createSession(address, stamp);
        if(success === undefined) {
            console.error("Login attempt failed");
            return undefined;
        }
        return success;
    }

    /**
     * Private. Increases duration of current session up until a max expiration date.
     * @param session valid session to be extended
     * @returns true if session was refreshed successfully
     */
    async #refreshSession(session: Session): Promise<boolean | undefined> {
        const now = Math.floor(Date.now()/1000);
        const newExpiration = Math.min(
            now + (extractNumberEnvVar("EXPIRATION") * 60 * 60),
            session.max_expiration);
        
        const success: boolean | undefined = await this.DB.extendSession(session.address, newExpiration);
        if(success === undefined) {
            console.error("Unable to extend session");
            return undefined;
        }

        return success;
    }

    /**
     * Terminates user session, requiring new login request to continue to
     * save and load game data.
     * @param address eth address of user to be logged out
     * @returns true if user session was terminated successfully
     */
    async logoutUser(address: string): Promise<boolean | undefined> {
        const success: boolean | undefined = await this.DB.logoutSession(address);
        if(success === undefined) {
            console.error("Logout attempt failed");
            return undefined;
        }
        return success;
    }

    /**
     * Stores user's game data and allows for progress tracker to be updated.
     * @param session current user session
     * @param data game data to be saved
     * @param progress flag for progress update
     * @returns true if game data was saved successfully
     */
    async saveUserGame(session: Session, data: User["saveData"], progress: boolean): Promise<boolean | undefined> {
        const success: boolean | undefined = await this.DB.saveGameData(session.address, data, progress);
        if(success === undefined) {
            console.error("Save attempt failed");
            return undefined;
        }

        // if user data was saved, extend session as well
        await this.#refreshSession(session);
        return success;
    }

    /**
     * Retrieves user's game data.
     * @param session current user session
     * @returns user's current save data
     */
    async loadUserGame(session: Session): Promise<User["saveData"] | undefined> {
        const user: User | undefined = await this.DB.getUserByAddress(session.address);
        if(user === undefined) {
            console.error("No such user");
            return undefined;
        }

        // if data was loaded, extend user's session as well
        await this.#refreshSession(session);
        return user.saveData;
    }
}