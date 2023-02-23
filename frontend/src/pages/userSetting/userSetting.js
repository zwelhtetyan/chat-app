import { themeToggler, updateTheme } from "../../utils/theme.js";

// update theme

const themeTogglerBtn = document.querySelector(".theme-toggler-btn");
const ball = document.querySelector(".theme-toggler-ball");
const themText = document.querySelector(".theme-text");

(() => updateTheme(ball, themText))();

themeToggler(themeTogglerBtn, ball, themText);
