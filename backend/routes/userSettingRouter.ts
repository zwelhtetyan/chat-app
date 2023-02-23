import express from "express";
import { showUserSetting } from "../controllers/userSettingController";

const userSettingRouter = express.Router();

userSettingRouter.get("/setting", showUserSetting);

export { userSettingRouter };
