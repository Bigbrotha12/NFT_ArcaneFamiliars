const { Router } = require("./build/SessionManager");
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    // maintain runtime environment for next call if possible
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
      // attempt connection to database
      await connectToDatabase();

      // if successful, run process
      return await Router(event, cacheDB);

    } catch (error) {
      // otherwise return to sender
      let response = { statusCode: 500 }
      return response;
    }
};
