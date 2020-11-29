var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id="; // API URL for retrieving paleobiologic organisms
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name="; // API URL for retrieving a fortnite player's stats
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

<<<<<<< HEAD
// gets a user's fortnite stats and matches them with a paleobiologic organism
// takes in concatenation of fortnite API URL starter and given username,
// makes a GET request to the fortnite API using the concatenated url
function getDinoMatch(pro) {
  var wins = 0; // inits player's fortnite wins
  var dino = ""; // inits organism to match player with
  var eating_habits = ""; // inits that organism's eating habits
  var playerStatus = 404; // default error when accessing fortnite API
  var resText = "";
  axios.get(FORTNITE_API_URL + pro).then(newName => {
    wins = newName.data.data.stats.all.overall.wins; // retrieves user's wins
    pro = newName.data.data.account.name; // retrieves user's name
    playerStatus = newName.status; // status of API GET request; 200 is a successful request, 404 is a failed one (given username is not a real fortnite player)
  });
  setTimeout(function() { // delay added to match the time it takes to access the fortnite API
    if (playerStatus === 200) { // if a successful API request has been made
=======
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
>>>>>>> 1fba25d78b258ea2f257710200361b68a36c5d2d
      axios
        .get(DINO_API_URL + wins + "&show=class,ecospace,ttaph,etbasis,attr") // takes the user's number of wins, gets the paleobiologic organism with that id
        // includes that organism's eating habits in retrieved data
        .then(newerDino => {
<<<<<<< HEAD
          dino = newerDino.data.records[0].nam; // gets the name of the retrieved organism
          eating_habits = newerDino.data.records[0].jdt; // gets that organism's eating habits
          if (eating_habits === undefined) { // if eating habits not listed for organism
            resText =
              pro +
              " has won " +
              wins +
              " games! They win so much, you could call them a " +
              dino +
              "! We don't know that dinosaur's eating habits!";
          } else { // otherwise, if eating habits are listed for organism
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
          currentResText = resText; =
        });
    } else { // if player's wins are not a valid ID in the paleobiologic database
      resText =
        "That player isn't in our records! They could be an invisible dinosaur!";
      currentResText = resText;
    }
    return resText;
=======
          dino = newerDino.data.records[0].nam;
          eatingHabits = newerDino.data.records[0].jdt;
        });
    }
>>>>>>> 1fba25d78b258ea2f257710200361b68a36c5d2d
  }, 2000);
}

router.post("/dino-match", (req, res) => { // Consumes a fortnite username and inserts the relevant fortnite and archeological values into the database, and renders the result
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
