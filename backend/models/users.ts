import { readFileSync } from "fs";
import { join } from "path";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  socketId: string;
  userImg?: string;
}

export const users: UserInfo[] = JSON.parse(
  readFileSync(join(__dirname, "..", "database", "users.json"), {
    encoding: "utf-8",
  })
) as UserInfo[];
