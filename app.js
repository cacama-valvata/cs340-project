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

var bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
      {
        member: "David Johnson",
        title: "The Catcher in the Rye",
        id: 17,
        date: "01-1-2021",
        returned: "No",
      },
    ],
  };

  res.status(200).render("manage-orders", context);
});

/* FOR MARKING CHECKOUTS AS RETURNED */
app.post("/manage-orders/markReturned", function (req, res) {
  res.status(200).send();
});

app.post("/manage-books/find-genre", function (req, res) {
  // Does the genre exist?
  let context = {};
  db.pool.query(
    "SELECT genreID FROM genre WHERE genreName = ?",
    [req.body.genreInput],
    function (err, rows, fields) {
      context.results = rows;
      res.status(200).send(JSON.stringify(context));
    }
  );
});

app.post("/manage-books/add-genre", function (req, res) {
  // Add a new genre and return the genreId
  let context = {};
  db.pool.query(
    "INSERT INTO genre (`genreName`) VALUES (?)",
    [req.body.genreInput],
    function (err, results) {
      db.pool.query(
        "SELECT genreID FROM genre WHERE genreName = ?",
        [req.body.genreInput],
        function (err, rows, fields) {
          context.results = rows;
          res.status(200).send(JSON.stringify(context));
        }
      );
    }
  );
});

app.post("/manage-books/find-author", function (req, res) {
  // Does the author exist?
  let context = {};
  db.pool.query(
    "SELECT authorID FROM author WHERE firstName = ? AND lastName = ?",
    [req.body.authorFirstNameInput, req.body.authorLastNameInput],
    function (err, rows, fields) {
      context.results = rows;
      res.status(200).send(JSON.stringify(context));
    }
  );
});

app.post("/manage-books/add-author", function (req, res) {
  // Add a new author and return the authorId
  let context = {};
  db.pool.query(
    "INSERT INTO author (`firstName`, `lastName`) VALUES (?, ?)",
    [req.body.authorFirstNameInput, req.body.authorLastNameInput],
    function (err, results) {
      db.pool.query(
        "SELECT authorID FROM author WHERE firstName = ? AND lastName = ?",
        [req.body.authorFirstNameInput, req.body.authorLastNameInput],
        function (err, rows, fields) {
          context.results = rows;
          res.status(200).send(JSON.stringify(context));
        }
      );
    }
  );
});

app.post("/manage-books/add-book", function (req, res) {
  let context = {};
  console.log(req.body);
  db.pool.query(
    "INSERT INTO book (`title`, `genreID`, `authorID`) VALUES (?, ?, ?)",
    [req.body.titleInput, req.body.genreID, req.body.authorID],
    function (err, result) {
      context.results = {};
      res.status(200).send(JSON.stringify(context));
    }
  );
});

app.post("/manage-members/add", function (req, res) {
  db.pool.query(
    "INSERT INTO member (`firstName`, `lastName`, `email`, `phone`) VALUES (?, ?, ?, ?)",
    [
      req.body.firstNameInput,
      req.body.lastNameInput,
      req.body.emailInput || "NULL",
      req.body.phoneInput || "NULL",
    ],
    function (err, result) {
      res.status(200).send();
    }
  );
});

app.post("/place-order/find-member", function (req, res) {
  // Does the member exist?
  let context = {};
  db.pool.query(
    "SELECT memberID FROM member WHERE memberID = ?",
    [req.body.memberIDInput],
    function (err, rows, fields) {
      context.results = rows;
      res.status(200).send(JSON.stringify(context));
    }
  );
});

app.post("/place-order/find-book", function (req, res) {
  // Does the book exist?
  let context = {};
  db.pool.query(
    "SELECT bookID FROM book WHERE bookID = ?",
    [req.body.bookID],
    function (err, rows, fields) {
      context.results = rows;
      res.status(200).send(JSON.stringify(context));
    }
  );
});

app.post("/place-order/add-order", function (req, res) {
  let context = {};
  db.pool.query(
    "INSERT INTO checkout (`memberID`, `bookID`, `date`, `returned`) VALUES (?, ?, ?, ?)",
    [req.body.memberIDInput, req.body.bookID, req.body.checkoutDateInput, 0],
    function (err, result) {
      context.results = {};
      res.status(200).send(JSON.stringify(context));
    }
  );
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
