const ethers = require("ethers"); 

module.exports = class Validator {
    // verifies the timestamp was signed by the address in the request
    static validSignature(request) {
        let address = ethers.utils.verifyMessage(Number(request.body.timestamp), request.body.eth_signature);
        return address === request.body.eth_address;
    }

    // validates that request timestamp is prior to expiration date
    static validTimestamp(request) {
        let now = Math.floor(Date.now()/1000);
        let intervalCheck = (now - request.body.timestamp) < (1 * 60);
        let sanityCheck = request.body.timestamp < now;
        return (sanityCheck && intervalCheck);
    }

    // validates whether user has unexpired session with server
    static async validSession(conn, request) {
        let [client, db] = conn;
        let now = Math.floor(Date.now()/1000);
        let result = await db.collection("session").find(
            {address: request.body.eth_address}).toArray();
        return {
            isActive: now < result[0].expiration, 
            expiration: result[0].expiration,
            max_expiration: result[0].max_expiration
        };
    }
}