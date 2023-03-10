import express from "express";
import {
  getNotification,
  getNotifications,
} from "../controllers/notification.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.get("/:id", verifyToken, getNotification);

export default router;
