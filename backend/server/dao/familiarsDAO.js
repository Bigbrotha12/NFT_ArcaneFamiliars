let familiars;
let templates;
export default class FamiliarsDAO {
    static async injectDB(client) {
        if(familiars && templates) {return} 
        try {
            familiars = await client.db(process.env.MONGODB_NS).collection("familiars");
            templates = await client.db(process.env.MONGODB_NS).collection("templates");
        } catch (err) {
            console.error(`MONGODB Connection Error: ${err}`);
        }
    }

    static async registerFamiliar(blueprint, userAddress) {
        try {
            let nextTokenId = await familiars.countDocuments({ "_id": { "$exists": true } });
            let result = await familiars.insertOne({
                ...template,
                _id: nextTokenId,
                ability_1: blueprint.ability_1,
                ability_2: blueprint.ability_2,
                ability_3: blueprint.ability_3,
                ability_4: blueprint.ability_4,
                meta: {
                    status: "Pending",
                    mint_timestamp: "0",
                    origin_owner: userAddress
                }
            }, { writeConcern: "majority" });
            return result;
        } catch (err) {
            console.error(err); 
            return err;
        }
    }

    static getFamiliarByID(tokenId) {
        familiars.findOne({_id: tokenId}, {meta: 0})
        .then(handleSuccess)
        .catch(handleError);
    }

    static getTemplatesByTier(tiers) {
        templates.findMany({rarity: {$in: tiers}})
        .then(handleSuccess)
        .catch(handleError);
    }

    static getMintStatus (tokenId) {
        familiars.findOne({_id: tokenId}, {status: 1})
        .then(handleSuccess)
        .catch(handleError);
    }

    static handleSuccess(result) {
        return result
    }

    static handleError(error) {
        console.error(error);
        return {}
    }

}
