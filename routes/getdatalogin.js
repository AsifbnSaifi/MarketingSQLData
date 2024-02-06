const express = require("express");
const getdatalogin = express();
const connectToDatabase = require("../database/connectdatabase.js");

getdatalogin.post("/datalogin", async (req, res) => {
  console.log(req.body);
  const { name, client } = req.body;
  try {
    // Query to fetch data from the database
    const connection = await connectToDatabase();
    const sqlQuery = "SELECT * FROM persons WHERE referalID = ? OR clientID = ?";

    // Checking if the referral id (clientID) matches
    connection.query(sqlQuery, [client, client , name], (err, data) => {
      if (err) {
        console.error("Error fetching data from MySQL:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Checking if there is any data returned
      if (data.length > 0) {
        // Send the fetched data as JSON response
        console.log(data);
        res.status(200).json(data);
      } else {
        console.log(data);
        res.status(404).json({ message: "No data found for the provided referral id or clientID." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

  
module.exports = getdatalogin;
