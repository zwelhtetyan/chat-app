import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface ChatHistory {
  id: number;
  userId: string;
  inputMessage: string;
  createdAt: string;
}

const getChatHistory = (): ChatHistory[] =>
  JSON.parse(
    readFileSync(join(__dirname, "..", "database", "history.json"), {
      encoding: "utf-8",
    })
  ) as ChatHistory[];

const setChatHistory = (chatHistory: ChatHistory[]) => {
  writeFileSync(
    join(__dirname, "..", "database", "history.json"),
    JSON.stringify(chatHistory)
  );
};

export const historyModel = {
  getChatHistory,
  setChatHistory,
};
