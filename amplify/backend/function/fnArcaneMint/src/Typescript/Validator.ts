import { verifyMessage } from '@ethersproject/wallet';
import { hashMessage } from '@ethersproject/hash';
import { User } from "./DatabaseInterface";
import { extractNumberEnvVar, extractStringEnvVar } from "./Environment";
import { Request } from "./MintRegister";

// Abstract class validates user inputs
export class Validator {
    
    /**
     * Verifies that provide game codehash matches canonical codehash.
     * @param request mint request sent by user
     * @param user user data document
     * @returns true if game codehash is valid
     */
    static verifyCode(request: Request): boolean {
        const canon = extractStringEnvVar("CODEHASH");
        return request.body.game_codehash === canon;
    }

    /**
     * Checks that progress timestamps are at least 5 hours apart.
     * @param user user data document
     * @returns true if user's progress timestamps are valid
     */
    static verifyStamp(user: User): boolean {
        const stamps: Array<number> = user.saveData.progress;
        const interval: number = extractNumberEnvVar("INTERVAL");
        const required_hours: number = interval * 60 * 60;
        let success: boolean = true;
        
        stamps.reduce((prior, post) => {
            if((post - prior) < required_hours) {
                success = false;
            }
            return post;
        });
        return success;
    }

    /**
     * Checks if progress data matches game's data.
     * @param request mint request sent by user
     * @param user user data document
     * @returns true if progress timestamps match
     */
    static verifyData(request: Request, user: User): boolean {
        const validData: string = user.saveData.progress.toString().replace(/,/g, "");
        return request.body.game_data === hashMessage(validData);
    }

    /**
     * Verifies that sender is in fact owner of user address.
     * @param request mint request sent by user
     * @returns true if signature matches user's address
     */
    static verifySignature(request: Request): boolean {
        const address: string = verifyMessage(request.body.game_data, request.body.eth_signature);
        return request.body.eth_address === address;
    }
}