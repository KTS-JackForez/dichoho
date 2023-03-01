import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    //loại bài viết: true-bài viết thường; false-bài viết mô tả sản phẩm
    postType: {
      type: Boolean,
      required: true,
      default: true,
    },
    //Id của sản phẩm
    productId: {
      type: String,
    },
    // tác giả
    createdBy: {
      type: String,
      required: true,
    },
    //tiêu đề bài viết
    title: {
      type: String,
      required: true,
    },
    //giới thiệu ngắn gọn bài viết
    description: {
      type: String,
      required: true,
    },
    // nội dung bài viết
    content: {
      type: String,
      required: true,
    },
    //hình bìa bài viết
    thumbnail: {
      type: String,
    },
    //trạng thái bài viết: 0 - không xuất bản; 1 - đã xuất bản; 2 - đã xóa
    status: {
      type: Number,
      default: 0,
    },
    //số lần đọc bài viết
    read: {
      type: Number,
      default: 0,
    },
    // số lượt thích
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
