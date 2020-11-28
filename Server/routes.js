var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id="
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name="
const mysql = require("mysql");

router.post("/api/test", (req, res) => {
  console.log(req.body);
  var wins = 0;
  var dino = "";
  var eating_habits = "";
  var playerStatus = 404;
  var pro = req.body.username;
  axios.get(FORTNITE_API_URL + pro).then(newName => {
    console.log(newName.data);
    console.log(newName.data.data.stats.all.overall.wins);
    wins = newName.data.data.stats.all.overall.wins;
    pro = newName.data.data.account.name;
    playerStatus = newName.status;
  });
  setTimeout(function () {
    console.log(playerStatus);
    if (playerStatus === 200) {
      axios
        .get(DINO_API_URL + wins + "&show=class,ecospace,ttaph,etbasis,attr")
        .then(newerDino => {
          console.log(wins);
          dino = newerDino.data.records[0].nam;
          eating_habits = newerDino.data.records[0].jdt;
          if (eating_habits === undefined) {
            res.send(pro + " has won " + wins + " games! They win so much, you could call them a " + dino + "! We don't know that dinosaur's eating habits!");
          } else {
            res.send(pro + " has won " + wins + " games! They win so much, you could call them a " + dino + "! A real " + eating_habits + "!");
          }
        });
    } else {
      res.send("That player isn't in our records! They could be an invisible dinosaur!");
    }
  }, 2000);
});

module.exports = router;