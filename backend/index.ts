import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { existsSync, mkdirSync } from "fs";
import { loginRouter } from "./routes/loginRouter";
import { registerRouter } from "./routes/registerRouter";
import { historyModel } from "./models/history";
import { usersModel } from "./models/users";
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
  console.count(
    `url: ${req.url}  |   method: ${
      req.method
    }   |   date: ${new Date().toUTCString()}`
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
  socket.on("offline", (name) => {
    const changeUserData = usersModel.getUsersData().map((user) => {
      if (user.name === name) {
        return { ...user, active: false };
      }
      return user;
    });

    // change database using model
    usersModel.setUsersData(changeUserData);

    usersStatusArray(io);
  });
  socket.on("disconnect", () => {
    const changeUserData = usersModel.getUsersData().map((user) => {
      if (user.socketId === socket.id) {
        return { ...user, active: false };
      }
      return user;
    });

    // change database using model
    usersModel.setUsersData(changeUserData);

    usersStatusArray(io);
  });

  // listen for active users
  socket.on("active", (name) => {
    // change database using model
    const changeUserData = usersModel.getUsersData().map((user) => {
      if (user.name === name) {
        return { ...user, active: true, socketId: socket.id };
      }
      return user;
    });

    usersModel.setUsersData(changeUserData);

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
    const usersStatus: UsersStatus[] = usersModel.getUsersData().map((user) => {
      return {
        name: user.name,
        active: user.active,
      };
    });

    socketIo.sockets.emit("usersStatus", usersStatus);
  }
});
