import { themeToggler, updateTheme } from "../../utils/theme.js";

const themeTogglerBtn = document.querySelector(".theme-toggler-btn");
const ball = document.querySelector(".theme-toggler-ball");
const themText = document.querySelector(".theme-text");
const title = document.querySelector(".userSetting_title");
const profileInput = document.querySelector(".profileInput");
const profileImage = document.querySelector(".profile_img");
const profileBtn = document.querySelector(".profile_button");

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

let FILE;

profileInput.addEventListener("change", () => {
  const file = profileInput.files[0];

  if (!file) return;

  const maxSize = 1 * 1024 * 1024;

  if (file.size > maxSize) {
    alert(`Please choose an image less than 1 mb`);
    return;
  }

  FILE = file;
  profileImage.src = URL.createObjectURL(file);
  profileBtn.textContent = "Update Profile";
});

profileBtn.addEventListener("click", async () => {
  if (profileBtn.innerText === "Edit Profile") return;

  const formData = new FormData();
  const { userId } = JSON.parse(localStorage.getItem("auth"));

  formData.append("profile_img", FILE);

  const res = await fetch(`${window.location.origin}/uploadProfile/${userId}`, {
    method: "POST",
    body: formData,
  });

  console.log(res.ok);

  const data = await res.json();

  const userInfo = JSON.parse(localStorage.getItem("auth"));
  const updatedUserInfo = { ...userInfo, userImg: data.url };
  localStorage.setItem("auth", JSON.stringify(updatedUserInfo));
});
