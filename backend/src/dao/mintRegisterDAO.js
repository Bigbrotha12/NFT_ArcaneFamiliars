let familiars;
let templates;
export default class MintRegisterDAO {
    static async injectDB(client) {
        if(familiars) {
            return
        } 
        try {
            familiars = await client.db(process.env.MONGODB_NS).collection("familiars");
            templates = await client.db(process.env.MONGODB_NS).collection("templates");
        } catch (error) {
            console.error(`MONGODB Connection Error: ${error}`);
        }
    }

    static async getFamiliarByID(tokenId) {
        let cursor;
        try {
            cursor = await familiars.findOne({ "_id": Number(tokenId) });
        } catch (error) {
            console.error(`MONGODB Error: ${error}`);
            return {};
        }
        return cursor;
    }

    static async registerFamiliar(blueprint) {
        try {
            let template = await templates.findOne({ _id: blueprint.assetId});
            let nextTokenId = await familiars.count({});
            await familiars.insertOne({
                ...template,
                _id: nextTokenId,
                passive1: blueprint.passive1,
                passive2: blueprint.passive2,
                passive3: blueprint.passive3,
                passive4: blueprint.passive4
            }, { writeConcern: "majority" });
        } catch (error) {
            console.error(`MONDODB Error: ${error}`);
            return {result: error}
        }
        return {result: "success"}
    }
}