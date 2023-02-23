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

const opLayerTag = document.getElementById("opLayer");

function openUsersMenu() {
  usersMenu.classList.remove("translate-x-full");
  usersMenuDth = !usersMenuDth;
  opLayerTag.classList.remove("hidden");
}
function closeUsersMenu() {
  usersMenu.classList.add("translate-x-full");
  usersMenuDth = !usersMenuDth;
  opLayerTag.classList.add("hidden");
}

/////////////// atuh session ////////////////
/// that fun will check is user login or not
(async () => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    window.location.href = "/login";
  } else {
    const { key } = JSON.parse(auth);

    const res = await fetch(`${window.location.origin}/checkKey`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ key }),
    });
    if (res.redirected) {
      window.location.href = res.url; // --> /login
    } else {
      const loadingTag = document.getElementById("loading");
      loadingTag.classList.add("hidden");
      const mainChatTag = document.getElementById("mainchat");
      mainChatTag.classList.remove("hidden");
    }
  }

  /**** please put SOCKET thing in down there.. ****/
  //////////////////

  // your code

  /////////////////
})();
