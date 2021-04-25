/* SETUP */

// Express
var express = require("express");
var app = express();

// Handlebars
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Port
PORT = 3131;
app.set("port", PORT);

// Not quite sure what this does, but it seems to set the path for the static files (Ex: style.css)
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Database
var db = require("./db-connector");

/* ROUTES */

app.get("/browse-catalog", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.render("browse-catalog", context);
});

app.get("/manage-orders", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.render("manage-orders", context);
});

app.get("/place-order", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.render("place-order", context);
});

app.get("/add-book", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.render("add-book", context);
});

/* LISTENER */

app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
