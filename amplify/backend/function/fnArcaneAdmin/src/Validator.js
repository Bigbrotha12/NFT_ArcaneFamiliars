const ethers = require("ethers"); 

module.exports = class Validator {
    // verifies the timestamp was signed by the address in the request
    static validSignature(request) {
        let address = ethers.utils.verifyMessage(Number(request.headers.eth_timestamp), request.headers.eth_signature);
        return address === request.headers.eth_address;
    }

    // validates that request timestamp is prior to expiration date and within 1 hour
    static validTimestamp(request) {
        let now = Math.floor(Date.now()/1000);
        let intervalCheck = (now - request.headers.eth_timestamp) < (1 * 60);
        let sanityCheck = request.headers.eth_timestamp < now;
        return (sanityCheck && intervalCheck);
    }

    // validates whether user has unexpired session with server
    static async validSession(conn, request) {
        let [client, db] = conn;
        let now = Math.floor(Date.now()/1000);
        let result = await db.collection("session").find(
            {address: request.headers.eth_address}).toArray();
        let validGame = (request.headers.eth_timestamp === result[0].login_timestamp);
        return {
            isActive: now < result[0].expiration,
            isGameValid: validGame,
            timestamp: result[0].login_timestamp,
            expiration: result[0].expiration,
            max_expiration: result[0].max_expiration
        };
    }

    static async validGameRequest(conn, request) {

    }
}