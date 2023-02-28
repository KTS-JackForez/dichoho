import express from "express";
import { getPost, getPostByProductId, getPosts } from "../controllers/post.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/product", getPostByProductId);
router.post("/", verifyToken, getPostByProductId);
router.put("/:id", verifyToken, getPostByProductId);
router.get("/:id", verifyToken, getPostByProductId);

export default router;
