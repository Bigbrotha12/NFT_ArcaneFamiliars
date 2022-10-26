const ethers = require('ethers');
require("dotenv").config();

function generateTimestamp() {
    return Math.floor(Date.now()/1000);
}

function generateValidTimestamps() {
    let now = Math.floor(Date.now()/1000);
    let firstStamp = now - (30 * 60 * 60);
    let secondStamp = firstStamp + (5 * 60 * 60);
    let thirdStamp = secondStamp + (5 * 60 * 60);
    let fourthStamp = thirdStamp + (5 * 60 * 60);
    console.log([firstStamp, secondStamp, thirdStamp, fourthStamp]);
    let join = "".concat(firstStamp, secondStamp, thirdStamp, fourthStamp);
    let data = ethers.utils.hashMessage(join);
    console.log("Data: %s", data);
}

(async ()=>{
    let wallet = new ethers.Wallet(process.env.MINTER_KEY);
    let address = await wallet.getAddress();
    let message = generateTimestamp().toString();
    let hash = ethers.utils.hashMessage(message);
    let signature = await wallet.signMessage(hash);
    console.info({eth_address: address, eth_timestamp: message, eth_signature: signature});
    generateValidTimestamps();

    let rc = ethers.utils.verifyMessage(hash, signature);
    console.log(rc);
})();
