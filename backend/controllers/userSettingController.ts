import { Request, Response } from "express";
import { join } from "path";

const showUserSetting = (req: Request, res: Response) => {
  res.sendFile(
    join(
      __dirname,
      "..",
      "..",
      "frontend",
      "src",
      "pages",
      "userSetting",
      "userSetting.html"
    )
  );
};

export { showUserSetting };
