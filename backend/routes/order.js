import express from "express";
import { createOrder, getOrder, getOrders } from "../controllers/order.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);

export default router;
