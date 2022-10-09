const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

let cachedDb;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true, wtimeoutMS: process.env.MONGODB_TIMEOUT });
  const db = await client.db("ArcaneFamiliars");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  let param = Number(event.pathParameters.id);
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  const familiars = await db.collection("familiars").find({_id: param}).toArray();
  delete familiars[0].meta;
  
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }, 
    body: JSON.stringify(familiars[0]),
  };

  return response;
};