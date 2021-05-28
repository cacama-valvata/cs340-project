if (document.getElementById("search-books-button")) {
document.getElementById("search-books-button").onclick = function() {
	// middle specific-search field for Browse page

	if (! document.getElementById("search-prompt").value) {
		alert("Nothing to search");
		return;
	}

	var searchquery = document.getElementById("search-prompt").value;
	searchquery = searchquery.replace(/ /g, "-");
	//var currentURL = window.location.pathname;
	var requestURL = "/browse-catalog/search=" + searchquery;
	
	window.location = requestURL;
}}

/*
if (document.getElementById("submit-sort")) {
document.getElementById("submit-sort").onclick = function() {
	// sort fields on the left-side for Browse & Members page
	// will be changed later

	if (document.getElementById("sort-title").value || document.getElementById("sort-author").value || document.getElementById("sort-genre").value || document.getElementById("sort-bookid").value) {
		// sort-title is the same for both pages and it shouldnt be
		//if at least one field has a query
		var title = document.getElementById("sort-title").value;
		var author = document.getElementById("sort-author").value;
		var genre = document.getElementById("sort-genre").value;
		var bookid = document.getElementById("sort-bookid").value;
		// sanitize for question marks?

		title = title.replace(/ /g, "-");
		author = author.replace(/ /g, "-");
		genre = genre.replace(/ /g, "-");
		bookid = bookid.replace(/ /g, "-");

		//var currentURL = window.location.pathname;
		var requestURL = "/browse-catalog/sort=title=" + title + "=author=" + author + "=genre=" + genre + "=bookid=" + bookid;

		window.location = requestURL;
	}

	alert("Nothing to sort");
}}
*/

if (document.getElementById("search-members-button")) {
document.getElementById("search-members-button").onclick = function() {
	// middle specific-search field for Orders page

	if (! document.getElementById("search-prompt").value) {
		alert("Nothing to search");
		return;
	}

	var searchquery = document.getElementById("search-prompt").value;
	//var currentURL = window.location.pathname;
	var requestURL = "/manage-orders/search=" + searchquery;
	
	window.location = requestURL;
}}

if (document.getElementsByClassName("returned-submit")) {
	var opencobuttons = document.getElementsByClassName("returned-submit");
	for (var i = 0; i < opencobuttons.length; i++) {
	opencobuttons[i].onclick = function() {

		var currentURL = window.location.pathname;
		var requestURL = currentURL + '/markReturned';
		var request = new XMLHttpRequest();
		request.open('POST', requestURL);
	
		var entry = event.target.parentElement.parentElement.parentElement;
		var CO_id = entry.getAttribute('data');

		var requestBody = JSON.stringify({id: CO_id});
		request.setRequestHeader('Content-Type', 'application/json');

		request.addEventListener('load', function (event) {
			if (event.target.status === 200) {
				entry.remove();
				location.reload();
				//change to yes on the middle column?
			}
			else {
				alert("There was an error.");
			}
		});

		request.send(requestBody);
	}};
}

if (document.getElementById("add-book-order")) {
document.getElementById("add-book-order").onclick = function() {
	// add another field to checkout a book

	var newField = Handlebars.templates.moaddbook();
	document.getElementById("mo-bookids-container").insertAdjacentHTML('afterend', newField);

	document.getElementById("remove-book-order").onclick = function() {
		// remove field that user added previously
		var entry = event.target.closest("#mo-bookids-container");
		entry.remove();
	}
}}

