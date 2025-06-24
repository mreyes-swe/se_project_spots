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

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handlePostFormSubmit(event) {
  event.preventDefault();
  console.log(newPostImageLinkInput.value);
  console.log(newPostCaptionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handlePostFormSubmit);
