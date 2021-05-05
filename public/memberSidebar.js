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
