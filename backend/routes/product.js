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
  setStatus,
  subLike,
  updatePrice,
  updateProduct,
} from "../controllers/product.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//lấy toàn bộ sản phẩm
router.get("/", getProducts);
//lấy sản phẩm được tạo bởi user
router.get("/my", verifyToken, getMyProducts);
//lấy ra sản phẩm cụ thể theo id
router.get("/:id", getProduct);
//lấy ra sản phẩm the tags/categories
router.get("/tags", verifyToken, getProductByTag);
//thêm một like cho sản phẩm
router.get("/addlike", verifyToken, addLike);
//bớt một like cho sản phẩm
router.get("/sublike", verifyToken, subLike);
//tìm kiếm sản phẩm theo từ khóa
router.post("/search", search);
//cập nhật thông tin sản phẩm
router.put("/:id", verifyToken, updateProduct);
//cập nhật giá cho sản phẩm
router.put("/:id", verifyToken, updatePrice);
//thêm tag/category cho sản phẩm
router.post("/addtag", verifyToken, addTag);
//
router.post("/setavailable", verifyToken, setStatus);
//xóa tag/category cho sản phẩm
router.post("/remove", verifyToken, removeTag);
//tạo mới sản phẩm
router.post("/", verifyToken, createProduct);
//xóa sản phẩm
router.delete("/:id", verifyToken, deleteProduct);

export default router;
