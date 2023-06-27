import express from "express";
import { userTool } from "../controllers/admin.js";

const router = express.Router();
router.get("/", userTool);
export default router;
