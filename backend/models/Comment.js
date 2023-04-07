import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    //id sản phẩm
    productId: {
      type: String,
      required: true,
    },
    //tên sản phẩm
    productName: {
      type: String,
      required: true,
    },
    // điểm số đánh giá sản phẩm
    score: {
      type: Number,
      required: true,
    },
    //Nội dung nhận xét sản phẩm
    description: {
      type: String,
      required: true,
    },
    // Id user tạo comment
    createdById: {
      type: String,
      required: true,
    },
    // Name của user tạo comment
    createdByName: {
      type: String,
      required: true,
    },
    // ảnh bìa của user tạo comment
    createdByImg: {
      type: String,
    },
    // trạng thái comment: -1: đã xóa ; 0: bị khóa; 1: đang hoạt động
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
