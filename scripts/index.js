import { enableValidation, settings } from "./validation.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image-preview");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn-preview");

if (previewCloseBtn) {
  previewCloseBtn.addEventListener("click", () => closeModal(previewModal));
}
const handleEscClose = (event) => {
  if (event.key === "Escape") {
    const openModalEl = document.querySelector(".modal_is-open");
    if (openModalEl) {
      closeModal(openModalEl);
    }
  }
};
const handleOverlayClose = (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
};
const openModal = (modal) => {
  modal.classList.add("modal_is-open");

  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClose);
};
const closeModal = (modal) => {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handleOverlayClose);
};

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
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  if (previewModal) {
    cardImageEl.addEventListener("click", () => {
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
      openModal(previewModal);
    });
  }

  return cardElement;
};

const handleEditProfileOpen = () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileBio.textContent;
  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  openModal(editProfileModal);
};

const handleEditProfileClose = () => closeModal(editProfileModal);
const handleNewPostOpen = () => openModal(newPostModal);
const handleNewPostClose = () => closeModal(newPostModal);

const handleEditProfileSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileBio.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
};

const handleAddCardSubmit = (event) => {
  event.preventDefault();
  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  addCardFormElement.reset();
  disableBtn(cardSubmitBtn, settings);
  closeModal(newPostModal);
};

editProfileBtn.addEventListener("click", handleEditProfileOpen);
editProfileCloseBtn.addEventListener("click", handleEditProfileClose);
newPostBtn.addEventListener("click", handleNewPostOpen);
newPostCloseBtn.addEventListener("click", handleNewPostClose);
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(settings);
