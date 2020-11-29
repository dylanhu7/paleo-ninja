var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id=";
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name=";
const mysql = require("mysql");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");

var currentResText;

router.post("/dino-match-update", (req, res) => {
  var pro = req.body.username;
  getDinoMatch(pro);

  setTimeout(function() {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(
        {
          sql: "DELETE FROM `pro-dino` ORDER BY id DESC LIMIT 1"
        },
        function(err, result) {
          if (err) {
            console.error(err);
            res.send("An error has occurred");
            return;
          }
        }
      );
      connection.query(
        {
          sql: "INSERT INTO `pro-dino` (pro, resText) VALUES(?, ?)",
          values: [pro, currentResText]
        },
        function(err, result) {
          if (err) {
            console.error(err);
            res.send("An error has occurred");
            return;
          }
        }
      );
    });

    setTimeout(function() {
      res.render("dino-match", { dino_result: currentResText });
    }, 500);
  }, 2500);
});
