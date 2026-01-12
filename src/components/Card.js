// src/components/Card.js

export const getCardElement = ({
  data,
  cardTemplate,
  handleImageClick,
  handleDelete,
}) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
    if (typeof handleDelete === "function") {
      handleDelete();
    }
  });

  cardImageEl.addEventListener("click", () => {
    if (typeof handleImageClick === "function") {
      handleImageClick(data);
    }
  });

  return cardElement;
};
