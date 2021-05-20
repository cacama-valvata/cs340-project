const titleField = document.getElementById("ab-title-prompt");
const authorFirstNameField = document.getElementById("ab-fname-prompt");
const authorLastNameField = document.getElementById("ab-lname-prompt");
const genreField = document.getElementById("ab-genre-prompt");
const addBookBtn = document.getElementById("add-book-submit");

const findGenreUrl = "/manage-books/find-genre";
const addGenreUrl = "/manage-books/add-genre";
const findAuthorUrl = "/manage-books/find-author";
const addAuthorUrl = "/manage-books/add-author";
const addBookUrl = "/manage-books/add-book";

const sendReqAddBook = async (url, payload, type) => {
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

if (addBookBtn) {
  addBookBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const titleInput = titleField.value;
    const authorFirstNameInput = authorFirstNameField.value;
    const authorLastNameInput = authorLastNameField.value;
    const genreInput = genreField.value;
    const inputs = [
      titleInput,
      authorFirstNameInput,
      authorLastNameInput,
      genreInput,
    ];

    // All fields must be filled
    if (inputs.every((input) => input.length > 0)) {
      // Does genre exist?
      let foundGenre = await sendReqAddBook(
        findGenreUrl,
        { genreInput },
        "Finding Genre"
      );
      // Add genre
      if (!("genreID" in foundGenre)) {
        foundGenre = await sendReqAddBook(
          addGenreUrl,
          { genreInput },
          "Adding Genre"
        );
      }
      const { genreID } = foundGenre;

      // Does author exist?
      let foundAuthor = await sendReqAddBook(
        findAuthorUrl,
        { authorFirstNameInput, authorLastNameInput },
        "Finding Author"
      );
      // Add author
      if (!("authorID" in foundAuthor)) {
        foundAuthor = await sendReqAddBook(
          addAuthorUrl,
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
      sendReqAddBook(addBookUrl, payload, "Adding Book");
    } else {
      console.error("One of the fields is missing!");
    }
  });
}
