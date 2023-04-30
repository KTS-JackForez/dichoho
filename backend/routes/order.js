import express from "express";
import {
  cancel,
  createOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateById,
} from "../controllers/order.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);
router.post("/my", verifyToken, getMyOrders);
router.put("/:id", verifyToken, updateById);
router.put("/cancel/:id", verifyToken, cancel);

export default router;
