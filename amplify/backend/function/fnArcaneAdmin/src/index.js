const MongoClient = require("mongodb").MongoClient;
const SessionManager = require("./SessionManager.js");
const Validator = require("./Validator.js");
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

    let session = await Validator.validSession(connection, event);
    if(!session.isActive || !Validator.validTimestamp(event) || !Validator.validSignature(event))
    {return {statusCode: 403, message: "Forbidden: Invalid signature"}}
    
    /**
     *  Recognize which action is being requested
     *  by path and method.
     *  "path": [
     *     "/v1/user"
     *          "httpMethod": [
     *              "GET" - Check if user address is registered
     *     "/v1/user/save"
     *          "httpMethod": [
     *              "POST" - Save game state
     *              "PATCH" - Update user progress ] 
     *      "/v1/user/load"
     *          "httpMethod": [
     *              "GET" - Load game state ]
     *      "/v1/user/register"
     *          "httpMethod": [
     *              "POST" - Register new user address ]
     *      "/v1/user/login"
     *          "httpMethod": [
     *              "POST" - Login user session ]
     *      "/v1/user/logout": [
     *          "httpMethod": [
     *              "DELETE" - Logout user session ]
     *  */ 

    // Router configuration
    if(event.path === "/v1/user") {
        if(event.httpMethod === "GET") {return await SessionManager.checkSession(connection, event)}}
    if(event.path === "/v1/user/save") {
        if(event.httpMethod === "PATCH") {return await SessionManager.saveGame(connection, event, session)}}
    if(event.path === "/v1/user/load") {
        if(event.httpMethod === "GET") {return await SessionManager.loadGame(connection, event, session)}}
    if(event.path === "/v1/user/register") {
        if(event.httpMethod === "POST") {return await SessionManager.registerUser(connection, event)}}
    if(event.path === "/v1/user/login") {
        if(event.httpMethod === "POST") {return await SessionManager.loginUser(connection, event)}}
    if(event.path === "/v1/user/logout") {
        if(event.httpMethod === "DELETE") {return await SessionManager.logoutUser(connection, event)}}
    return {statusCode: 400, body: "Bad Request"}
};