// Moved this to addOrder.js
/*
if (document.getElementById("submit-place-order")) {
document.getElementById("submit-place-order").onclick = function() {
	if (! (document.getElementById("memberid-prompt").value && document.getElementById("checkoutdate-prompt").value && document.getElementsByClassName("add-book-prompt")[0].value)) {
		alert("Empty fields.");
		return;
	}

	var memberID = document.getElementById("memberid-prompt").value;
	var COdate = document.getElementById("checkoutdate-prompt").value;
	var selectbooks = document.querySelectorAll(".add-book-prompt");
	var bookIDs = [];
	selectbooks.forEach(function(item) {
		bookIDs.push(item.value);
	});
	//sanitize bookIDs for blank inputs?

	var currentURL = window.location.pathname;

	var verifyURL = currentURL + '/verifyMember';
	var verRequest = new XMLHttpRequest();
	request.open('POST', verifyURL);
	var verifyBody = JSON.stringify({memberID: memberID});
	verRequest.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', function (event) {
		if (event.target.status === 200) {


			if (event.target.response == 0) {
				alert("The provided member does not exist. Add  them on the \"Manage Members\" page");
				return;
			}

			// THE REAL REQUEST
			// wanted to block in case memberID doesnt exist
			var requestURL = currentURL + '/submitOrder';
			var request = new XMLHttpRequest();
			request.open('POST', requestURL);

			var requestBody = JSON.stringify({memberID: memberID, checkout: COdate, bookIDs: bookIDs});
			request.setRequestHeader('Content-Type', 'application/json');

			request.addEventListener('load', function (event) {
				if (event.target.status === 200) {
					alert("Your order has been placed.");
				}
				else {
					alert("There was an error.");
				}
			});

			request.send(requestBody);


		}
		else {
			alert("There was an error.");
		}
	});

	request.send(verifyBody);
}}
*/

if (document.getElementById("members-add-form")) {
const memberAddBtn = document.getElementById("members-add");
const memberUpdateBtn = document.getElementById("members-update");
const memberDeleteBtn = document.getElementById("members-delete");
const memberBtns = [memberAddBtn, memberUpdateBtn, memberDeleteBtn];

const memberAddForm = document.getElementById("members-add-form");
const memberUpdateForm = document.getElementById("members-update-form");
const memberDeleteForm = document.getElementById("members-delete-form");
const memberForms = [memberAddForm, memberUpdateForm, memberDeleteForm];

memberAddBtn.addEventListener("click", () => {
  memberBtns.forEach((btn) => (btn.style.backgroundColor = "gray"));
  memberForms.forEach((form) => (form.style.display = "none"));

  memberAddForm.style.display = "initial";
  memberAddBtn.style.backgroundColor = "lightgrey";
});

memberUpdateBtn.addEventListener("click", () => {
  memberBtns.forEach((btn) => (btn.style.backgroundColor = "gray"));
  memberForms.forEach((form) => (form.style.display = "none"));

  memberUpdateForm.style.display = "initial";
  memberUpdateBtn.style.backgroundColor = "lightgrey";
});

memberDeleteBtn.addEventListener("click", () => {
  memberBtns.forEach((btn) => (btn.style.backgroundColor = "gray"));
  memberForms.forEach((form) => (form.style.display = "none"));

  memberDeleteForm.style.display = "initial";
  memberDeleteBtn.style.backgroundColor = "lightgray";
});
}

// Moved this to addMember.js
/*
if (document.getElementById("members-add-form")) {
document.getElementById("add-members-submit").onclick = function () {
	if (document.getElementById("mm-first-name-prompt").value && document.getElementById("mm-last-name-prompt").value) {
		var fname = document.getElementById("mm-first-name-prompt").value;
		var lname = document.getElementById("mm-last-name-prompt").value;
		var phone = document.getElementById("mm-phone-prompt").value;
		var email = document.getElementById("mm-email-prompt").value;

		var currentURL = window.location.pathname;
		var requestURL = currentURL + '/addMember';

		var request = new XMLHttpRequest();
		request.open('POST', requestURL);

		var requestBody = JSON.stringify({fname: fname, lname: lname, phone: phone, email:email});
		request.setRequestHeader('Content-Type', 'application/json');

		request.addEventListener('load', function (event) {
			if (event.target.status === 200) {
				alert("Member has been added.");
			}
			else {
				alert("There was an error.");
			}
		});

		request.send(requestBody);

	}
	else {
		alert("Both first name and last name must be filled out");
	}
}
}


if (document.getElementById("members-update-form")) {
document.getElementById("update-members-submit").onclick = function () {
	if (document.getElementById("um-id-prompt").value) {
		var memberID = document.getElementById("um-id-prompt").value;
		var fname = document.getElementById("um-first-name-prompt").value;
		var lname = document.getElementById("um-last-name-prompt").value;
		var phone = document.getElementById("um-phone-prompt").value;
		var email = document.getElementById("um-email-prompt").value;

		var currentURL = window.location.pathname;
		var requestURL = currentURL + '/updateMember';

		var request = new XMLHttpRequest();
		request.open('POST', requestURL);

		var requestBody = JSON.stringify({memberID: memberID, fname: fname, lname: lname, phone: phone, email:email});
		request.setRequestHeader('Content-Type', 'application/json');

		request.addEventListener('load', function (event) {
			if (event.target.status === 200) {
				alert("Member has been updated.");
			}
			else {
				alert("There was an error.");
			}
		});

		request.send(requestBody);

	}
	else {
		alert("Member ID must be filled out");
	}
}
}
*/

