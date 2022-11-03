const { FamiliarManager } = require("./build/FamiliarManager");
const { Database } = require("./build/DatabaseImplementation");

// database caching to improve performance
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

exports.handler = async (event, context) => {
  // maintain runtime environment for next call if possible
  context.callbackWaitsForEmptyEventLoop = false;
    
  try {
    // attempt connection to database
    await connectToDatabase();

    // if successful, run process
    const tokenId = Number(event.pathParameters.id);
    const response = await FamiliarManager(tokenId, cacheDB);
    return response;

  } catch (error) {
    // otherwise return to sender
    let response = { statusCode: 500, status: "Internal Server Error", error: error }
    return response;
  }
};