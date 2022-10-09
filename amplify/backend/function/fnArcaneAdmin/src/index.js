const MongoClient = require("mongodb").MongoClient;
const SessionManager = require("./SessionManager.js");
require('dotenv').config();

let cacheDB;
async function connectToDatabase() {
  if (cacheDB) {
    return cacheDB;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true, wtimeoutMS: process.env.MONGODB_TIMEOUT });
  const db = await client.db("ArcaneFamiliars");

  cacheDB = [client, db];
  return [client, db];
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let connection = await connectToDatabase();

    // Recognize which action is being request
    // "httpMethod": [
    //    "GET" - Load game state
    //    "PATCH" - Save game state
    //    "POST" - Register new user address
    //    "PUT" - Login user session
    //    "DELETE" - Logout user session
    //  ]
    switch(event.httpMethod) {
        case "GET":
            return await SessionManager.loadGame(connection, event.body);
        case "PATCH":
            return await SessionManager.saveGame(connection, event.body);
        case "POST":
            return await SessionManager.registerUser(connection, event.body);
        case "PUT":
            return await SessionManager.loginUser(connection, event.body);
        case "DELETE":
            return await SessionManager.logoutUser(connection, event.body);
        default:
            return {statusCode: 400, body: "Bad Request"}
    }
};
