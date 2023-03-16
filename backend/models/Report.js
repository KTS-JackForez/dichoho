import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    //loại bài viết: true-bài viết thường; false-bài viết mô tả sản phẩm
    visitorsCount: {
      type: Number,
      default: 0,
    },
    //Id của sản phẩm
    totalProducts: {
      type: Number,
      default: 0,
    },
    // id tác giả
    newProducts: {
      type: Number,
      default: 0,
    },
    totalShop: {
      type: Number,
      default: 0,
    },
    newShop: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    successOrders: {
      type: Number,
      default: 0,
    },
    failOrders: {
      type: Number,
      default: 0,
    },
    successValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