if (document.getElementById("members-delete-form")) {
document.getElementById("remove-members-submit").onclick = function () {
	if (document.getElementById("dm-id-prompt").value) {
		var memberID = document.getElementById("dm-id-prompt").value;

		var currentURL = window.location.pathname;
		var requestURL = currentURL + '/deleteMember';

		var request = new XMLHttpRequest();
		request.open('POST', requestURL);

		var requestBody = JSON.stringify({memberID: memberID});
		request.setRequestHeader('Content-Type', 'application/json');

		request.addEventListener('load', function (event) {
			if (event.target.status === 200) {
				alert("Member has been deleted.");
				window.location = "/manage-members";
			}
			else {
				alert("There was an error.");
			}
		});

		request.send(requestBody);

	}
	else {
		alert("Member ID must be filled out");
	}
}
}

if(document.getElementById("add-book-fields")) {
const bookAddBtn = document.getElementById("books-add");
const bookDeleteBtn = document.getElementById("books-delete");
const bookUpdateBtn = document.getElementById("books-update");
const bookBtns = [bookAddBtn, bookDeleteBtn, bookUpdateBtn];

const bookAddForm = document.getElementById("add-book-fields");
const bookDeleteForm = document.getElementById("rm-book-fields");
const bookUpdateForm = document.getElementById("update-books-fields");
const bookForms = [bookAddForm, bookDeleteForm, bookUpdateForm];

bookAddBtn.addEventListener("click", () => {
  bookBtns.forEach((btn) => (btn.style.backgroundColor = "gray"));
  bookForms.forEach((form) => (form.style.display = "none"));

  bookAddForm.style.display = "initial";
  bookAddBtn.style.backgroundColor = "lightgrey";
});

bookDeleteBtn.addEventListener("click", () => {
  bookBtns.forEach((btn) => (btn.style.backgroundColor = "gray"));
  bookForms.forEach((form) => (form.style.display = "none"));

  bookDeleteForm.style.display = "initial";
  bookDeleteBtn.style.backgroundColor = "lightgray";
});

bookUpdateBtn.addEventListener("click", () => {
	bookBtns.forEach((btn) => (btn.style.backgroundColor = "gray"));
	bookForms.forEach((form) => (form.style.display = "none"));
  
	bookUpdateForm.style.display = "initial";
	bookUpdateBtn.style.backgroundColor = "lightgray";
  });
}

// Urls used in addOrder, addMember, addBook, updateMember, and updateBook functionalities
const requestUrls = {
  addAuthor: "/manage-books/add-author",
  addBook: "/manage-books/add-book",
  addGenre: "/manage-books/add-genre",
  addMember: "/manage-members/add",
  addOrder: "/place-order/add-order",
  findAuthor: "/manage-books/find-author",
  findBook: "/manage-books/find-book",
  findBookOrder: "/place-order/find-book",
  findGenre: "/manage-books/find-genre",
  findMember: "/manage-members/find-member",
  sortBooks: "/browse-catalog/sort",
  sortOrders: "/manage-orders/sort",
  updateBook: "/manage-books/update-book",
  updateMember: "/manage-members/update-member",
};

const sendRequest = async (url, payload, type) => {
	const response = await fetch(url, {
	  method: "POST",
	  mode: "cors",
	  cache: "default",
	  credentials: "same-origin",
	  headers: {
		"Content-Type": "application/json",
	  },
	  redirect: "follow",
	  referrerPolicy: "no-referrer",
	  body: JSON.stringify(payload),
	});
	const { results } = await response.json();
  
	if (response.status > 200) {
	  console.error(`${type}: Status ${response.status}`);
	  return {};
	} else {
	  console.log(`${type}: Status ${response.status}`);
	  return results[0] || {};
	}
  };

