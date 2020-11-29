var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'paleoninja',
  multipleStatements: true
})

router.get("/", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
      limit = 5;
      connection.query({
              sql: 'SELECT * FROM `pro-dino` ORDER BY RAND() LIMIT ?',
              values: [limit],
          }, function (err, result) {
              if (err) {
                  console.error(err)
                  res.send('An error has occurred')
                  return
              }
              console.log("result: " + result[0]['resText'])
              res.render('index', {e1: result[0]['resText'], e2: result[1]['resText'], e3: result[0]['resText'], e4: result[0]['resText'], e5: result[0]['resText']});
          }
      )
  });
  //res.render("index");
});

module.exports = router;
