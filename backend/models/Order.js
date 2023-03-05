import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    //mã đơn hàng dùng để tra cứu
    orderNumber: {
      type: String,
      required: true,
    },
    //Id người mua
    buyerId: {
      type: String,
      required: true,
    },
    // Ghi chú của người mua
    note: {
      type: String,
    },
    // trạng thái đơn hàng: 0 - đơn mới; 1 - đang giao; 2 - giao xong; 3 - hủy
    status: {
      type: Number,
      default: 0,
    },
    // tổng giá trị đơn hàng
    total: {
      type: Number,
      default: 0,
    },
    //chi tiết sản phẩm
    products: [],
    // phương thức vận chuyển: 0 - tiêu chuẩn; 1 - nhanh
    shipMode: {
      type: Number,
      default: 0,
    },
    // phương thức thanh toán : cod/bank
    payment: {
      type: String,
      default: "cod",
    },
    // mã giao dịch (nếu có)
    payCode: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
