import express from "express"
import { create, deleteById, getAll, getById, updateById } from "../controllers/category.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

router.get("/",getAll)
router.get("/:id",getById)
router.put("/:id",verifyToken,updateById)
router.post("/",verifyToken,create)
router.delete(":id",verifyToken,deleteById)

export default router