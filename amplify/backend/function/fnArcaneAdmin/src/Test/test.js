const ethers = require("ethers");
require("dotenv").config();

let wallet = new ethers.Wallet(process.env.USER_KEY);
let now = Math.floor(Date.now()/1000);
wallet.signMessage(now).then(sign => {
    console.log(sign);
    console.log(now);
    console.log(ethers.utils.verifyMessage(now, sign));
})