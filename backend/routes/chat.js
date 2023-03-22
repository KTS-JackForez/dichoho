import express from "express";
import { create, getAll, getChat } from "../controllers/chat.js";
const router = express.Router();
router.get("/", getAll);
router.get("/find/:firstUserId/:secondUserId", getChat);
router.post("/", create);

export default router;
