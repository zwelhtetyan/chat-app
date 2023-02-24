import express, { Request, Response } from "express";
import { join } from "path";
import { Server, Socket } from "socket.io";
import { readFileSync, writeFileSync } from "fs";
import { loginRouter } from "./routes/loginRouter";
import { registerRouter } from "./routes/registerRouter";
import { chatHistory } from "./models/history";
import usersData from "./database/users.json";
// import { users } from "./models/users";
import { homeRouter } from "./routes/homeRouter";
import { userSettingRouter } from "./routes/userSettingRouter";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use(express.static("../frontend/src"));

app.get("/", (req: Request, res: Response) => {
  return res.redirect("/home");
});

app.use(homeRouter);

app.use(loginRouter);

app.use(registerRouter);

app.use(userSettingRouter);

const server = app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT, "http://localhost:" + PORT);
});

/////////// SOCKECT THINGS /////////////////

/// it just tesing, you can delete it

let status: { socketId: string; name: string }[] = [];

const io = new Server(server);

io.on("connection", (socket: Socket) => {
  // listen for offline users
  socket.on("disconnect", () => {
    const offlineUser = usersData.filter((user) => {
      return user.socketId === socket.id;
    });
    console.log(offlineUser);
    if (offlineUser[0]) {
      offlineUser[0].active = false;
    }
    usersStatusArray(io);
  });

  // listen for active users
  socket.on("active", (name) => {
    const activeUser = usersData.filter((user) => {
      return user.name === name;
    });
    activeUser[0].active = true;
    activeUser[0].socketId = socket.id;
    console.log("user's socket id", activeUser[0].socketId);
    usersStatusArray(io);
  });

  // listen for message
  socket.on("chat", (data) => {
    io.sockets.emit("resData", data);
  });

  // listen for typing
  socket.on("typing", (name) => {
    socket.broadcast.emit("typingPs", name);
  });

  interface UsersStatus {
    name: string;
    active: boolean;
  }

  // functions

  // functions for users's status update
  function usersStatusArray(socketIo: Server) {
    const usersStatus: UsersStatus[] = usersData.map((user) => {
      return {
        name: user.name,
        active: user.active,
      };
    });
    socketIo.sockets.emit("usersStatus", usersStatus);
    console.log(usersStatus);
  }
});

// const io = new Server(server);

// io.on("connection", (socket) => {
//   const socketId = socket.id;
//   socket.on("online", (data) => {
//     status.push({ socketId, name: data });
//     console.log(status);

//     let ol: any = [];
//     status.forEach((st) => {
//       ol.push(st.name);
//     });

//     socket.emit("online", ol);
//   });

//   socket.on("sendMessage", ({ userId, inputMessage }) => {
//     const id = chatHistory.length + 1;
//     const createdAt = new Date().toISOString();

//     chatHistory.push({ id, userId, inputMessage, createdAt });

//     writeFileSync(
//       join(__dirname, "database", "history.json"),
//       JSON.stringify(chatHistory)
//     );

//     const { name } = { ...users.find((user) => user.id === userId) };
//     io.sockets.emit("sendMessage", { inputMessage, name: name });
//   });

//   socket.on("disconnect", () => {
//     const st = status.find((st) => st.socketId === socketId);
//     status = status.filter((st) => st.socketId !== socketId);
//     console.log(status);
//     io.sockets.emit("offline", st?.name);
//   });
// });
