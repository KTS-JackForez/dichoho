import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(403).json("Tên đăng nhập đã có người sử dụng");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json("Đăng ký tài khoản thành công");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.name });
    if (!user) return res.status(404).json("Sai tên đăng nhập hoặc mật khẩu");
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass)
      return res.status(404).json("Sai tên đăng nhập hoặc mật khẩu");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "4h" }
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
  } catch (error) {
    next(error);
  }
};
