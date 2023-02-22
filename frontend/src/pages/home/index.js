// users Menu open and close

const usersButton = document.getElementById("usersBtn");
const usersMenu = document.getElementById("usersMenu");

let usersMenuDth = false;

// listen for click to open or close users menu and function

usersButton.addEventListener("click", () => {
  if (usersMenuDth) {
    closeUsersMenu();
  } else if (!usersMenuDth) {
    openUsersMenu();
  }
});

let touchstartX = 0;
let touchendX = 0;

// function for touch direction to close or open users menu

function checkDirection() {
  if (touchstartX - touchendX > 70) {
    openUsersMenu();
    // setSlide(true);
  } else if (touchstartX - touchendX < -70) {
    closeUsersMenu();
    // setSlide(false);
  }
}

// function for screen touch to open and close to users menu

document.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});

// function for open and close usersMenu

function openUsersMenu() {
  usersMenu.classList.remove("translate-x-full");
  usersMenuDth = !usersMenuDth;
}
function closeUsersMenu() {
  usersMenu.classList.add("translate-x-full");
  usersMenuDth = !usersMenuDth;
}
