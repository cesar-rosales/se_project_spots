const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const nameInput = newPostModal.querySelector("#image-caption-input");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileBio.textContent;
  editProfileModal.classList.add("modal_is-open");
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
});

function handelEditProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileBio.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-open");
}

function handelAddCardSubmit(event) {
  event.preventDefault();
  console.log("image: ", linkInput.value);
  console.log("caption: ", nameInput.value);
}

editProfileForm.addEventListener("submit", handelEditProfileSubmit);
addCardFormElement.addEventListener("submit", handelAddCardSubmit);
