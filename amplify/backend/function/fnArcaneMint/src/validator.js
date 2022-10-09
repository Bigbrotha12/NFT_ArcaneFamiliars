const ethers = require("ethers");

module.exports = class Validator {
    static validate(request, user) {
        if(!this.verifyCode(request)) {return {success: false, error: new Error("Wrong code-hash")}}
        if(!this.verifyStamp(user.saveData.progress)) {return {success: false, error: new Error("Invalid stamps")}}
        if(!this.verifyData(request, user.saveData.progress)) {return {success: false, error: new Error("Invalid game data")}}
        if(!this.verifySignature(request)) {return {success: false, error: new Error("Invalid signature")}}
        return {success: true, error: null}
    }

    static verifyCode(request) {
        return "" === request.game_codehash;
    }

    static verifyStamp(dataStamps) {
        dataStamps.reduce((preStamp, postStamp) => {
            if((postStamp - preStamp) < (5 * 60 * 60)) {return false}
        });
        return true;
    }

    static verifyData(request, dataStamps) {
        let valid = "";
        dataStamps.map(flag => {
            valid += flag;
        })
        return request.game_data === ethers.utils.hashMessage(valid);
    }

    static verifySignature(request) {
        let address = ethers.utils.verifyMessage(request.game_data, request.eth_signature);
        return address === request.eth_address;
    }
}