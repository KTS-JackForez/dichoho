import express from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  getByProductId,
  updateById,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
router.get("/:id", getById);
router.get("/product/:productId", getByProductId);
router.put("/:id", verifyToken, updateById);
router.delete("/:id", verifyToken, deleteById);

export default router;
