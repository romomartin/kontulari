import express, { Request, Response } from "express";

export const api = express();

api.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Kontulari accounts API" });
});
