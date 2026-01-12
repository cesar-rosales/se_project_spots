// src/components/modal.js

const handleEscClose = (event) => {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

const handleOverlayClose = (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
};

export const openModal = (modal) => {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClose);
};

export const closeModal = (modal) => {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handleOverlayClose);
};
