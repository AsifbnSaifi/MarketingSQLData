const express = require("express");
const getdata = express();
const connectToDatabase = require("../database/connectdatabase.js")

getdata.get("/data", async (req, res) => {
  console.log("Request for data received");

  try {
    // Query to fetch data from the database
    const connection = await connectToDatabase();
    const sqlQuery = "SELECT * FROM persons";
    connection.query(sqlQuery, (err, data) => {
      if (err) {
        console.error("Error fetching data from MySQL:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Send the fetched data as JSON response
      res.status(200).json(data);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = getdata;
