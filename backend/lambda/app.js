/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const clientPromise = require('./mongoClient.js');
const constants = require('./constants.js');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
require('dotenv').config();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// declare DB collections
let familiars, templates, users;
async function initCollection() {
  let client = await clientPromise;
  familiars = client.db(process.env.MONGODB_NS).collection("familiars");
  templates = client.db(process.env.MONGODB_NS).collection("templates");
  users = client.db(process.env.MONGODB_NS).collection("users");
}


// define API Controller
class APIController {
  static async apiGetFamiliar(req, res) {
    await initCollection();
    let result = await familiars.findOne({ _id: req.body.id });
    res.statusCode(200).json(result);
  }
}

// define routes
//app.get('/v1/familiars/:id', APIController.apiGetFamiliar);
app.get('/', APIController.apiGetFamiliar);

// start server
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
