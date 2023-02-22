import {
  updateLabelOnBlur,
  updateLabelOnFocus,
} from "../../utils/watchInput.js";

const nameInput = document.querySelector(".nameInput");
const nameInputLabel = document.querySelector(".nameInput-label");

const passwordInput = document.querySelector(".passwordInput");
const passwordInputLabel = document.querySelector(".passwordInput-label");

// update labels
updateLabelOnFocus(nameInput, nameInputLabel);
updateLabelOnBlur(nameInput, nameInputLabel);

updateLabelOnFocus(passwordInput, passwordInputLabel);
updateLabelOnBlur(passwordInput, passwordInputLabel);
