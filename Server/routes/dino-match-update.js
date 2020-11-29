var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id=";
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name=";
const mysql = require("mysql");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");

// set up our database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "paleoninja",
  multipleStatements: true
});

var pro;
var wins;
var dino;
var eatingHabits;
var validUser = false;

function getDinoMatch(proName) {
  var playerStatus = 404;
  axios.get(FORTNITE_API_URL + proName).then(newName => {
    wins = newName.data.data.stats.all.overall.wins;
    pro = newName.data.data.account.name;
    playerStatus = newName.status;
  });
  setTimeout(function() {
    if (playerStatus === 200) {
      validUser = true;
      axios
        .get(DINO_API_URL + wins + "&show=class,ecospace,ttaph,etbasis,attr")
        .then(newerDino => {
          dino = newerDino.data.records[0].nam;
          eatingHabits = newerDino.data.records[0].jdt;
        });
    }
  }, 2000);
}

router.post("/dino-match-update", (req, res) => {
  getDinoMatch(req.body.username);

  setTimeout(function() {
    function addToDatabase(values) {
      pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(
          {
            sql:
              "INSERT INTO `pro-dino` (pro, wins, dino, eatingHabits) VALUES(?, ?, ?, ?)",
            values: values
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
    }

    setTimeout(function() {
      var resText;
      if (validUser) {
        if (eatingHabits === undefined) {
          addToDatabase([pro, wins, dino, "unknown"]);
          resText =
            pro +
            " has won " +
            wins +
            " games! They win so much, you could call them a " +
            dino +
            "! We don't know that dinosaur's eating habits!";
        } else {
          addToDatabase([pro, wins, dino, eatingHabits]);
          resText =
            pro +
            " has won " +
            wins +
            " games! They win so much, you could call them a " +
            dino +
            "! A real " +
            eatingHabits +
            "!";
        }
      } else {
        resText = "Oops! We could not find that Fortnite player!";
      }
      res.render("dino-match", { result_dino: resText });
    }, 500);
  }, 2500);
});

module.exports = router;
