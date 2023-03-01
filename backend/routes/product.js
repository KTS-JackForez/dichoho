import express from "express";
import {
  addLike,
  addTag,
  createProduct,
  deleteProduct,
  getMyProducts,
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

router.get("/", getProducts);
router.get("/my", verifyToken, getMyProducts);
router.get("/:id", getProduct);
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
