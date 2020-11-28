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

// set up our database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'paleoninja',
  multipleStatements: true
})

router.get("/", (req, res) => {
  res.render("index");
});

function getDinoMatch(pro) {
  var wins = 0;
  var dino = "";
  var eating_habits = "";
  var playerStatus = 404;
  var resText = "";
  axios.get(FORTNITE_API_URL + pro).then(newName => {
    wins = newName.data.data.stats.all.overall.wins;
    pro = newName.data.data.account.name;
    playerStatus = newName.status;
  });
  setTimeout(function() {console.log('WINS: ' + wins)}, 1000)
  setTimeout(function() {
    console.log('playerStatus: ' + playerStatus)
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
          currentResText = resText;
        });
    } else {
      resText =
        "That player isn't in our records! They could be an invisible dinosaur!";
      currentResText = resText;
    }
    console.log('***********************************************')
    console.log(resText)
    console.log('***********************************************')
    return resText;
  }, 2000);
}

router.post("/dino-match", (req, res) => {
  var pro = req.body.username;
  var initial = req.body.initial
  getDinoMatch(pro)

  setTimeout(function() {
    pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (initial) {
      connection.query({
              sql: 'INSERT INTO `pro-dino` (pro, resText) VALUES(?, ?)',
              values: [pro, currentResText],
          }, function (err, result) {
              if (err) {
                  console.error(err)
                  res.send('An error has occurred')
                  return
              }
          }
      )
    } else {
      connection.query({
              sql: 'DELETE FROM `pro-dino` ORDER BY id DESC LIMIT 1'
          }, function (err, result) {
              if (err) {
                  console.error(err)
                  res.send('An error has occurred')
                  return
              }
          }
      );
      connection.query({
              sql: 'INSERT INTO `pro-dino` (pro, resText) VALUES(?, ?)',
              values: [pro, currentResText],
          }, function (err, result) {
             if (err) {
              console.error(err)
              res.send('An error has occurred')
              return
            }
        }
    );
    }
  })

    setTimeout(function() {
       res.render("dino-match", { dino_result: currentResText });
    }, 500);
  }, 8000);
});

function getPaleoNinjas() {
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
              textArr = [];
              for (x in result) {
                textArr.push(x['resText'])
              }
              return textArr;
          }
      )
  });
}



module.exports = router;
