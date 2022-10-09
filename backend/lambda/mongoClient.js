const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection
let client = new MongoClient(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, wtimeoutMS: 2000 });
module.exports = client.connect(); 