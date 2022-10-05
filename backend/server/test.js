
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://AFAPP2022:PASS1234@afcluster.hwxija0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("ArcaneFamiliars").collection("users");
  // perform actions on the collection object
  client.close();
});
