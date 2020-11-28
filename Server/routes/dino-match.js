var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id=";
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name=";
const mysql = require("mysql");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/dino-match", (req, res) => {
  var wins = 0;
  var dino = "";
  var eating_habits = "";
  var playerStatus = 404;
  var pro = req.body.username;
  var resText = "";
  axios.get(FORTNITE_API_URL + pro).then(newName => {
    wins = newName.data.data.stats.all.overall.wins;
    pro = newName.data.data.account.name;
    playerStatus = newName.status;
  });
  setTimeout(function() {
    if (playerStatus === 200) {
      axios
        .get(DINO_API_URL + wins + "&show=class,ecospace,ttaph,etbasis,attr")
        .then(newerDino => {
          console.log(newerDino.data);
          dino = newerDino.data.records[0].nam;
          eating_habits = newerDino.data.records[0].jdt;
          if (eating_habits === undefined) {
            resText =
              pro +
              " has won " +
              wins +
              " games! They win so much, you could call them a " +
              dino +
              "! We don't know that dinosaur's eating habits!";
          } else {
            resText =
              pro +
              " has won " +
              wins +
              " games! They win so much, you could call them a " +
              dino +
              "! A real " +
              eating_habits +
              "!";
          }
        });
    } else {
      resText =
        "That player isn't in our records! They could be an invisible dinosaur!";
    }
    setTimeout(function() {
      res.render("dino-match", { dino_result: resText });
    }, 500);
  }, 2000);
});

module.exports = router;
