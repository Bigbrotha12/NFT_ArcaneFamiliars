import * as dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import mainRouter from "./routes/api-routes.js";
import FamiliarsDAO from "./dao/familiarsDAO.js";
import UsersDAO from "./dao/usersDAO.js";
import { MongoClient } from "mongodb";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Set-up middleware
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// Set-up router
app.use("/api", mainRouter);

// 404 and error response
app.use((req, res, next) => {res.status(404).send("Resource not found.")});
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Sorry, something went wrong.')
  });

// Connect MondoDB
MongoClient.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
    }
).catch( error => {
    console.error(error.stack);
    process.exit(1);
}).then( async client => {
    await UsersDAO.injectDB(client);
    await FamiliarsDAO.injectDB(client);
    // start server
    app.listen(port, console.log(`listening on port ${port}`));
});


