import express from "express";
import { getNotification } from "../controllers/notification.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getNotification);

export default router;
