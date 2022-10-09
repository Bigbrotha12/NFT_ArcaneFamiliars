const MongoClient = require("mongodb").MongoClient;
const Validator = require("./validator.js");
const FamiliarFactory = require("./familiarFactory.js");
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
    let address = event.body.eth_address;
    context.callbackWaitsForEmptyEventLoop = false;

    const [client, db] = await connectToDatabase();
    const user = await db.collection("users").find({_id: address}).toArray();
    let response;
    let validation = Validator.validate(event.body, user[0]);
    if(validation.success) {
        console.log("Validation Passed!");
        let session = client.startSession();
        let familiarToMint = await FamiliarFactory.generateNextFamiliar(user[0], db);
        if(!familiarToMint) {return {statusCode: 500, body: {message: "Database error"}}}
        await FamiliarFactory.registerFamiliar(familiarToMint, user[0], db, session);

        response = {
            statusCode: 200,
            body: JSON.stringify(familiarToMint),
        };
    } else {
        console.log("Validation failed!");
        response = {
            statusCode: 400,
            body: JSON.stringify({message: validation.error.message}),
        };
    }
    return response;
};
