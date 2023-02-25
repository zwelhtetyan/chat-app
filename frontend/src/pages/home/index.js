// users Menu open and close

import { updateTheme } from "../../utils/theme.js";

const usersButton = document.getElementById("usersBtn");
const settingButton = document.getElementById("settingBtn");
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

// go to user setting
settingButton.addEventListener("click", () => {
  window.location.href = "/setting";
});

// function for open and close usersMenu

const opLayerTag = document.getElementById("opLayer");
const rightSideTag = document.getElementById("rightSide");

function openUsersMenu() {
  usersMenu.classList.remove("translate-x-full");
  usersMenuDth = !usersMenuDth;
  opLayerTag.classList.remove("hidden");
  rightSideTag.classList.remove("-z-50");
  rightSideTag.classList.add("z-50");
}
function closeUsersMenu() {
  usersMenu.classList.add("translate-x-full");
  usersMenuDth = !usersMenuDth;
  opLayerTag.classList.add("hidden");
  rightSideTag.classList.remove("z-50");
  rightSideTag.classList.add("-z-50");
}

// debounce function
function debounce(cb, delay = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const typingContainerTag = document.getElementById("typingContainer");

const updateDebounceTypeDiv = debounce(() => {
  typingContainerTag.innerHTML = "";
}, 3000);

/////////////// atuh session ////////////////
/// that fun will check is user login or not
(async () => {
  updateTheme();

  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth) {
    window.location.href = "/login";
  } else {
    const { key } = auth;

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
  const socket = io("/");
  const msgsDivInner = document.getElementById("messagesDiv_inner");
  const inputMsg = document.getElementById("inputMessage");
  const sendBtn = document.getElementById("sendMessage");
  const bottomLayer = document.querySelector(".bottom_layer");
  const { userName, userImg } = auth;

  socket.on("connect", () => {
    socket.emit("active", userName);
    console.log(socket.connected);
  });

  socket.on("disconnect", () => {
    socket.emit("offline", userName);
  });

  inputMsg.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      if (inputMsg.value.trim() === "") return;

      const data = {
        message: inputMsg.value,
        userName: userName,
        userImg,
      };
      socket.emit("chat", data);
      inputMsg.value = "";
    }
  });

  sendBtn.addEventListener("click", () => {
    if (inputMsg.value.trim() === "") return;

    const data = {
      message: inputMsg.value,
      userName: userName,
      userImg,
    };
    socket.emit("chat", data);
    inputMsg.value = "";
  });

  inputMsg.addEventListener("keypress", () => {
    socket.emit("typing", userName);
  });

  socket.on("resData", (data) => {
    const oneMsgDiv = `
    <div class="my-4">
      <div class="flex items-start">
        <div
          class="w-12 h-12 rounded-full overflow-hidden"
        >
          <img
            src=${data.userImg}
            alt=""
            class='w-full h-full object-cover'
          />
        </div>

        <div class="flex-1 ml-2">
          <h2 class="font-bold text-lg leading-6">${data.userName}</h2>
          <p>${data.message}</p>
        </div>
      </div>
    </div>
    `;
    msgsDivInner.innerHTML += oneMsgDiv;
    bottomLayer.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // <div class="my-3">
  //     <!-- name and date -->
  //     <div class="flex space-x-2.5 items-baseline">
  //       <p class="font-medium">${data.userName}</p>
  //     </div>
  //     <!-- message -->
  //     <p class="ml-5">${data.message}</p>
  //   </div>

  socket.on("typingPs", (name) => {
    typingContainerTag.innerHTML = `
    <div class="flex space-x-1">
      <div
        class="animate-fC w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"
      ></div>
      <div
        class="animate-sC w-[10px] h-[10px] rounded-full bg-[#C7C5C5]"
      ></div>
      <div
        class="animate-tC w-[10px] h-[10px] rounded-full bg-[#A6A6A6]"
      ></div>
      </div>
      <p class="text-[#A6A6A6] text-sm">
        <span class="font-medium text-[#A6A6A6] text-sm">${name}</span>
        is typing
      </p>
    </div>
    `;
    updateDebounceTypeDiv();
  });

  socket.on("usersStatus", (usersStatus) => {
    showUsersStatus(usersStatus);
  });

  function showUsersStatus(usersStatus) {
    // show active people
    const onPpl = usersStatus.filter((user) => {
      return user.active === true;
    });
    const onPplParentTag = document.getElementById("onPplParent");

    onPplParentTag.innerHTML = "";
    onPpl.forEach((person) => {
      const onPplDiv = `<div class="flex items-center justify-between my-2">
                          <p>${person.name}</p>
                          <iconify-icon
                            icon="pajamas:status-active"
                            style="color: #04bf00"
                            width="12"
                            height="12"
                          ></iconify-icon>
                        </div>
                        `;
      onPplParentTag.innerHTML += onPplDiv;
    });

    // show offline people
    const offPpl = usersStatus.filter((user) => {
      return user.active === false;
    });
    const offPplParentTag = document.getElementById("offPplParent");

    offPplParentTag.innerHTML = "";
    offPpl.forEach((person) => {
      const offPplDiv = `<div class="flex items-center justify-between my-2">
                          <p>${person.name}</p>
                          <iconify-icon
                            icon="pajamas:status-active"
                            style="color: #a6a6a6"
                            width="12"
                            height="12"
                          ></iconify-icon>
                        </div>
                        `;
      offPplParentTag.innerHTML += offPplDiv;
    });
  }

  /////////////////
})();
