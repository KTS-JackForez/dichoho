import express from "express";
import {
  addLike,
  addTag,
  createProduct,
  deleteProduct,
  getProduct,
  getProductByTag,
  getProducts,
  removeTag,
  search,
  subLike,
  updatePrice,
  updateProduct,
} from "../controllers/product.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProduct);
router.get("/tags", verifyToken, getProductByTag);
router.get("/addlike", verifyToken, addLike);
router.get("/sublike", verifyToken, subLike);
router.get("/search", verifyToken, search);
router.put("/:id", verifyToken, updateProduct);
router.put("/:id", verifyToken, updatePrice);
router.post("/addtag", verifyToken, addTag);
router.post("/remove", verifyToken, removeTag);
router.post("/", verifyToken, createProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
