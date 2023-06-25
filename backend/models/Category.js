import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    //mã danh mục
    code: {
      type: String,
      required: true,
      unique: true,
    },
    // tên danh mục
    name: {
      type: String,
      required: true,
    },
    // trạng thái danh mục
    status: {
      type: Number,
      default: 1,
    },
    // user tạo danh mục
    createdBy: {
      type: String,
      required: true,
    },
    // user cập nhật danh mục
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
