import { Request } from "./Definitions";
import { extractStringEnvVar } from "./Environment";
import { verifyMessage } from '@ethersproject/wallet';
import { hashMessage } from '@ethersproject/hash';

// Abstract class validates user inputs
export class Validator {

    /**
     * Part of Login workflow. Verifies that sender is in fact owner of user address.
     * @param request session authentication request from user
     * @returns true if signature matches user's address
     */
    static verifySignature(request: Request): boolean {
        const message: string = hashMessage(request.headers.eth_timestamp);
        const address: string = verifyMessage(message, request.headers.eth_signature);
        return request.headers.eth_address === address;
    }

    /**
     * Part of Login workflow. Verifies timestamps are valid.
     * @param request session authentication request from user
     * @returns true if timestamps are valid
     */
    static verifyTimestamp(request: Request): boolean {
        const now: number = Math.floor(Date.now()/1000);
        const stamp: number = Number(request.headers.eth_timestamp);
        return (now - stamp) < (1 * 60 * 60);
    }

    /**
     * Part of save/load workflow. Verifies game codehash matches
     * canonical codehash.
     * @param request save/load data request
     */
    static verifyGame(request: Request): boolean {
        const canon = extractStringEnvVar("CODEHASH");
        return request.body?.game_codehash === canon;
    }
}