var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();

const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id=";
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name=";

const getDino = () => {
  var randomDino = Math.floor(100 + Math.random() * (600 - 100));
  return axios.get(DINO_API_URL + randomDino + "&show=attr");
};

router.post("/api/test", (req, res) => {
  console.log(req.body);
  getDino().then(newDino => {
    res.send(newDino.data);
  });
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
