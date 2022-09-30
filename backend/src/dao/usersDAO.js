let users;
export default class UserDAO {
    static async injectDB(client) {
        if(users) {
            return
        } 
        try {
            users = await client.db(process.env.MONDODB_NS).collection("users");
        } catch (error) {
            console.error(`MONGODB Connection Error: ${error}`);
        }
    }

    static async registerUser(addr) {
        try {
            let currentUser = await users.count({address: addr});
            if(currentUser === 0) {
                await users.insert({
                    address: addr,
                    total_minted: 0,
                    register_date: new Date(Date.now()),
                    last_active: new Date(Date.now())
                });
                return {result: "success"}
            }
        } catch (error) {
            console.error(`MONDODB Error: ${error}`);
            return {result: error}
        }
        return {result: "already registered"}
    }

    static async updateUser(addr) {
        try {
            await users.updateOne({ address: addr }, {
                $inc: { total_minted: 1 },
                last_active: new Date(Date.now())
            }); 
        } catch (error) {
            console.error(`MONGODB Error: ${error}`);
            return {result: error}
        }
        return {result: "success"}
    }
}