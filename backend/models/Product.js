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
    },
    // giá bán sản phẩm
    currentPrice: {
      type: Number,
    },
    // số lượng tồn kho
    inStock: {
      type: Number,
    },
    outStock: {
      type: Number,
    },
    like: {
      type: Number,
    },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
