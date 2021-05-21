if (document.getElementById("search-books-button")) {
document.getElementById("search-books-button").onclick = function() {
	// middle specific-search field for Browse page

	if (! document.getElementById("search-prompt").value) {
		alert("Nothing to search");
		return;
	}

	var searchquery = document.getElementById("search-prompt").value;
	var currentURL = window.location.pathname;
	var requestURL = currentURL + "/search?=" + searchquery;
	
	window.location = requestURL;
}}

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

		var currentURL = window.location.pathname;
		var requestURL = currentURL + "/sort?title=" + title + "?author=" + author + "?genre=" + genre + "?bookid=" + bookid;

		window.location = requestURL;
	}

	alert("Nothing to sort");
}}

if (document.getElementById("search-members-button")) {
document.getElementById("search-members-button").onclick = function() {
	// middle specific-search field for Orders page

	if (! document.getElementById("search-prompt").value) {
		alert("Nothing to search");
		return;
	}

	var searchquery = document.getElementById("search-prompt").value;
	var currentURL = window.location.pathname;
	var requestURL = currentURL + "/search?=" + searchquery;
	
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
*/

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
