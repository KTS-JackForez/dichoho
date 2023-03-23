import express from "express";
import { create, getAll, getChat } from "../controllers/chat.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
router.get("/", verifyToken, getAll);
router.get("/find/:userId/:shopId", getChat);
router.post("/", create);

export default router;
