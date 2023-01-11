import express from "express";
import { signup, signin } from "../controllers/auth.js";
const router = express.Router();

// tạo mới tài khoản
router.post("/signup", signup);
// đăng nhập
router.post("/signin", signin);

export default router;
