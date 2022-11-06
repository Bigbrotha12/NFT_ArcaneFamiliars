import { Handler } from "@netlify/functions";
import { Responses, Response } from "../shared/Definitions";
import Database from "../shared/Database";
import Router from "./SessionManager";

// database caching
let cacheDB: Database;
async function connectToDatabase(): Promise<void | Database> {
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
    let response: Response = await Router(event as any, cacheDB);
    return response;
    
  } catch (error) {
    // otherwise return to sender
    let response: Response = {...Responses[500], body: ""};
    return response;
  }

};

export { handler };
