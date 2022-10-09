
module.exports = class SessionManager {
    static async registerUser(conn, body) {
        let [client, db] = conn;
        await db.collection("users").insertOne({
            _id: body.eth_address,
            total_minted: 0,
            register_timestamp: Math.floor(Date.now()/1000),
            last_active_timestamp: Math.floor(Date.now()/1000),
            saveData: {
                items: [],
                location: "0000",
                progress: ["0","0","0","0"],
                level: "1"
            },  
            blacklist: false,
            reason: "none"
        });
        return await this.loginUser(conn, body);
    }

    static async loginUser(conn, body) {
        let [client, db] = conn;
        validateAttempt(body);
        let result = await db.collection("session").insertOne({
            address: body.eth_address,
            login_timestamp: Math.floor(Date.now()/1000),
            session_id: "",
        });
        return {statusCode: 200, result: result}
    }

    static async logoutUser(conn, body) {
        let [client, db] = conn;
        let result = await db.collection("session").deleteOne({address: body.eth_address});
        return {statusCode: 200, result: result}
    }

    static async loadGame(conn, body) {
        let [client, db] = conn;
        let result = await db.collection("users").find({_id: body.eth_address}, 
            {saveData: 1, _id: 0}).toArray();
        return {statusCode: 200, data: result[0]};
    }

    static async saveGame(conn, body) {
        let [client, db] = conn;
        let result = await db.collection("users").updateOne({_id: body.eth_address},
            {$set: {
                saveData: {
                    items: body.saveData.items,
                    location: body.saveData.location,
                    level: body.saveData.level
                }
            }});
        return {statusCode: 200, result: result}
    }

    static async updateProgress(conn, body) {
        let [client, db] = conn;
        let result = await db.collection("users").updateOne({
            _id: body.eth_address,
            "saveData.progress": "0"
            },
            {$set: {
                saveData: {
                    "progress.$": `${Math.floor(Date.now()/1000)}` 
                }
            }});
        return {statusCode: 200, result: result}
    }
}