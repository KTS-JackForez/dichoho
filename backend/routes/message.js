import express from "express";
import { create, get } from "../controllers/message.js";
const router = express.Router();

router.get("/:chatId", get);
router.post("/", create);

export default router;
