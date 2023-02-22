import express from "express";
import { registerUser, showRegister } from "../controllers/registerController";

const registerRouter = express.Router();

registerRouter.get("/register", showRegister);
registerRouter.post("/registerUser", registerUser);

export { registerRouter };
