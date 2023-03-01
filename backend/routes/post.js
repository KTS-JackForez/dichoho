import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPostByProductId,
  getPosts,
} from "../controllers/post.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/product", getPostByProductId);
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, editPost);
router.get("/:id", verifyToken, deletePost);

export default router;
