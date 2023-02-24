import { themeToggler, updateTheme } from "../../utils/theme.js";

const themeTogglerBtn = document.querySelector(".theme-toggler-btn");
const ball = document.querySelector(".theme-toggler-ball");
const themText = document.querySelector(".theme-text");
const title = document.querySelector(".userSetting_title");

// update theme
(() => updateTheme(ball, themText))();

// theme toggler
themeToggler(themeTogglerBtn, ball, themText);

// update title
const updateTitle = () => {
  const { userName } = JSON.parse(localStorage.getItem("auth"));
  title.textContent = `User setting for @${userName}`;
};

updateTitle();
// redirect to login

const logoutBtn = document.getElementById("logOutBtn");

logoutBtn.addEventListener("click", () => {
  if (confirm("Log out confirm")) {
    window.location.href = "/login";
  }
});
