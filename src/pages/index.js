import {
  enableValidation,
  settings,
  checkInputListValidity,
  disableSaveButton,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import updateButtonLoadingText from "../utils/helper.js";

import goldenGateBridgeImage from "../images/7-photo-by-griffin-wooldridge-from-pexels.jpg";
import valThorensImage from "../images/1-photo-by-moritz-feldmann-from-pexels.jpg";
import restrauntTeraceImage from "../images/2-photo-by-ceiline-from-pexels.jpg";
import outdoorCafeImage from "../images/3-photo-by-tubanur-dogan-from-pexels.jpg";
import bridgeOverForestImage from "../images/4-photo-by-maurice-laschet-from-pexels.jpg";
import tunnelImage from "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg";
import mountainHouseImage from "../images/6-photo-by-moritz-feldmann-from-pexels.jpg";

// const initialCards = [
//   {
//     name: "Golden Gate bridge",
//     link: goldenGateBridgeImage,
//   },
//   {
//     name: "Val Thorens",
//     link: valThorensImage,
//   },
//   {
//     name: "Restraunt terrace",
//     link: restrauntTeraceImage,
//   },
//   {
//     name: "An outdoor cafe",
//     link: outdoorCafeImage,
//   },
//   {
//     name: "A very long bridge over the forest",
//     link: bridgeOverForestImage,
//   },
//   {
//     name: "Tunnel with morning light",
//     link: tunnelImage,
//   },
//   {
//     name: "Mountain House",
//     link: mountainHouseImage,
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1e89e1e7-0a7d-4437-ae8e-7a8c6bebe5a0",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      const post = getCardElement(card);
      postsList.append(post);
    });

    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileAvatarElement.src = userInfo.avatar;
  })
  .catch(console.error);

const editAvatarButton = document.querySelector(
  ".profile__edit-profile-avatar-button"
);
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseButton = editAvatarModal.querySelector(
  ".modal__close-button"
);
const editAvatarLinkInput = editAvatarModal.querySelector(
  "#profile-avatar-link-input"
);
const editAvatarSaveButton = editAvatarModal.querySelector(
  ".modal__save-button"
);
const editAvatarForm = editAvatarModal.querySelector(".modal__form");

const editProfileButton = document.querySelector(
  ".profile__edit-profile-button"
);
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileSaveButton = editProfileModal.querySelector(
  ".modal__save-button"
);

const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageLinkInput = newPostModal.querySelector(
  "#post-image-link-input"
);
const newPostCaptionInput = newPostModal.querySelector("#post-caption-input");
const newPostSaveButton = newPostModal.querySelector(".modal__save-button");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileAvatarElement = document.querySelector(".profile__avatar");

const postTemplate = document
  .querySelector("#post-template")
  .content.querySelector(".post");
const postsList = document.querySelector(".posts__grid");

const previewPostModal = document.querySelector("#preview-post-modal");
const previewPostImageElement =
  previewPostModal.querySelector(".modal__post-image");
const previewPostCaptionElement = previewPostModal.querySelector(
  ".modal__post-caption"
);
const previewPostCloseButton = previewPostModal.querySelector(
  ".modal__close-button"
);

const deletePostModal = document.querySelector("#delete-post-modal");
const deletePostCloseButton = deletePostModal.querySelector(
  ".modal__close-button"
);
const deletePostCancelButton = deletePostModal.querySelector(
  ".modal__cancel-button"
);
const deletePostForm = deletePostModal.querySelector(".modal__form");

let selectedCard, selectedCardId;

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  function cleanupModalEventListeners(modal) {
    modal.removeEventListener("mousedown", handleOverlayClick);
    document.removeEventListener("keydown", handleEscKeyPress);
  }

  function handleOverlayClick(event) {
    if (event.target === modal) {
      closeModal(modal);
      cleanupModalEventListeners(modal);
    }
  }

  function handleEscKeyPress(event) {
    if (event.key === "Escape") {
      closeModal(modal);
      cleanupModalEventListeners(modal);
    }
  }

  modal.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscKeyPress);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleAvatarFormSubmit(event) {
  event.preventDefault();

  const submitButton = event.submitter;
  updateButtonLoadingText(submitButton, true);

  api
    .editUserAvatar({ avatar: editAvatarLinkInput.value })
    .then((data) => {
      disableSaveButton(editAvatarSaveButton, settings);
      profileAvatarElement.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      updateButtonLoadingText(submitButton, false);
    });
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const submitButton = event.submitter;
  updateButtonLoadingText(submitButton, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      disableSaveButton(editProfileSaveButton, settings);
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      updateButtonLoadingText(submitButton, false);
    });
}

function handlePostFormSubmit(event) {
  event.preventDefault();

  const submitButton = event.submitter;
  updateButtonLoadingText(submitButton, true);

  api
    .addNewCard({
      name: newPostCaptionInput.value,
      link: newPostImageLinkInput.value,
    })
    .then((data) => {
      disableSaveButton(newPostSaveButton, settings);
      const newPost = getCardElement(data);
      postsList.prepend(newPost);
      newPostForm.reset();
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      updateButtonLoadingText(submitButton, false);
    });
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;

  openModal(deletePostModal);
}

function handleDeleteFormSubmit(event) {
  event.preventDefault();

  const submitButton = event.submitter;
  updateButtonLoadingText(submitButton, true);

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      closeModal(deletePostModal);
    })
    .catch(console.error)
    .finally(() => {
      updateButtonLoadingText(submitButton, false);
    });
}

function handleLikeButtonClick(event, data) {
  selectedCardId = data._id;
  const isLiked = data.isLiked;

  api
    .toggleLike(selectedCardId, isLiked)
    .then(() => {
      data.isLiked = !isLiked;
      event.target.classList.toggle(
        "post__like-button_state_liked",
        data.isLiked
      );
    })
    .catch(console.error);
}

function getCardElement(data) {
  let cardElement = postTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".post__caption");
  const cardImage = cardElement.querySelector(".post__image");
  const cardLikeButton = cardElement.querySelector(".post__like-button");
  const cardDeleteButton = cardElement.querySelector(".post__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  data.isLiked
    ? cardLikeButton.classList.add("post__like-button_state_liked")
    : cardLikeButton.classList.remove("post__like-button_state_liked");

  cardLikeButton.addEventListener("click", (event) =>
    handleLikeButtonClick(event, data)
  );
  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });
  cardImage.addEventListener("click", () => {
    previewPostImageElement.src = cardImage.src;
    previewPostImageElement.alt = cardTitle.textContent;
    previewPostCaptionElement.textContent = cardTitle.textContent;
    openModal(previewPostModal);
  });
  return cardElement;
}

editAvatarButton.addEventListener("click", () => {
  editAvatarLinkInput.value = profileAvatarElement.src;
  checkInputListValidity(editAvatarForm, settings);
  openModal(editAvatarModal);
});

editAvatarCloseButton.addEventListener("click", () => {
  closeModal(editAvatarModal);
});
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  checkInputListValidity(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handlePostFormSubmit);

previewPostCloseButton.addEventListener("click", () =>
  closeModal(previewPostModal)
);

deletePostCloseButton.addEventListener("click", () => {
  closeModal(deletePostModal);
});

deletePostCancelButton.addEventListener("click", () => {
  closeModal(deletePostModal);
});

deletePostForm.addEventListener("submit", handleDeleteFormSubmit);

enableValidation(settings);
