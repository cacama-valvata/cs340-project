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

app.get("/", function (req, res) {
  res.status(301).redirect("/browse-catalog");
  next();
});

app.get("/browse-catalog", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {
    books: [
      {
        title: "The Adventures of Huckleberry Finn",
        author: "Mark Twain",
        genre: "Picaresque Novel",
        id: 1,
      },
      {
        title: "Alice's Adventures in Wonderland",
        author: "Lewis Carroll",
        genre: "Fantasy",
        id: 2,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Tragedy",
        id: 3,
      },
    ],
  };

  res.status(200).render("browse-catalog", context);
});

app.get("/manage-orders", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {
    members: [
      {
        member: "John Smith",
        memberId: 1,
        checkouts: [
          {
            title: "The Great Gatsby",
            id: 3,
            date: "04-20-2020",
            returned: "Yes",
          },
          {
            title: "Alice's Adventures in Wonderland",
            id: 2,
            date: "04-20-2020",
            returned: "Yes",
          },
          {
            title: "The Adventures of Huckleberry Finn",
            id: 1,
            date: "01-03-2020",
            returned: "Yes",
          },
        ],
      },
      {
        member: "Linda Johnson",
        memberId: 2,
        checkouts: [
          {
            title: "Hamlet",
            id: 4,
            date: "01-17-2021",
            returned: "Yes",
          },
          {
            title: "To Kill a Mockingbird",
            id: 7,
            date: "02-21-2021",
            returned: "Yes",
          },
          {
            title: "Catch-22",
            id: 10,
            date: "02-21-2021",
            returned: "No",
          },
        ],
      },
    ],
    openCheckouts: [
      {
        member: "Linda Johnson",
        title: "Catch-22",
        id: 10,
        date: "02-21-2021",
        returned: "No",
      },
    ],
  };

  res.status(200).render("manage-orders", context);
});

app.get("/place-order", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.status(200).render("place-order", context);
});

app.get("/manage-books", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.status(200).render("manage-books", context);
});

app.get("/manage-members", function (req, res) {
  //db.pool.query(query, function(err, results, fields) {});
  const context = {};

  res.status(200).render("manage-members", context);
});

/* LISTENER */

app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
