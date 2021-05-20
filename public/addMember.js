const firstNameField = document.getElementById("mm-first-name-prompt");
const lastNameField = document.getElementById("mm-last-name-prompt");
const emailField = document.getElementById("mm-email-prompt");
const phoneField = document.getElementById("mm-phone-prompt");
const addMemberBtn = document.getElementById("add-members-submit");

const addMemberUrl = "/manage-members/add";

const sendReqAddMember = async (payload) => {
  const response = await fetch(addMemberUrl, {
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
  if (response.status > 200) {
    console.error(`Something went wrong, status ${response.status}`);
  } else {
    console.log(`Request to add member received! Status ${response.status}`);
  }
};

if (addMemberBtn) {
  addMemberBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const firstNameInput = firstNameField.value;
    const lastNameInput = lastNameField.value;
    const emailInput = emailField.value;
    const phoneInput = phoneField.value;

    if (firstNameInput.length > 0 && lastNameInput.length > 0) {
      const payload = {
        firstNameInput,
        lastNameInput,
        emailInput,
        phoneInput,
      };
      sendReqAddMember(payload);
    } else {
      console.error("Missing first or last name!");
    }
  });
}
