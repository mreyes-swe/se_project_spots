const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restraunt terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge over the forest",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain House",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

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

const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageLinkInput = newPostModal.querySelector(
  "#post-image-link-input"
);
const newPostCaptionInput = newPostModal.querySelector("#post-caption-input");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

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

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handlePostFormSubmit(event) {
  event.preventDefault();
  closeModal(newPostModal);
  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostImageLinkInput.value,
  };
  newPost = getCardElement(inputValues);
  postsList.prepend(newPost);
  newPostImageLinkInput.value = "";
  newPostCaptionInput.value = "";
}

function getCardElement(data) {
  let cardElement = postTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".post__caption");
  const cardImage = cardElement.querySelector(".post__image");
  const cardLikeButtonElement = cardElement.querySelector(".post__like-button");
  const cardDeleteButtonElement = cardElement.querySelector(
    ".post__delete-button"
  );
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardLikeButtonElement.addEventListener("click", () =>
    cardLikeButtonElement.classList.toggle("post__like-button_state_liked")
  );
  cardDeleteButtonElement.addEventListener("click", () => {
    cardElement.remove();
    cardElement = null;
  });
  cardImage.addEventListener("click", () => {
    previewPostImageElement.src = cardImage.src;
    previewPostImageElement.alt = cardTitle.textContent;
    previewPostCaptionElement.textContent = cardTitle.textContent;
    openModal(previewPostModal);
  });
  return cardElement;
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
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

initialCards.forEach(function (card) {
  const post = getCardElement(card);
  postsList.append(post);
});