// Add functionality for "Place Order"
const addOrderBtn = document.getElementById("submit-place-order");
if (addOrderBtn) {
  addOrderBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const memberIDInput = document.getElementById("memberid-prompt").value;
    const checkoutDateInput = document.getElementById("checkoutdate-prompt").value;

    // Get array of nonempty bookID values
    const bookIDFields = Array.from(document.getElementsByClassName("add-book-prompt"));
    const bookIDInputs = [];
    bookIDFields.forEach((field) => {
      if (field.value.length > 0) bookIDInputs.push(field.value);
    });

    // Are all fields filled (at least one bookID)
    if (
      memberIDInput.length === 0 ||
      checkoutDateInput.length === 0 ||
      bookIDInputs.length === 0
    ) {
      console.error("Missing a field!");
      return;
    }

    // Does the member exist?
    const foundMember = await sendRequest(
      requestUrls.findMember,
      { memberIDInput },
      "Finding Member"
    );
    if (!("memberID" in foundMember)) {
      console.error("Member not found!");
      return;
    } else {
      console.log(foundMember);
    }

    // Do the books exist?
    let foundBookIDs = true;
    let bookID;
    for (let i = 0; i < bookIDInputs.length; i++) {
      bookID = bookIDInputs[i];
      const foundBook = await sendRequest(
        requestUrls.findBookOrder,
        { bookID },
        `Finding Book #${bookID}`
      );
      if (!("bookID" in foundBook)) foundBookIDs = false;
    }
    if (!foundBookIDs) {
      console.error("Invalid book ID");
      return;
    }

    // Add order(s)
    for (let i = 0; i < bookIDInputs.length; i++) {
      bookID = bookIDInputs[i];
      await sendRequest(
        requestUrls.addOrder,
        { memberIDInput, checkoutDateInput, bookID },
        `Adding Order for Book #${bookID}`
      );
    }
  })
};

// Add functionality for "Manage Members"
const addMemberBtn = document.getElementById("add-members-submit");
if (addMemberBtn) {
  addMemberBtn.addEventListener("click", (e) => {
	e.preventDefault();
    const firstNameInput = document.getElementById("mm-first-name-prompt").value;
    const lastNameInput = document.getElementById("mm-last-name-prompt").value;
    const emailInput = document.getElementById("mm-email-prompt").value;
    const phoneInput = document.getElementById("mm-phone-prompt").value;

    if (firstNameInput.length > 0 && lastNameInput.length > 0) {
      const payload = {
        firstNameInput,
        lastNameInput,
        emailInput,
        phoneInput,
      };
      sendRequest(requestUrls.addMember, payload, "Adding Member");
    } else {
      console.error("Missing first or last name!");
    }
  })
};

// Add functionality for "Manage Books"
const addBookBtn = document.getElementById("add-book-submit");
if (addBookBtn) {
  addBookBtn.addEventListener("click", async (e) => {
	e.preventDefault();
    const titleInput = document.getElementById("ab-title-prompt").value;
    const authorFirstNameInput = document.getElementById("ab-fname-prompt").value;
    const authorLastNameInput = document.getElementById("ab-lname-prompt").value;
    const genreInput = document.getElementById("ab-genre-prompt").value;

    // All fields except genreID must be filled
    if (
      authorFirstNameInput.length > 0 &&
      authorLastNameInput.length > 0 &&
      titleInput.length > 0
    ) {
      let genreID;
      if (genreInput.length > 0) {
        // The genre field is not empty
        let foundGenre = await sendRequest(
          requestUrls.findGenre,
          { genreInput },
          "Finding Genre"
        );
        // The input in the genre field does not have a match
        if (!("genreID" in foundGenre)) {
          foundGenre = await sendRequest(
            requestUrls.addGenre,
            { genreInput },
            "Adding Genre"
          );
        }
        genreID = foundGenre.genreID;
      }

      // Does author exist?
      let foundAuthor = await sendRequest(
        requestUrls.findAuthor,
        { authorFirstNameInput, authorLastNameInput },
        "Finding Author"
      );
      // Add author
      if (!("authorID" in foundAuthor)) {
        foundAuthor = await sendRequest(
          requestUrls.addAuthor,
          { authorFirstNameInput, authorLastNameInput },
          "Adding Author"
        );
      }
      const { authorID } = foundAuthor;

      const payload = {
        titleInput,
        authorID,
        genreID,
      };
      // Add the book
      sendRequest(requestUrls.addBook, payload, "Adding Book");
    } else {
      console.error("One of the fields is missing!");
    }
  })
};

