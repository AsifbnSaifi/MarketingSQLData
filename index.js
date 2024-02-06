require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./database/connectdatabase.js");
const getdata  = require('./routes/getsqldata.js');
const getdatalogin = require("./routes/getdatalogin.js");


// Use CORS middleware
server.use(cors());
server.use(bodyParser.json());

const port = process.env.PORT || 5000;

//Check for Home is Working  Fine
server.get("/", (req, res) => {
  res.send("Home Route is Working Fine");
});

//get data to the database
server.use(getdata)

//get a data specific users
server.use(getdatalogin)

connectToDatabase().then(() => {
  server.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
