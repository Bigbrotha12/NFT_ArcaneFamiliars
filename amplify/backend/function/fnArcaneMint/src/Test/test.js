const ethers = require('ethers');
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let client, db;
async function connectDB() {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    db = await client.db(process.env.MONGODB_NS);
}

let userAddress = "0xe48dC812F1cEe846A4E3d804A8bf7DC4ddF3255f";

function generateTimestamps() {
    // Generate four timestamps (UTC, second), 5 hours apart
    let timestamps = new Array();
    let referenceTime = Math.floor(Date.now()/1000) - (30 * 60 * 60); // 30 hours in the past
    for(let i=0; i<4; i++) {
        timestamps.push(referenceTime + (6 * 60 * 60) * i) // 6 hours apart
    }
    return timestamps;
}

async function addTimestampToDB(timestamps) {
    if(db) {
        let res = await db.collection("users").updateOne({
            _id: userAddress
        },{
            $set: {
                "saveData.progress.0": timestamps[0],
                "saveData.progress.1": timestamps[1],
                "saveData.progress.2": timestamps[2],
                "saveData.progress.3": timestamps[3]
            }
        });
        return res;
    }
    return {};
}

function generateValidGameHash(timestamp) {
    console.log(timestamp.toString().replaceAll(',',''));
    return ethers.utils.hashMessage(timestamp.toString().replaceAll(',',''));
}

function signMessage(message, privKey) {
    const wallet = new ethers.Wallet(privKey);
    return wallet.signMessage(message);
}

//let res = generateNumber("0xe48dC812F1cEe846A4E3d804A8bf7DC4ddF3255f", 0);
//console.log(res);
async function main() {
    let validationData = {};
    await connectDB();
    let stamps = generateTimestamps();
    let res = await addTimestampToDB(stamps);
    let gameData = generateValidGameHash(stamps);
    let signature = await signMessage(gameData, process.env.MINTER_KEY);
    console.log(res);

    validationData = {
        eth_address: userAddress,
        eth_signature: signature,
        game_data: gameData,
        game_codehash: ""
    }
    return validationData;
};

main().then((res) => {console.log(res); process.exit(0);});
    

