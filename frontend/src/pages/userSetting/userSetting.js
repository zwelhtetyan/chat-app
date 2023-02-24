import { themeToggler, updateTheme } from "../../utils/theme.js";

// update theme

const themeTogglerBtn = document.querySelector(".theme-toggler-btn");
const ball = document.querySelector(".theme-toggler-ball");
const themText = document.querySelector(".theme-text");

(() => updateTheme(ball, themText))();

themeToggler(themeTogglerBtn, ball, themText);

// redirect to login

const logoutBtn = document.getElementById("logOutBtn");

logoutBtn.addEventListener("click", () => {
  if (confirm("Log out confirm")) {
    window.location.href = "/login";
  }
});
