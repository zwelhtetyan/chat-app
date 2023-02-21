import {
  updateLabelOnBlur,
  updateLabelOnFocus,
} from "../../utils/watchInput.js";

const nameInput = document.querySelector(".nameInput");
const nameInputLabel = document.querySelector(".nameInput-label");

updateLabelOnFocus(nameInput, nameInputLabel);
updateLabelOnBlur(nameInput, nameInputLabel);
