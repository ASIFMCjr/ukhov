import express, { Request, Response, Router } from "express";
import path from "path";
import { ItemModel } from "../db/schemas";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(ItemModel.find().exec());
});
router.post("/", (req: Request, res: Response) => {
  res.json({
    who: "y",
  });
});
