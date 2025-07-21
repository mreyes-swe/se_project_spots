const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  inactiveSaveButtonClass: "modal__save-button_state_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const checkInputListValidity = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSaveButton = (saveButtonElement, config) => {
  saveButtonElement.disabled = true;
  saveButtonElement.classList.add(config.inactiveSaveButtonClass);
};

const toggleSaveButtonState = (inputList, saveButtonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableSaveButton(saveButtonElement, config);
  } else {
    saveButtonElement.disabled = false;
    saveButtonElement.classList.remove(config.inactiveSaveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const saveButtonElement = formElement.querySelector(
    config.saveButtonSelector
  );

  toggleSaveButtonState(inputList, saveButtonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleSaveButtonState(inputList, saveButtonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);
