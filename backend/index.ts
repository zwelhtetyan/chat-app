import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { existsSync, mkdirSync } from "fs";
import { loginRouter } from "./routes/loginRouter";
import { registerRouter } from "./routes/registerRouter";
import { chatHistory } from "./models/history";
import usersData from "./database/users.json";
import { homeRouter } from "./routes/homeRouter";
import { userSettingRouter } from "./routes/userSettingRouter";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

if (!existsSync("./assets")) {
  mkdirSync("assets");
}

app.use(express.static("../frontend/src"));
app.use(express.static("assets"));
app.use((req, res, next) => {
  console.log(
    `
    req url: ${req.url}, 
    req method: ${req.method}, 
    req date: ${new Date().toUTCString()}`
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  return res.redirect("/chat");
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
    if (activeUser[0]) {
      activeUser[0].active = true;
      activeUser[0].socketId = socket.id;
    }

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
  }
});
