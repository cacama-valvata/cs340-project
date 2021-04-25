/* SETUP */

// Express
var express = require("express");
var app = express();
const path = require("path");

// Handlebars
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Port
PORT = 3131;
app.set("port", PORT);

// Serves static files from "public" directory
app.use(express.static("public"));

// Database
var db = require("./db-connector");

/* ROUTES */

app.get("/", function(req, res) {
	res.status(301).redirect("/browse-catalog");
	next();
});

app.get("/browse-catalog", function (req, res) {
	//db.pool.query(query, function(err, results, fields) {});
	const context = {};

	res.status(200).render("browse-catalog", context);
});

app.get("/manage-orders", function (req, res) {
	//db.pool.query(query, function(err, results, fields) {});
	const context = {};

	res.status(200).render("manage-orders", context);
});

app.get("/place-order", function (req, res) {
	//db.pool.query(query, function(err, results, fields) {});
	const context = {};

	res.status(200).render("place-order", context);
});

app.get("/add-book", function (req, res) {
	//db.pool.query(query, function(err, results, fields) {});
	const context = {};

	res.status(200).render("add-book", context);
});

/* LISTENER */

app.listen(PORT, function () {
	console.log("Listening on port " + PORT);
});
