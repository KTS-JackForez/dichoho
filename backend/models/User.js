import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    //tên đăng nhập
    username: {
      type: String,
      required: true,
      unique: true,
    },
    //tên hiển thị
    displayName: {
      type: String,
    },
    // email người dùng
    email: {
      type: String,
    },
    // mật khẩu người dùng
    password: {
      type: String,
      required: true,
    },
    //hình đại diện người dùng
    img: {
      type: String,
    },
    //số điện thoại người dùng
    phone: {
      type: String,
      required: true,
    },
    //loại người dùng
    // admin - staff - shipper - shop - user
    role: {
      type: String,
      default: "user",
    },
    //trạng thái của user: -1: xóa; 0-:bị khóa; 1: đang hoạt động
    status: {
      type: Number,
      default: 1,
    },
    //id của người tạo tài khoản (dùng cho staff/admin)
    parentUser: {
      type: String,
    },
    // địa chỉ: số nhà, tên đường
    address: {
      type: String,
    },
    // địa chỉ: mã tỉnh thành
    cityCode: {
      type: String,
    },
    // địa chỉ: tên tỉnh thành
    cityName: {
      type: String,
    },
    // địa chỉ: tên tỉnh thành đầy đủ
    cityFullName: {
      type: String,
    },
    // địa chỉ: mã quận huyện
    districtCode: {
      type: String,
    },
    //địa chỉ: tên quận huyện
    districtName: {
      type: String,
    },
    //địa chỉ: tên quận huyện đầy đủ
    districtFullName: {
      type: String,
    },
    //địa chỉ: mã phường xã
    wardCode: {
      type: String,
    }, //địa chỉ: tên phường xã
    wardName: {
      type: String,
    }, //địa chỉ: tên phường xã đầy đủ
    wardFullName: {
      type: String,
    },
    liked: [String],
    likedBy: [String],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
