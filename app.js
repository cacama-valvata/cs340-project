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
  //next();
});

app.get("/browse-catalog", function (req, res) {

  var queryall = "SELECT book.title, author.firstName, author.lastName, genre.genreName, book.bookID FROM book JOIN author ON author.authorID = book.authorID JOIN genre ON genre.genreID = book.genreID;";

  db.pool.query(queryall, function(err, results, fields) {
    const context = {
      books: results
    };
    res.status(200).render("browse-catalog", context);

  });

  //res.status(200).render("browse-catalog", context);

  /* I DUNNO WHY THE DATE COMES OUT SO FUNKY
  var q = "select date from checkout;";
  db.pool.query(q, function(err, results, fields) {
    console.log(JSON.stringify(results));
  });
  */

});

app.post("/browse-catalog/sort", function (req, res) {
  const query = `SELECT book.title, author.firstName, author.lastName, genre.genreName, book.bookID FROM book JOIN author ON author.authorID = book.authorID JOIN genre ON genre.genreID = book.genreID ORDER BY ${req.body.criteria} ASC;`;
  db.pool.query(query, function(err, rows, fields) {
    let books = [{
      books: rows
    }];
    const context = {
      results: books,
    }
    res.status(200).send(JSON.stringify(context));
  })
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

  var queryorders = "SELECT member.firstName, member.lastName, member.memberID, book.title, book.bookID, checkout.date, IF(checkout.returned, 'Yes', 'No') as returned FROM checkout JOIN member ON member.memberID = checkout.memberID JOIN book ON book.bookID = checkout.bookID ORDER BY member.memberID ASC;";

  var queryopen = "SELECT member.firstName, member.lastName, book.title, checkout.bookID, checkout.date, checkout.checkoutID, IF(checkout.returned, 'Yes', 'No') as returned FROM checkout JOIN member ON member.memberID = checkout.memberID JOIN book ON book.bookID = checkout.bookID WHERE returned = 'No';";

  db.pool.query (queryopen, function(err1, results1, fields1) {

    const context = {
      members: [],
      openCheckouts: results1
    };
    //console.log(context.openCheckouts);

    context.openCheckouts.forEach(function(item) {
	const date = new Date(item.date);
	item.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    });

    db.pool.query (queryorders, function(err2, results2, fields2) {
      var added = [];
      results2.forEach(function (item) {
        //console.log(item);
	const date = new Date(item.date);
	item.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        if (! added.includes(item.memberID)) {
	  var member = {
		member: item.firstName + " " + item.lastName,
		memberID: item.memberID,
		checkouts: []
	  };
	  context.members.push(member);
	  added.push(item.memberID);
	}
	context.members[added.length-1].checkouts.push(item);
      });
	//console.log(context);
	//context.members.forEach(function(m) {console.log(m);});

	res.status(200).render("manage-orders", context);
    }); 


  });

  //res.status(200).render("manage-orders", context);
});

app.post("/manage-orders/sort", function (req, res) {
  const query = `SELECT member.firstName, member.lastName, member.memberID, book.title, book.bookID, checkout.date, IF(checkout.returned, 'Yes', 'No') as returned FROM checkout JOIN member ON member.memberID = checkout.memberID JOIN book ON book.bookID = checkout.bookID ORDER BY member.memberID, ${req.body.criteria} ASC;`;
  db.pool.query(query, function(err, rows, fields) {
    let orders = [{
      orders: rows
    }];
    const context = {
      results: orders,
    }
    res.status(200).send(JSON.stringify(context));
  })
});

/* SEARCH FN IN MANAGE ORDERS */
app.get("/manage-orders/search?=:searchquery", function (req, res) {
  var searchquery = req.params.searchquery;
  searchquery = searchquery.replace(/-/g, " ");

  var queryorders = "SELECT member.firstName, member.lastName, member.memberID, book.title, book.bookID, checkout.date, IF(checkout.returned, 'Yes', 'No') as returned FROM checkout JOIN member ON member.memberID = checkout.memberID JOIN book ON book.bookID = checkout.bookID WHERE member.firstName LIKE '%" + searchquery + "%' OR member.lastName LIKE '%" + searchquery + "%' OR member.memberID LIKE '%" + searchquery + "%' OR book.title LIKE '%" + searchquery + "%' OR book.bookID LIKE '%" + searchquery + "%' OR checkout.date LIKE '%" + searchquery + "%' OR returned LIKE '%" + searchquery + "%' ORDER BY member.memberID ASC;";

  var queryopen = "SELECT member.firstName, member.lastName, book.title, checkout.bookID, checkout.date, checkout.checkoutID, IF(checkout.returned, 'Yes', 'No') as returned FROM checkout JOIN member ON member.memberID = checkout.memberID JOIN book ON book.bookID = checkout.bookID WHERE returned = 'No';";

  db.pool.query (queryopen, function(err1, results1, fields1) {

    const context = {
      members: [],
      openCheckouts: results1
    };
    //console.log(context.openCheckouts);

    context.openCheckouts.forEach(function(item) {
	const date = new Date(item.date);
	item.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    });

    db.pool.query (queryorders, function(err2, results2, fields2) {
      var added = [];
      results2.forEach(function (item) {
	const date = new Date(item.date);
	item.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        //console.log(item);
        if (! added.includes(item.memberID)) {
	  var member = {
		member: item.firstName + " " + item.lastName,
		memberID: item.memberID,
		checkouts: []
	  };
	  context.members.push(member);
	  added.push(item.memberID);
	}
	context.members[added.length-1].checkouts.push(item);
      });
	//console.log(context);
	//context.members.forEach(function(m) {console.log(m);});
	res.status(200).render("manage-orders", context);
    }); 


  });

});

