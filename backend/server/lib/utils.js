import {Config} from "../arcane.config.js";
import web3Utils from "web3-utils";
import web3Accounts from "web3-eth-accounts";

export function validate(request, user) {
    if(!verifyCode(request)) {return {success: false, error: new Error("Wrong code-hash")}}
    console.log("\u2705 Codehash check passed!");
    if(!verifyStamp(user.saveData.progress)) {return {success: false, error: new Error("Invalid stamps")}}
    console.log("\u2705 Timestamp check passed!");
    if(!verifyData(request, user)) {return {success: false, error: new Error("Invalid game data")}}
    console.log("\u2705 Data check passed!");
    if(!verifySignature(request)) {return {success: false, error: new Error("Invalid signature")}}
    console.log("\u2705 Signature check passed!");
    return {success: true, error: null}
}

function verifyCode(request) {
    return Config.game_codehash === request.game_code;
}

function verifyStamp(user) {
    user.meta.progress.reduce((preStamp, postStamp) => {
        if((postStamp - preStamp) < (5 * 60 * 60)) {return false}
    });
    return true;
}

function verifyData(request, user) {
    if(!user) {return false}
    let valid = "";
    user.saveData.progress.map(flag => {
        valid.concat(flag);
    })
    return request.game_data === valid;
}

function verifySignature(request) {
    let account = new web3Accounts("");
    let address = account.recover(request.game_data, request.eth_signature);
    return address === request.eth_address;
}

export function generateRandom(userAddress, nonce) {
    return parseInt("".slice.bind(sha3(userAddress, nonce), 2, 10), 16)
}

function sha3(arg1, arg2) {
    return web3Utils.sha3(arg1, arg2);
}

export function calculateTiers(nftsOwned) {
    let tiers = [Tier.Common];
    if(nftsOwned > Config.tiers[0]) {tiers.push(Tier.Uncommon)}
    if(nftsOwned > Config.tiers[1]) {tiers.push(Tier.Rare)}
    if(nftsOwned > Config.tiers[2]) {tiers.push(Tier.Secret)}
    if(nftsOwned > Config.tiers[3]) {tiers.push(Tier.Legendary)}
    return tiers;
}

const Tier = {
    Common: "Common",
    Uncommon: "Uncommon",
    Rare: "Rare",
    Secret: "Secret",
    Legendary: "Legendary"
}


