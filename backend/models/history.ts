import { readFileSync } from "fs";
import { join } from "path";

export interface ChatHistory {
  id: number;
  userId: string;
  inputMessage: string;
  createdAt: string;
}

export const chatHistory: ChatHistory[] = JSON.parse(
  readFileSync(join(__dirname, "..", "database", "history.json"), {
    encoding: "utf-8",
  })
) as ChatHistory[];

/*
// example

[{"id":1,"userId":"xxx2","inputMessage":"Hello I'm Win","createdAt":"2023-02-20T07:58:27.214Z"}]

*/
