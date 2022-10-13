import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import MinterController from "./mint-controller.js";
import { FamiliarsDAO } from "./familiarsDAO.js";
import IMXDAO from "./imxDAO.js";
dotenv.config();

// Connect MondoDB
MongoClient.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, w: "majority", wtimeoutMS: process.env.MONGODB_TIMEOUT}
).catch( error => {
    console.error(error.stack);
    process.exit(1);
}).then( async client => {
    await MinterController.init(
        process.env.MINTER_KEY,
        process.env.COLLECTION_ADDRESS,
        process.env.BENEFICIARY,
        process.env.ROYALTY_FEE
    );
    await FamiliarsDAO.injectDB(client);
    await runTask();
});

// Mint limit: 50,000/4-weeks which equals about 12 NFTs every 10 minutes.
// Task to be scheduled to run every 10 minutes.
// If limit exceeded, error 429 is returned

async function runTask() {
    console.log("Starting minting task...");
    let pendingMints = await FamiliarsDAO.getPendingMint();
    if(!pendingMints) {process.exit(0)};
    let tokenArray = MinterController.formatTokenArray(pendingMints);
    let bulkMints = MinterController.prepareBulkMint(tokenArray);
    let payload = MinterController.formatPayload(bulkMints);
    let request = await MinterController.signPayload(payload);

    let mintResult = await IMXDAO.mintToken(request, {
         retries: process.env.IMX_API_RETRIES, 
         backOff: process.env.IMX_API_BACKOFF});
    if(!mintResult) {process.exit(1)};
    
    let update = await FamiliarsDAO.updatePendingMints(pendingMints);
    if(!update) {process.exit(1)};
    console.log("Records modified: %d", update.result.nModified)
    console.log("Minting task completed!");
}