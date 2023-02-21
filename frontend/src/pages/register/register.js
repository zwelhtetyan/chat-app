import {
  updateLabelOnBlur,
  updateLabelOnFocus,
} from "../../utils/watchInput.js";

const nameInput = document.querySelector(".nameInput");
const nameInputLabel = document.querySelector(".nameInput-label");

const emailInput = document.querySelector(".emailInput");
const emailInputLabel = document.querySelector(".emailInput-label");

const passwordInput = document.querySelector(".passwordInput");
const passwordInputLabel = document.querySelector(".passwordInput-label");

// update labels
updateLabelOnFocus(nameInput, nameInputLabel);
updateLabelOnBlur(nameInput, nameInputLabel);

updateLabelOnFocus(emailInput, emailInputLabel);
updateLabelOnBlur(emailInput, emailInputLabel);

updateLabelOnFocus(passwordInput, passwordInputLabel);
updateLabelOnBlur(passwordInput, passwordInputLabel);
