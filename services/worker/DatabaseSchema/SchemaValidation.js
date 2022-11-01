const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const familiarsSchema = require("./FamiliarsSchema.json");
const usersSchema = require("./UsersSchema.json");
const templatesSchema = require("./TemplateSchema.json");

(async() => {

   let URI = process.env.MONGODB_URI;
   if(!URI) { process.exit(1)}

   let client = await MongoClient.connect(URI);
   let db = client.db(process.env.MONGODB_NS);
   if(!db) { process.exit(1)}

   let resA = await setSchemaValidation("users", usersSchema, db);
   let resB = await setSchemaValidation("templates", templatesSchema, db);
   let resC = await setSchemaValidation("familiars", familiarsSchema, db); 

   console.log(resA);
   console.log(resB);
   console.log(resC);
   process.exit(0);

})();

async function setSchemaValidation(collection, schema, db) {

   let res = await db.command( 
      { 
         collMod: collection,
         validator: {
            $jsonSchema: schema
         }
      })
   return res;
}