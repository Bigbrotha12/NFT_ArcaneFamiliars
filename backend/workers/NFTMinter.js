import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import MinterController from "./mint-controller";
import { FamiliarsDAO } from "./familiarsDAO";
import IMXDAO from "./imxDAO";
dotenv.config();

// Connect MondoDB
MongoClient.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        w: "majority",
        wtimeoutMS: process.env.MONGODB_TIMEOUT
    }
).catch( error => {
    console.error(error.stack);
    process.exit(1);
}).then( async client => {
    MinterController.init(
        process.env.MINTER_KEY,
        process.env.COLLECTION_ADDRESS,
        process.env.BENEFICIARY,
        process.env.ROYALTY_FEE
    );
    await FamiliarsDAO.injectDB(client);
    await runTask();
});

// Mint limit: 50,000/4-weeks
// If limit exceeded, error 429 is returned

async function runTask() {
    console.log("Starting minting task...");
    let pendingMints = await FamiliarsDAO.getPendingMint();
    let tokenArray = MinterController.formatTokenArray(pendingMints);
    let bulkMints = MinterController.prepareBulkMint(tokenArray);
    let payload = MinterController.formatPayload(bulkMints);
    let request = MinterController.signPayload(payload);
    
    let mintResult = await IMXDAO.mintToken([request], {
        retries: process.env.IMX_API_RETRIES, 
        backOff: process.env.IMX_API_BACKOFF});
    if(mintResult instanceof Error) {console.error(mintResult); process.exit(1)}
    console.log("Mint Successful");
    console.log("Remaining Mint Balance: %d", mintResult.header.Mint_Remaining)
    
    let update = await FamiliarsDAO.updatePendingMint(pendingMints);
    console.log("Documents Modified: %d", update.modifiedCount);
    console.log("Minting task completed!");
}


