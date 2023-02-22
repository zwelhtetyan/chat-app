import { Request, Response } from "express";
import { join } from "path";
import { users } from "../models/users";
import { v4 as uuidv4 } from "uuid";
import { writeFileSync } from "fs";

interface ResponseRegisterUser {
  status: "success" | "fail";
  message: string;
  redirectUrl?: string;
}

interface RequestRegisterUser {
  name: string;
  email: string;
  password: string;
}

const registerUser = (req: Request, res: Response) => {
  const { name, email, password }: RequestRegisterUser = req.body;

  if (password.length < 3) {
    const response: ResponseRegisterUser = {
      status: "fail",
      message: "password must have at least 3 or more characters",
    };
    return res.status(200).send(response);
  }

  const hasUser = users.some(
    (user) => user.name === name || user.email === email
  ); // check user exist

  if (hasUser) {
    const response: ResponseRegisterUser = {
      status: "fail",
      message: "username or email  already exist!",
    };
    return res.send(response);
  } else {
    users.push({ id: uuidv4(), name, email, password });
    writeFileSync(
      join(__dirname, "..", "database", "users.json"),
      JSON.stringify(users)
    );
    const response: ResponseRegisterUser = {
      status: "success",
      message: "registration successfully!",
      redirectUrl: "/login",
    };
    return res.status(200).send(response);
  }
};

const showRegister = (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(
      join(
        __dirname,
        "..",
        "..",
        "frontend",
        "src",
        "pages",
        "register",
        "register.html"
      )
    );
};

export { registerUser, showRegister };
