import { Handler } from "@netlify/functions";
import { Responses, Response } from "../shared/Definitions";
import Database from "../shared/Database";
import MintRegister from "./MintRegister";

// database caching
let cacheDB;
async function connectToDatabase() {
  if (cacheDB) {
    return cacheDB;
  }

  const DB = new Database();
  await DB.init();

  if(DB.isInitialized()) {
    cacheDB = DB;
  } else {
    throw new Error("Database connection failed");
  }
}

const handler: Handler = async (event, context) => {
  
  // maintain runtime environment for next call if possible
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // attempt connection to database
    await connectToDatabase();

    // if successful, run process
    return await MintRegister(event as any, cacheDB);

  } catch (error) {
    // otherwise return to sender
    let response: Response = {...Responses[500], body: ""};
    return response;
  }
};

export { handler };