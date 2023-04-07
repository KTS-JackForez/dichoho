import User from "../models/User.js";
import Comment from "../models/Comment.js";
const lv1 = ["admin", "staff"];
export const create = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.status < 1)
      return res.status(404).json("User không khả dụng");
    const newComment = new Comment({
      ...req.body,
      createdById: req.user.id,
      createdByName: user.displayName || user.username,
    });
    await newComment.save();
    res.status(200).json("gửi nhận xét thành công");
  } catch (error) {
    next(error);
  }
};
export const getAll = async (req, res, next) => {
  try {
    if (!lv1.includes(req.user.role))
      return res
        .status(403)
        .json("Bạn không được cấp quyền thực hiện chức năng này");
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
export const getById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(403).json("Không tìm được nhận xét chỉ định");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
export const getByProductId = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      productId: req.params.productId,
      status: 1,
    });
    if (!comments)
      return res.status(403).json("Chưa có nhận xét nào về sản phẩm này");
    res.status(200).json(comments.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};
export const updateById = async (req, res, next) => {
  try {
    if (!lv1.includes(req.user.role) || req.user.id !== req.params.id)
      return res
        .status(403)
        .json("Bạn không được cấp quyền thực hiện chức năng này");
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json("Không tìm đưuọc bình luận chỉ định");
    await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
};
export const deleteById = async (req, res, next) => {
  try {
    if (!lv1.includes(req.user.role) || req.user.id !== req.params.id)
      return res
        .status(403)
        .json("Bạn không được cấp quyền thực hiện chức năng này");
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json("Không tìm đưuọc bình luận chỉ định");
    await Comment.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};
