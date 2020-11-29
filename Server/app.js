var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index.js");
var dinoMatchRouter = require("./routes/dino-match.js");
var dinoMatchUpdateRouter = require("./routes/dino-match-update.js");

var app = express();

// set up our templating engine
app.set("view engine", "jade");
//app.engine('html', require('hbs').__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", dinoMatchRouter);
app.use("/", dinoMatchUpdateRouter);

module.exports = app;
