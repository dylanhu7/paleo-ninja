var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "paleoninja",
  multipleStatements: true
});

router.get("/", (req, res) => { // Shows up to 5 random entries from the databse to render on the main page
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    limit = 5;
    connection.query(
      {
        sql: "SELECT * FROM `pro-dino` ORDER BY RAND() LIMIT ?",
        values: [limit]
      },
      function(err, result) {
        if (err) {
          console.error(err);
          res.send("An error has occurred");
          return;
        }
        res.render("index", {
          e0: result[0] ? result[0] : "",
          e1: result[1] ? result[1] : "",
          e2: result[2] ? result[2] : "",
          e3: result[3] ? result[3] : "",
          e4: result[4] ? result[4] : ""
        });
      }
    );
  });
});

module.exports = router;
