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
  //next();
});

app.get("/browse-catalog", function (req, res) {

  var queryall = "SELECT book.title, author.firstName, author.lastName, genre.genreName, book.bookID FROM book JOIN author ON author.authorID = book.authorID JOIN genre ON genre.genreID = book. genreID;";

  db.pool.query(queryall, function(err, results, fields) {
    const context = {
      books: results
    };
    res.status(200).render("browse-catalog", context);

  });

  //res.status(200).render("browse-catalog", context);

});

/* SEARCH FUNCTION IN BROWSE CATALOG */
app.get("/browse-catalog/search=:searchquery", function (req, res) {
	var searchquery = req.params.searchquery;
	searchquery = searchquery.replace(/-/g, " ");

	var querysearch = "SELECT book.title, author.firstName, author.lastName, genre.genreName, book.bookID FROM book JOIN author ON author.authorID = book.authorID JOIN genre ON genre.genreID = book. genreID WHERE book.title LIKE '%" + searchquery + "%' OR author.firstName LIKE '%" + searchquery + "%' OR author.lastName LIKE '%" + searchquery + "%' OR genre.genreName LIKE '%" + searchquery + "%' OR book.bookID LIKE '%" + searchquery + "%';";

	db.pool.query(querysearch, function(err, results, fields) {
		const context = {
			books: results
		};
		res.status(200).render("browse-catalog", context);
	});

});

/* SORT FUNCTION IN BROWSE CATALOG */
app.get("/browse-catalog/sort=title=:title=author=:author=genre=:genre=bookid=:bookid", function (req, res) {

	var title = req.params.title.replace(/-/g, " ");
	var author = req.params.author.replace(/-/g, " ");
	var genre = req.params.genre.replace(/-/g, " ");
	var bookid = req.params.bookid.replace(/-/g, " ");

	var querysort = "SELECT book.title, author.firstName, author.lastName, genre.genreName, book.bookID FROM book JOIN author ON author.authorID = book.authorID JOIN genre ON genre.genreID = book. genreID WHERE book.title LIKE '%" + searchquery + "%' OR author.firstName LIKE '%" + searchquery + "%' OR author.lastName LIKE '%" + searchquery + "%' OR genre.genreName LIKE '%" + searchquery + "%' OR book.bookID LIKE '%" + searchquery + "%';";

});

app.get("/manage-orders", function (req, res) {

  //var orders = "";
  var queryOpen = "SELECT member.firstName, member.lastName, book.title, checkout.bookID, checkout.date, IF(checkout.returned, 'Yes', 'No') as returned FROM checkout JOIN member ON member.memberID = checkout.memberID JOIN book ON book.bookID = checkout.bookID;";

  /*const context =  {
    members: ,
    openCheckouts: queryOpen
  };*/

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
