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

if (document.getElementById("add-book-order")) {
document.getElementById("add-book-order").onclick = function() {
	// add another field to checkout a book

	var newField = Handlebars.templates.moaddbook();
	document.getElementById("mo-bookids-container").insertAdjacentHTML('beforeend', newField);

	document.getElementById("remove-book-order").onclick = function() {
		// remove field that user added previously
		var entry = event.target.parentElement.parentElement;
		entry.remove();
	}
}}

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
}}
