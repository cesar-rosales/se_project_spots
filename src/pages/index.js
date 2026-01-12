import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import { initialCards } from "../utils/constants.js";
import { openModal, closeModal } from "../components/modal.js";
import { getCardElement } from "../components/Card.js";

import "./index.css";

// ----- DOM: Preview modal -----
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image-preview");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn-preview");

// ----- DOM: Profile modal -----
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

// ----- DOM: New Post modal -----
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const nameInput = newPostModal.querySelector("#image-caption-input");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// ----- DOM: Profile display -----
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// ----- DOM: Cards -----
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");
const emptyStateEl = document.querySelector(".cards__empty");

// ----- Helpers -----
const updateEmptyState = () => {
  const hasCards = cardsList.querySelector(".card");
  emptyStateEl.classList.toggle("cards__empty_visible", !hasCards);
};

const handlePreviewOpen = (data) => {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewCaption.textContent = data.name;
  openModal(previewModal);
};

const renderCard = (cardData) => {
  const cardElement = getCardElement({
    data: cardData,
    cardTemplate,
    handleImageClick: handlePreviewOpen,
    handleDelete: updateEmptyState,
  });

  cardsList.prepend(cardElement);
};

// ----- Event handlers -----
const handleEditProfileOpen = () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileBio.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
};

const handleEditProfileSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileBio.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
};

const handleNewPostOpen = () => {
  resetValidation(addCardFormElement, settings);
  openModal(newPostModal);
};

const handleAddCardSubmit = (event) => {
  event.preventDefault();

  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  renderCard(cardData);

  addCardFormElement.reset();
  resetValidation(addCardFormElement, settings);
  updateEmptyState();
  closeModal(newPostModal);
};

// ----- Wire up listeners -----
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

editProfileBtn.addEventListener("click", handleEditProfileOpen);
editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPostBtn.addEventListener("click", handleNewPostOpen);
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// ----- Initial render (with a simple loading state) -----
cardsList.textContent = "Loading...";
cardsList.textContent = "";

initialCards.forEach(renderCard);
updateEmptyState();

enableValidation(settings);