// Update functionality for "Manage Members"
const updateMemberBtn = document.getElementById("update-members-submit");
if (updateMemberBtn) {
  updateMemberBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	const memberIDInput = document.getElementById("um-id-prompt").value;
	const memberFirstNameInput = document.getElementById("um-first-name-prompt").value;
	const memberLastNameInput = document.getElementById("um-last-name-prompt").value;
	const memberEmailInput = document.getElementById("um-email-prompt").value;
	const memberPhoneInput = document.getElementById("um-phone-prompt").value;
	  
	// There must be a memberID
	if (memberIDInput.length === 0) return;
	  
	// Does the member exist?
	let foundMember = await sendRequest(
	  requestUrls.findMember,
	  { memberIDInput },
	  "Finding Member"
	);
	// The member doesn't exist
	if (!("memberID" in foundMember)) return;
	  
	const payload = {
	  memberIDInput,
	  memberFirstNameInput,
	  memberLastNameInput,
	  memberEmailInput,
	  memberPhoneInput,
	};
	// Update the book
	sendRequest(requestUrls.updateMember, payload, "Updating Member");
  })
};

// Update functionality for "Manage Books" -- see updateBook.js
const updateBookBtn = document.getElementById("update-books-submit");
if (updateBookBtn) {
  updateBookBtn.addEventListener("click", async (e) => {
	e.preventDefault();
    const bookIDInput = document.getElementById("ub-book-id-prompt").value;
    const titleInput = document.getElementById("ub-title-prompt").value;
    const authorFirstNameInput = document.getElementById("ub-fname-prompt").value;
    const authorLastNameInput = document.getElementById("ub-lname-prompt").value;
    const genreInput = document.getElementById("ub-genre-prompt").value;

    // There must be a bookID
    if (bookIDInput.length === 0) return;

    // Does the book exist?
    let foundBook = await sendRequest(
      requestUrls.findBook,
      { bookIDInput },
      "Finding Book"
    );
    // The book doesn't exist
    if (!("bookID" in foundBook)) return;

    // Does the genre exist?
    let genreID;
    if (genreInput.length > 0) {
      // The genre field is not empty
      let foundGenre = await sendRequest(
        requestUrls.findGenre,
        { genreInput },
        "Finding Genre"
      );
      // The input in the genre field does not have a match
      if (!("genreID" in foundGenre)) {
        foundGenre = await sendRequest(
          requestUrls.findGenre,
          { genreInput },
          "Adding Genre"
        );
      }
      genreID = foundGenre.genreID;
    }

    // Does author exist?
    let authorID;
    if (authorFirstNameInput.length > 0 && authorLastNameInput.length > 0) {
      // The author fields are not empty
      let foundAuthor = await sendRequest(
        requestUrls.findAuthor,
        { authorFirstNameInput, authorLastNameInput },
        "Finding Author"
      );
      // The input in the author fields does not have a match
      if (!("authorID" in foundAuthor)) {
        foundAuthor = await sendRequest(
          requestUrls.addAuthor,
          { authorFirstNameInput, authorLastNameInput },
          "Adding Author"
        );
      }
      authorID = foundAuthor.authorID;
    }

    const payload = {
      bookIDInput,
      titleInput,
      authorID,
      genreID,
    };
    // Update the book
    sendRequest(requestUrls.updateBook, payload, "Updating Book");
  })
};

