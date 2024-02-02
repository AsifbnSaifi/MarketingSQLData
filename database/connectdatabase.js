require("dotenv").config();
const mysql = require("mysql");

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
    });

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        reject(err);
        return;
      }
      console.log("Connected to MySQL database");
      resolve(connection);
    });
  });
}

module.exports = connectToDatabase;

