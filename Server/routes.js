var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var router = express.Router();

router.post("/api/test", (req, res) => {
  console.log(req.body);
  res.send("You sent " + req.body.username + " as your name.");
});

module.exports = router;
