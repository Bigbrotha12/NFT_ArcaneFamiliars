module.exports = class SessionManager {

    static async checkSession(conn, event) {
        let [client, db] = conn;
        let result = await db.collection("session").find(
            {address: event.body.eth_address}, {login_timestamp: 0}).toArray();
        return result[0]
    }

    static async isRegistered(conn, event) {
        let [client, db] = conn;
        let result = await db.collection("users").find(
            {_id: event.body.eth_address}).toArray();
        return result.length > 0;
    }

    static async registerUser(conn, event) {
        if(!this.isRegistered(conn, event)) {
            let [client, db] = conn;
            let result = await db.collection("users").insertOne({
                _id: event.body.eth_address,
                total_minted: 0,
                register_timestamp: `${Math.floor(Date.now()/1000)}`,
                last_active_timestamp: `${Math.floor(Date.now()/1000)}`,
                saveData: {
                    items: [],
                    location: "0000",
                    progress: ["0","0","0","0"],
                    level: "1"
                },  
                blacklist: false,
                reason: "none"
            });
        }
        return await this.loginUser(conn, event);
    }

    static async loginUser(conn, event) {
        let [client, db] = conn;
        let now = Math.floor(Date.now()/1000);
        let result = await db.collection("session").updateOne(
            {address: event.body.eth_address}, 
            {$set: {
            address: event.body.eth_address,
            session_id: event.body.eth_signature,
            login_timestamp: `${now}`,
            expiration: `${now + (5 * 60 * 60)}`,         // set initial expiration for 5 hours
            max_expiration: `${now + (24 * 60 * 60)}`}    // request user to re-login after 24 hours  
        }, {upsert: true});
        return {statusCode: 200, result: {...result, login_timestamp: `${now}`}}
    }

    // if user saves game or update game progress, session is extended up until max expiration
    static async refreshSession (conn, event, session) {
        let [client, db] = conn;
        let now = Math.floor(Date.now()/1000);
        if(!session.isActive) 
        {return {statusCode: 401, message: "request authentication"}}
        let result = await db.collection("session").updateOne(
            {address: event.body.eth_address},
            {$set: {
                expiration: `${Math.min(now + 5 * 60 * 60, session.max_expiration)}` //extend session for 5 hours
        }});
    }

    static async logoutUser(conn, event) {
        let [client, db] = conn;
        let result = await db.collection("session").deleteOne({address: event.body.eth_address});
        return {statusCode: 200, result: result}
    }

    static async loadGame(conn, event, session) {
        let [client, db] = conn;
        if(!session.isActive) 
        {return {statusCode: 401, message: "request authentication"}}
        let result = await db.collection("users").find({_id: event.body.eth_address}, 
            {saveData: 1, _id: 0}).toArray();
        return {statusCode: 200, data: result[0]};
    }

    static async saveGame(conn, event, session) {
        if(!session.isActive && !session.isGameValid) 
        {return {statusCode: 401, message: "request authentication"}}

        let [client, db] = conn;
        let result;
        if(event.body.saveData.progress) {
            result = await db.collection("users").updateOne(
                {_id: event.body.eth_address,
                "saveData.progress": "0"},
                {$set: {
                    "saveData.items": event.body.saveData.items,
                    "saveData.location": event.body.saveData.location,
                    "saveData.level": event.body.saveData.level,
                    "saveData.progress.$": `${Math.floor(Date.now()/1000)}`
                }});
        } else {
            result = await db.collection("users").updateOne(
                {_id: event.body.eth_address},
                {$set: {
                    "saveData.items": event.body.saveData.items,
                    "saveData.location": event.body.saveData.location,
                    "saveData.level": event.body.saveData.level
                }});
        }
        await this.refreshSession(conn, event, session);
        return {statusCode: 200, result: result}
    }
}