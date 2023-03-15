import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    //tên sản phẩm
    productName: {
      type: String,
      required: true,
    },
    //mô tả sản phẩm
    description: {
      type: String,
    },
    shopID: {
      type: String,
      required: true,
    },
    // ảnh sản phẩm
    imgs: [String],
    // giá niêm yết sản phẩm
    stockPrice: {
      type: Number,
      default: 0,
    },
    // giá bán sản phẩm
    currentPrice: {
      type: Number,
      default: 0,
    },
    // số lượng tồn kho
    inStock: {
      type: Number,
      default: true,
    },
    outStock: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    //Trạng thái sản phẩm:
    active: {
      type: Boolean,
      default: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    likedBy: [String],
    dislikeBy: [String],
    tags: [String],
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
