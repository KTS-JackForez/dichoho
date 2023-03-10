import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    //id người gửi
    buyerId: {
      type: String,
      required: true,
    },
    //Id người bán
    salerId: {
      type: String,
      required: true,
    },
    // tiêu đề
    title: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
    // nội dung đầy đủ của tin nhắn
    desc: {
      type: String,
      required: true,
    },
    // trạng thái tin nhắn: 0 - chưa đọc; 1 - đã đọc; 2 - đã xóa
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
