var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const mysql = require("mysql");

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
