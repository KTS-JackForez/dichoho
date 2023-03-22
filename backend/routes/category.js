import express from "express"
import { create, deleteById, get, getAll, getById, updateById } from "../controllers/category.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

router.get("/",get)
router.get("/all",verifyToken,getAll)
router.get("/:id",getById)
router.put("/:id",verifyToken,updateById)
router.post("/",verifyToken,create)
router.delete(":id",verifyToken,deleteById)

export default router