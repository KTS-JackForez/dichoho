import express from "express";
import {
  deleteUser,
  dislike,
  getByPhone,
  getUser,
  getUsers,
  like,
  setUserStatus,
  updateUser,
  updateUserRole,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get một user
router.get("/:id", verifyToken, getUser);
//get nhiều user, áp dụng cho admin/staff
router.get("/", verifyToken, getUsers);
//get user theo số phone
router.get("/find/:phone", verifyToken, getByPhone);
//update thông tin user
router.put("/:id", verifyToken, updateUser);
router.put("/:id/status/:newstatus", verifyToken, setUserStatus);
router.put("/like/:productid", verifyToken, like);
router.put("/dislike/:productid", verifyToken, dislike);
//update quyền của user
router.post("/updaterole", verifyToken, updateUserRole);

//delete một user
router.delete("/:id", verifyToken, deleteUser);

export default router;
