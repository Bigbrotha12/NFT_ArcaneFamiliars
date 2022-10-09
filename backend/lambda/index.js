const { MongoClient } = require("mongodb");
const web3Utils = require("web3-utils");
const web3Accounts = require("web3-eth-accounts");
require("dotenv").config();

// Connect MondoDB
let familiars, templates, users;
let client = new MongoClient(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        wtimeoutMS: process.env.MONGODB_TIMEOUT
    })
let clientPromise = client.connect();

exports.handler = async (event) => {

// Connect collections
client = await clientPromise;
familiars = await client.db(process.env.MONGODB_NS).collection("familiars");
templates = await client.db(process.env.MONGODB_NS).collection("templates");
users = await client.db(process.env.MONGODB_NS).collection("users");

const response = {
    statusCode: 200,
    body: familiars
}
return response;

function handle(req) {
    return FamiliarsDAO.getFamiliarByID(req.id);
}

class FamiliarsDAO {
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
                    mint_timestamp: 0,
                    origin_owner: userAddress
                }
            }, { writeConcern: "majority" });
            return result;
        } catch (error) {
            this.handleError(error);
        }
    }

    static getFamiliarByID(tokenId) {
        familiars.findOne({_id: tokenId}, {meta: 0})
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    static getTemplatesByTier(tiers) {
        templates.findMany({rarity: {$in: tiers}})
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    static getMintStatus(tokenId) {
        familiars.findOne({_id: tokenId}, {"meta.status": 1})
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    static handleSuccess(result) {
        return result
    }

    static handleError(error) {
        console.error(error);
        return {}
    }

}

class UsersDAO {

    static async registerUser(userAddress) {
        try {
            let currentUser = await users.countDocuments({_id: userAddress});
            if(!currentUser) {
                let result = await users.insert({
                    _id: userAddress,
                    total_minted: 0,
                    register_timestamp: Math.floor(Date.now()/1000),
                    last_active_timestamp: Math.floor(Date.now()/1000)
                });
                return {result: result}
            }
        } catch (error) {
            this.handleError(error);
        }
        return {result: "User already registered"}
    }

    static getUser(userAddress) {
        users.findOne({address: userAddress})
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    static updateUser(userAddress, error) {
        if(!error) {
            users.updateOne({_id: userAddress}, {
                $inc: {total_minted: 1},
                last_active_timestamp: Math.floor(Date.now()/1000)
            }) 
            .then(this.handleSuccess)
            .catch(this.handleError); 
        } else {
            users.updateOne({_id: userAddress}, {
                $set: {blacklist: true},
                reason: error.message
            }) 
            .then(this.handleSuccess)
            .catch(this.handleError); 
        }
           
    }

    static saveGame(userAddress, data) {
        users.upsert({_id: userAddress}, {saveState: data}, {writeConcern: "majority"})
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    static loadGame(userAddress) {
        users.findOne({_id: userAddress}, {saveState: 1})
        .then(this.handleSuccess)
        .catch(this.handleError) 
    }

    static getUserTotalMints(userAddress) {
        users.findOne({_id: userAddress}, {total_minted: 1, _id: 0})
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    static handleSuccess(result) {
        return result
    }

    static handleError(error) {
        console.error(error);
        return {}
    }
}

class Validator {
    static validate(request, user) {
        if(!verifyCode(request)) {return {success: false, error: new Error("Wrong code-hash")}}
        if(!verifyStamp(user.saveData.progress)) {return {success: false, error: new Error("Invalid stamps")}}
        if(!verifyData(request, user)) {return {success: false, error: new Error("Invalid game data")}}
        if(!verifySignature(request)) {return {success: false, error: new Error("Invalid signature")}}
        return {success: true, error: null}
    }

    verifyCode(request) {
        return process.env.UNITY_CODEHASH === request.game_code;
    }

    verifyStamp(user) {
        user.meta.progress.reduce((preStamp, postStamp) => {
            if((postStamp - preStamp) < (5 * 60 * 60)) {return false}
        });
        return true;
    }

    verifyData(request, user) {
        let valid = "";
        user.saveData.progress.map(flag => {
            valid.concat(flag);
        })
        return request.game_data === valid;
    }

    verifySignature(request) {
        let account = new web3Accounts("");
        let address = account.recover(request.game_data, request.eth_signature);
        return address === request.eth_address;
    }
}

function generateRandom(userAddress, nonce) {
    return parseInt("".slice.bind(web3Utils.sha3(userAddress + nonce), 2, 10), 16)
}

function calculateTiers(nftsOwned) {
    let tiers = [Tier.Common];
    if(nftsOwned > process.env.TIER_1) {tiers.push(Tier.Uncommon)}
    if(nftsOwned > process.env.TIER_2) {tiers.push(Tier.Rare)}
    if(nftsOwned > process.env.TIER_3) {tiers.push(Tier.Secret)}
    if(nftsOwned > process.env.TIER_4) {tiers.push(Tier.Legendary)}
    return tiers;
}

const Tier = {
    Common: "Common",
    Uncommon: "Uncommon",
    Rare: "Rare",
    Secret: "Secret",
    Legendary: "Legendary"
}
}

