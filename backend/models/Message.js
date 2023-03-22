import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    //-1: delete; 0-send; 1-reviced; 2 -seen
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
