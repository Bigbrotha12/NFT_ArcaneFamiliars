const ethers = require("ethers");
require("dotenv").config();

module.exports = class FamiliarFactory {

    static async registerFamiliar(template, user, db, session) {
        let transactionOptions = { 
            readPreference: "primary"
        };
         
        try {
            await session.withTransaction(async () => {
                let tokenId = await db.collection("counters").findAndModify(
                    {
                        query: {name: "token_ids"}, 
                        update: {$inc: {value: 1}}
                    }, { session }).toArray();
                await db.collection("familiars").insertOne({
                        ...template,
                        _id: tokenId[0].value,
                        meta: {
                            status: "Pending",
                            mint_timestamp: "0",
                            origin_owner: user._id
                        }
                    }, { session });
                await db.collection("users").updateOne({_id: user._id}, {
                    $inc: {total_minted: 1},
                    $set: {last_active_timestamp: `${Math.floor(Date.now()/1000)}`},
                    $set: {"saveData.progress": ["0", "0", "0", "0"]}
                }, { session });
                await db.collection("templates").updateOne({name: template.name}, { 
                    $inc: {"meta.minted": 1}
                }, { session }); 
            }, transactionOptions);
        } catch (error) {
            console.error(error);
        } finally {
            await session.endSession();
        }
    }

    static async generateNextFamiliar(user, db) {
        let tiers = this.calculateTiers(user.total_minted);
        let availableTemplates = await this.getTemplatesByTier(tiers, db);
        console.log(availableTemplates);
        let randomNum = this.generateNumber(user._id, user.total_minted);
        let chosenOne = randomNum % availableTemplates.length;
        return availableTemplates[chosenOne];
    }

    static async getTemplatesByTier(tiers, db) {
        return await db.collection("templates").find({
            rarity: {$in: tiers},
            generation: Number(process.env.CURRENT_GENERATION),
            $expr: {$lt: ["$meta.minted", "$meta.limit"]}
        }).toArray();
    }

    static calculateTiers(nftsMinted) {
        let tiers = ["common"];
        if(nftsMinted > process.env.TIER_1) {tiers.push("uncommon")}
        if(nftsMinted > process.env.TIER_2) {tiers.push("rare")}
        if(nftsMinted > process.env.TIER_3) {tiers.push("secret")}
        if(nftsMinted > process.env.TIER_4) {tiers.push("legendary")}
        return tiers;
    }

    static generateNumber(userAddress, nonce) {
        return parseInt(ethers.utils.hashMessage(userAddress + nonce).slice(2, 8), 16);
    }   
}