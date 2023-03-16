import express from "express";
import { createReport } from "../controllers/report.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createReport);

export default router;
