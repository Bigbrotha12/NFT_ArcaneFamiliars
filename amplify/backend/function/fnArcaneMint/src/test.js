const ethers = require('ethers');
require("dotenv").config();

function generateNumber(userAddress, nonce) {
    return parseInt(ethers.utils.hashMessage(userAddress + nonce).slice(2, 8), 16);
}

let res = generateNumber("0xe48dC812F1cEe846A4E3d804A8bf7DC4ddF3255f", 0);
console.log(res);