/* FOR MARKING CHECKOUTS AS RETURNED */
app.post("/manage-orders/markReturned", function (req, res) {
  var ID = req.body.id;
  var querymark = "UPDATE checkout set returned = 1 where checkoutID = " + ID + ";";

  db.pool.query(querymark, function (err, results, fields) {
	res.status(200).send();
  });

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

app.post("/manage-books/find-book", function (req, res) {
  // Does the author exist?
  let context = {};
  db.pool.query(
    "SELECT bookID FROM book WHERE bookID = ?",
    [req.body.bookIDInput],
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
  if (Object.keys(req.body).includes("genreID")) {
    db.pool.query(
      "INSERT INTO book (`title`, `genreID`, `authorID`) VALUES (?, ?, ?)",
      [req.body.titleInput, req.body.genreID, req.body.authorID],
      function (err, result) {
        context.results = {};
        res.status(200).send(JSON.stringify(context));
      }
    );
  } else {
    db.pool.query(
      "INSERT INTO book (`title`, `authorID`) VALUES (?, ?)",
      [req.body.titleInput, req.body.authorID],
      function (err, result) {
        context.results = {};
        res.status(200).send(JSON.stringify(context));
      }
    );
  }
});

app.post("/manage-members/add", function (req, res) {
  let context = {};
  db.pool.query(
    "INSERT INTO member (`firstName`, `lastName`, `email`, `phone`) VALUES (?, ?, ?, ?)",
    [
      req.body.firstNameInput,
      req.body.lastNameInput,
      req.body.emailInput || "NULL",
      req.body.phoneInput || "NULL",
    ],
    function (err, result) {
      context.results = {};
      res.status(200).send(JSON.stringify(context));
    }
  );
});

app.post("/manage-members/update-member", function (req, res) {
  // Select the current member data
  let context = {};
  db.pool.query(
    "SELECT * FROM member WHERE memberID = ?",
    [req.body.memberIDInput],
    function (err, rows, fields) {
      const [ formerAttributes ] = rows;
      db.pool.query(
        "UPDATE member SET `firstName` = ?, `lastName` = ?, `email` = ?, `phone` = ? WHERE `memberID` = ?",
        [req.body.memberFirstNameInput || formerAttributes.firstName, req.body.memberLastNameInput || formerAttributes.lastName, req.body.memberEmailInput || formerAttributes.email, req.body.memberPhoneInput || formerAttributes.phone, req.body.memberIDInput],
        function (err, result) {
          context.results = {};
          res.status(200).send(JSON.stringify(context));
        }
      );
    }
  );
});

app.post("/manage-members/find-member", function (req, res) {
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

app.post("/manage-books/update-book", function (req, res) {
  // Select the current book data
  let context = {};
  db.pool.query(
    "SELECT * FROM book WHERE bookID = ?",
    [req.body.bookIDInput],
    function (err, rows, fields) {
      const [ formerAttributes ] = rows;
      db.pool.query(
        "UPDATE book SET `title` = ?, `genreID` = ?, `authorID` = ? WHERE `bookID` = ?",
        [req.body.titleInput || formerAttributes.title, req.body.genreID || formerAttributes.genreID, req.body.authorID || formerAttributes.authorID, req.body.bookIDInput],
        function (err, result) {
          context.results = {};
          res.status(200).send(JSON.stringify(context));
        }
      );
    }
  );
})

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

/* DELETE MEMBER */
app.post("/manage-members/deleteMember", function (req, res) {
	var ID = req.body.memberID;
	var dltquery = "DELETE FROM member WHERE memberID = " + ID + ";";

	db.pool.query(dltquery, function(err, results, fields) {
		res.status(200).send();
	});
});

/* DELETE BOOK */
app.post("/manage-books/deleteBook", function (req, res) {
	var ID = req.body.bookID;
	var dltquery = "DELETE FROM book WHERE bookID = " + ID + ";";

	db.pool.query(dltquery, function(err, results, fields) {
		res.status(200).send();
	});
});


/* LISTENER */

app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
