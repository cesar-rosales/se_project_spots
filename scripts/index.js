function openModal(modal) {
  modal.classList.add("modal_is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}
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

// Event Handlers
function handleEditProfileOpen() {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileBio.textContent;
  openModal(editProfileModal);
}

function handleEditProfileClose() {
  closeModal(editProfileModal);
}

function handleNewPostOpen() {
  openModal(newPostModal);
}

function handleNewPostClose() {
  closeModal(newPostModal);
}

function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileBio.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  console.log("image: ", linkInput.value);
  console.log("caption: ", nameInput.value);
  closeModal(newPostModal);
  addCardFormElement.reset(); // clear inputs
}

editProfileBtn.addEventListener("click", handleEditProfileOpen);
editProfileCloseBtn.addEventListener("click", handleEditProfileClose);
newPostBtn.addEventListener("click", handleNewPostOpen);
newPostCloseBtn.addEventListener("click", handleNewPostClose);

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);
