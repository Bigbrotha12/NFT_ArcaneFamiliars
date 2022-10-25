"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const wallet_1 = require("@ethersproject/wallet");
const hash_1 = require("@ethersproject/hash");
const Environment_1 = require("./Environment");
// Abstract class validates user inputs
class Validator {
    /**
     * Verifies that provide game codehash matches canonical codehash.
     * @param request mint request sent by user
     * @param user user data document
     * @returns true if game codehash is valid
     */
    static verifyCode(request) {
        const canon = (0, Environment_1.extractStringEnvVar)("CODEHASH");
        return request.body.game_codehash === canon;
    }
    /**
     * Checks that progress timestamps are at least 5 hours apart.
     * @param user user data document
     * @returns true if user's progress timestamps are valid
     */
    static verifyStamp(user) {
        const stamps = user.saveData.progress;
        const interval = (0, Environment_1.extractNumberEnvVar)("INTERVAL");
        const required_hours = interval * 60 * 60;
        let success = true;
        stamps.reduce((prior, post) => {
            if ((post - prior) < required_hours) {
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
    static verifyData(request, user) {
        const validData = user.saveData.progress.toString().replace(/,/g, "");
        return request.body.game_data === (0, hash_1.hashMessage)(validData);
    }
    /**
     * Verifies that sender is in fact owner of user address.
     * @param request mint request sent by user
     * @returns true if signature matches user's address
     */
    static verifySignature(request) {
        const address = (0, wallet_1.verifyMessage)(request.body.game_data, request.body.eth_signature);
        return request.body.eth_address === address;
    }
}
exports.Validator = Validator;
