import { Handler } from "@netlify/functions";
import { Responses, Response } from "../shared/Definitions";
import Database from "../shared/Database";
import MetadataManager from "./MetadataManager";

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
  // parse path parameter to number
  const query: number = getPathParameter(event.path);
  if (query === null) return {...Responses[400], body: JSON.stringify({ message: "Invalid token id" })};
    
  try {
    // attempt connection to database
    
    await connectToDatabase();

    // if successful, run process
    const response: Response = await MetadataManager(query, cacheDB);
    return response;

  } catch (error) {
    // otherwise return to sender
    const response: Response = {...Responses[500], body: ""}
    return response;
  }

};

const getPathParameter = (path: string): number | null => {

    // returns -1 if not found
    const index: number = path.lastIndexOf("/");
    if (index === -1 || index + 1 >= path.length) return null;

    // returns NaN if parse unsuccessful
    const parameter: number = Number(path.substring(index+1));
    if(!(parameter === parameter)) return null;

    return parameter;
}

export { handler };