//const sortBooksBtn = document.getElementById("submit-sort");
if (document.getElementById("submit-sort")) {
  const sortBooksBtn = document.getElementById("submit-sort");
  sortBooksBtn.addEventListener("click", async (e) => {
    const criteria = document.getElementById("sort-field-book-1").value;
    if (criteria === 'none') return

    const payload = {
      criteria,
    }

    // Get sorted books
    const results = await sendRequest(requestUrls.sortBooks, payload, "Sorting Books");

    // Remove former books
    const centerSection = document.getElementById("search-main");
    const bookContainer = document.getElementById("books");
    centerSection.removeChild(bookContainer);

    // Add new books
    const newBookContainer = document.createElement("div");
    newBookContainer.id = "books";
    results.books.forEach((book) => {
      const bookEl = document.createElement("div");
      
      const title = document.createElement("div");
      title.textContent = book.title;
      title.className = "book-title";
    
      const detailContainer = document.createElement("div");
      detailContainer.className = "book-detail-container";
      const name = document.createElement("div");
      name.textContent = `${book.firstName} ${book.lastName}`
      const genre = document.createElement("div");
      genre.textContent = book.genreName;
      const bookID = document.createElement("div");
      bookID.textContent = book.bookID;

      detailContainer.appendChild(name);
      detailContainer.appendChild(genre);
      detailContainer.appendChild(bookID);
      bookEl.appendChild(title);
      bookEl.appendChild(detailContainer);
      newBookContainer.appendChild(bookEl);
    })
    centerSection.appendChild(newBookContainer);
  })
};

if (document.getElementById("submit-sort-orders")) {
const sortOrdersBtn = document.getElementById("submit-sort-orders");
sortOrdersBtn.addEventListener("click", async (e) => {
  const criteria = document.getElementById("sort-field-order-1").value;
  if (criteria === 'none') return

  const payload = {
    criteria,
  }

  // Get sorted books
  const results = await sendRequest(requestUrls.sortOrders, payload, "Sorting Orders");
  console.log(results);
  // Remove former members
  const centerSection = document.getElementById("search-main");
  const memberContainer = document.getElementById("members");
  centerSection.removeChild(memberContainer);

  // Add new members
  const newMemberContainer = document.createElement("div");
  newMemberContainer.id = "members";
  results.orders.forEach((order) => {
     if (newMemberContainer.children.length > 0 && newMemberContainer.lastChild.id == order.memberID) {
       // Append to checkout section of previous member section
       const previousMember = newMemberContainer.lastChild;
       const checkout = document.createElement("div");
       checkout.className = "order-detail-container";
       const checkoutTitle = document.createElement("div");
       checkoutTitle.textContent = `${order.title} (${order.bookID})`;
       const date = new Date(order.date);
       const dateEl = document.createElement("div");
       dateEl.textContent = `Checkout Date: ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
       const returned = document.createElement("div");
       returned.textContent = `Returned: ${order.returned}`;
       checkout.appendChild(checkoutTitle);
       checkout.appendChild(dateEl);
       checkout.appendChild(returned);
       previousMember.appendChild(checkout);
     } else {
       // Create new member section
       const member = document.createElement("div");
       member.id = order.memberID;
       const title = document.createElement("div");
       title.textContent = `${order.firstName} ${order.lastName} (${order.memberID})`;
       title.className = "order-title";
       const checkout = document.createElement("div");
       checkout.className = "order-detail-container";
       const checkoutTitle = document.createElement("div");
       checkoutTitle.textContent = `${order.title} (${order.bookID})`;
       const date = new Date(order.date);
       const dateEl = document.createElement("div");
       dateEl.textContent = `Checkout Date: ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
       const returned = document.createElement("div");
       returned.textContent = `Returned: ${order.returned}`;
       checkout.appendChild(checkoutTitle);
       checkout.appendChild(dateEl);
       checkout.appendChild(returned);
       member.appendChild(title);
       member.appendChild(checkout);
       newMemberContainer.appendChild(member);
     }
    });
     centerSection.appendChild(newMemberContainer);
});
}

//delete books
if (document.getElementById("rm-book-fields")) {
document.getElementById("rm-books-submit").onclick = function () {
	if (document.getElementById("rm-book-prompt").value) {
		var bookID = document.getElementById("rm-book-prompt").value;

		var currentURL = window.location.pathname;
		var requestURL = currentURL + '/deleteBook';

		var request = new XMLHttpRequest();
		request.open('POST', requestURL);

		var requestBody = JSON.stringify({bookID: bookID});
		request.setRequestHeader('Content-Type', 'application/json');

		request.addEventListener('load', function (event) {
			if (event.target.status === 200) {
				alert("Book has been deleted.");
				window.location = "/browse-catalog";
			}
			else {
				alert("There was an error.");
			}
		});

		request.send(requestBody);

	}
	else {
		alert("Book ID must be filled out");
	}
}
}
