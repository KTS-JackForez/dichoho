import express from "express";
import { signup, signin, login } from "../controllers/auth.js";
const router = express.Router();

// tạo mới tài khoản
router.post("/signup", signup);
// đăng nhập dành cho trang quản trị
router.post("/signin", signin);
//đăng nhập dành cho trang cá nhân
router.post("/login", login);

export default router;
