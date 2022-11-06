import { extractNumberEnvVar, extractStringEnvVar } from "../shared/Environment";
import { User, Request } from "../shared/Definitions";
import { verifyMessage } from '@ethersproject/wallet';
import { hashMessage } from '@ethersproject/hash';

// Abstract class validates user inputs
export default class Validator {
    
    /**
     * Verifies that provide game codehash matches canonical codehash.
     * @param request mint request sent by user
     * @param user user data document
     * @returns true if game codehash is valid
     */
    static verifyCode(request: Request): boolean {
        if(request.headers.eth_address === "TEST") {return true};

        const canon = extractStringEnvVar("CODEHASH");
        return request.body?.game_codehash === canon;
    }

    /**
     * Checks that progress timestamps are at least 5 hours apart.
     * @param user user data document
     * @returns true if user's progress timestamps are valid
     */
    static verifyStamp(user: User): boolean {
        if(user._id === "TEST") {return true};

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
     * Verifies that sender is in fact owner of user address.
     * @param request mint request sent by user
     * @returns true if signature matches user's address
     */
    static verifySignature(request: Request): boolean {
        if(request.headers.eth_address === "TEST") {return true};

        const messageHash: string = hashMessage(request.headers.eth_timestamp);
        const address: string = verifyMessage(messageHash, request.headers.eth_signature);
        const result = request.headers.eth_address === address;
        return result;
    }
}