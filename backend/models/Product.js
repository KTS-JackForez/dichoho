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
    // id của shop
    shopID: {
      type: String,
      required: true,
    },
    // tên shop
    shopName: {
      type: String,
      default: "Sale168.vn",
    },
    //thumbnail
    thumbnail: {
      type: String,
    },
    // ảnh chi tiết sản phẩm
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
    //số lượng bán ra
    outStock: {
      type: Number,
      default: 0,
    },
    // còn hàng / hết hàng
    available: {
      type: Boolean,
      default: true,
    },
    //Trạng thái bày bán sản phẩm:
    active: {
      type: Boolean,
      default: true,
    },
    // số lượt thích
    like: {
      type: Number,
      default: 0,
    },
    // danh sách người dùng đã thích
    likedBy: [String],
    // danh sách người dùng không thích
    dislikeBy: [String],
    // danh sách từ khóa có liên quan sản phẩm
    tags: [String],
    // danh mục
    cat: {
      type: String,
    },
    // id người cập nhật sản phẩm
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
