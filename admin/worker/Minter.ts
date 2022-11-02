import { MinterController } from "./MintController";

// Mint limit: 50,000/4-weeks which equals about 12 NFTs every 10 minutes.
// Task to be scheduled to run every 10 minutes.
// If limit exceeded, error 429 is returned

(async () => {
    
    console.log("Starting batch minting job");
    let controller = new MinterController();

    console.log("Getting pending mints...");
    let batch = await controller.getMintBatch();
    console.log("Found %d records", batch.length);

    console.log("Signing request and sending to IMX...")
    let IMXResponse = await controller.signAndSend(batch);
    console.log("\u2714 Success!"); 
    console.info(IMXResponse);
    
    console.log("Updating record(s)");
    await controller.updatePendings(batch);
    
    console.log("Task completed. Exiting...");
    process.exit(0);
})();

