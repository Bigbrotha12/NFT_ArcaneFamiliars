const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mainRouter = require("./routes/main");
const imxRouter = require("./routes/api");

app.use("/app", mainRouter);
app.use("/api", imxRouter);

app.listen(3000);