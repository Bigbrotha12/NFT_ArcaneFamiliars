let users;
export default class UserDAO {
    static async injectDB(client) {
        if(users) {return} 
        try {
            users = await client.db(process.env.MONDODB_NS).collection("users");
        } catch (error) {
            console.error(`MONGODB Connection Error: ${error}`);
        }
    }

    static async registerUser(userAddress) {
        try {
            let currentUser = await users.countDocuments({_id: userAddress});
            if(currentUser === 0) {
                let result = await users.insert({
                    _id: userAddress,
                    total_minted: 0,
                    register_timestamp: Math.floor(Date.now()/1000),
                    last_active_timestamp: Math.floor(Date.now()/1000)
                });
                return {result: result}
            }
        } catch (err) {
            console.error(`MONDODB Error: ${err}`);
            return {result: err}
        }
        return {result: "User already registered"}
    }

    static getUser(userAddress) {
        users.findOne({address: userAddress})
        .then(handleSuccess())
        .catch(handleError());
    }

    static updateUser(userAddress, error) {
        if(!error) {
            users.updateOne({_id: userAddress}, {
                $inc: {total_minted: 1},
                last_active_timestamp: Math.floor(Date.now()/1000)
            }) 
            .then(handleSuccess())
            .catch(handleError()); 
        } else {
            users.updateOne({_id: userAddress}, {
                $set: {blacklist: true},
                reason: error.message
            }) 
            .then(handleSuccess())
            .catch(handleError()); 
        }
           
    }

    static saveGame(userAddress, data) {
        users.upsert({_id: userAddress}, {saveState: data}, {writeConcern: "majority"})
        .then(handleSuccess())
        .catch(handleError());
    }

    static loadGame(userAddress) {
        users.findOne({_id: userAddress}, {saveState: 1})
        .then(handleSuccess())
        .catch(handleError()) 
    }

    static getUserTotalMints(userAddress) {
        users.findOne({_id: userAddress}, {total_minted: 1, _id: 0})
        .then(handleSuccess())
        .catch(handleError());
    }

    static handleSuccess(result) {
        return result
    }

    static handleError(error) {
        console.error(error);
        return {}
    }
}