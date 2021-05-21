const memberIdField = document.getElementById("memberid-prompt");
const checkoutDateField = document.getElementById("checkoutdate-prompt");
const addOrderBtn = document.getElementById("submit-place-order");

const findMemberUrl = "/place-order/find-member";
const findBookUrl = "/place-order/find-book";
const addOrderUrl = "/place-order/add-order";

const sendReqAddOrder = async (url, payload, type) => {
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

const findBookIDs = async (bookIDInputs) => {
  bookIDInputs.forEach(async (bookID) => {
    const foundBook = await sendReqAddOrder(
      findBookUrl,
      { bookID },
      `Finding Book #${bookID}`
    );
    console.log(foundBook);
    if (!("bookID" in foundBook)) {
      foundBookIDs = false;
    } else {
      console.log(foundBook);
    }
  });
};

if (addOrderBtn) {
  addOrderBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const memberIDInput = memberIdField.value;
    const checkoutDateInput = checkoutDateField.value;

    // Get array of nonempty bookID values
    const bookIDFields = Array.from(
      document.getElementsByClassName("add-book-prompt")
    );
    const bookIDInputs = [];
    bookIDFields.forEach((field) => {
      if (field.value.length > 0) {
        bookIDInputs.push(field.value);
      }
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
    const foundMember = await sendReqAddOrder(
      findMemberUrl,
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
      const foundBook = await sendReqAddOrder(
        findBookUrl,
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
      await sendReqAddOrder(
        addOrderUrl,
        { memberIDInput, checkoutDateInput, bookID },
        `Adding Order for Book #${bookID}`
      );
    }
  });
}
