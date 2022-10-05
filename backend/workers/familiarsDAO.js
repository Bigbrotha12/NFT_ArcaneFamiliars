import * as dotenv from "dotenv";
dotenv.config();

let familiars;
let templates;
export class FamiliarsDAO {
    static async injectDB(client) {
        if(familiars && templates) {return} 
        try {
            familiars = await client.db(process.env.MONGODB_NS).collection("familiars");
            templates = await client.db(process.env.MONGODB_NS).collection("templates");
        } catch (err) {
            console.error(`MONGODB Connection Error: ${err}`);
        }
    }

    static getFamiliarByID(tokenId) {
        familiars.findOne({_id: tokenId})
        .then(result => {return result})
        .catch(err => {console.error(err); return {}});
    }

    static getMintStatus(tokenId) {
        familiars.findOne({_id: tokenId}, {"meta.status": 1})
        .then(result => {return result})
        .catch(err => {console.error(err); return {}});
    }

    static getPendingMint() {
        familiars.find({"meta.status": "Pending"}, {
            ability_1: 1, ability_2: 1, ability_3: 1, ability_4: 1, meta: 1
        }).limit(process.env.BATCH_SIZE)
        .then(result => {return result})
        .catch(err => {console.error(err); return [{}]});
    }

    static updatePendingMints(tokens) {
        let operations = tokens.map(token => {
            return {
                updateOne: {
                    filter: { _id: token._id },
                    update: { $set: { "meta.status": "Minted" }, $set: { "meta.mint_timestamp": Math.floor(Date().now/1000) } }
                }
            }
        });
        familiars.bulkWrite(operations, { ordered: false, writeConcern: "majority" })
        .then(result => {return result})
        .catch(err => {console.error(err); return {modifiedCount: 0}});
    }
}
