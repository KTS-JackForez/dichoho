import Category from "../models/Category.js"

const permision = ["admin","staff"]

export const create = async(req,res,next)=>{
if(!permision.includes(req.user.role)){
    return res.status(403).json("Bạn không có quyền thực hiện chức năng này")
}
try {
    const newCat = new Category({
        ...req.body,createdBy:req.user.id
    })
    await newCat.save()
    res.status(200).json("tạo mới danh mục thành công")
} catch (error) {
    next(error)
}
}
export const getAll = async(req,res,next)=>{
    try {
        const cats = await Category.find()
        if(!cats) return res.status(403).json("Không có dữ liệu danh mục")
        res.status(200).json(cats)
    } catch (error) {
        next(error)
    }
}
export const getById = async (req,res,next)=>{
    try {
        const cat = await Category.findById(req.params.id)
        if(!cat) return res.status(403).json("Không tìm được danh mục chỉ định")
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}

export const updateById = async (req,res,next)=>{
    if(!permision.includes(req.user.role)){
        return res.status(403).json("Bạn không có quyền thực hiện chức năng này")
    }
    try {
        const cat = await Category.findByIdAndUpdate(req.params.id,{...req.body,updateById:req.user.id},{new:true})
        if(!cat) return res.status(403).json("Không tìm được danh mục chỉ định")
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}
export const deleteById = async (req,res,next)=>{
    if(req.user.role !=="admin"){
        return res.status(403).json("Bạn không có quyền thực hiện chức năng này")
    }
    try {
        const cat = await Category.findByIdAndDelete(req.params.id)
        if(!cat) return res.status(403).json("Không tìm được danh mục chỉ định")
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}