import { createError } from "../error.js";
import User from "../models/User.js";
const permission = ["admin", "staff"];
//get một user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(["-password"]);
    if (!user) {
      return res.status(404).json("Không tìm thấy thông tin người dùng");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
//get nhiều user, áp dụng cho admin/staff
export const getUsers = async (req, res, next) => {
  if (!permission.includes(req.user.role)) {
    // Chỉ user/staff mới được phép thực hiện chức năng này
    return res.status(403).json("Tham số truyền vào không đúng");
  }
  try {
    const users = await User.find().select(["-password"]);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
//get user theo số phone
export const getByPhone = async (req, res, next) => {
  if (!permission.includes(req.user.role)) {
    // Chỉ user/staff mới được phép thực hiện chức năng này
    return res
      .status(403)
      .json("Bạn không được cấp quyền thực hiện chức năng này");
  }
  try {
    const users = await User.find({ phone: req.params.phone }).select([
      "-password",
    ]);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
//update thông tin user
export const updateUser = async (req, res, next) => {
  if (!req.params.id === req.user.id && permission.includes(req.user.role)) {
    return next(
      createError(
        403,
        "Bạn chỉ được phép cập nhật thông tin tài khoản của mình"
      )
    );
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(403).json("Không tìm thấy thông tin user");
    } else {
      await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
    }
    res.status(200).json("Cập nhật thông tin tài khoản thành công");
  } catch (error) {
    next(error);
  }
};
//update quyền của user
export const updateUserRole = async (req, res, next) => {
  const role = process.env.ROLE;
  if (!role.includes(req.user.role) && req.body.new_role !== "admin") {
    return next(createError(403, "Tham số truyền lên không đúng"));
  }
  try {
    await User.findByIdAndUpdate(req.body.userID, {
      $set: { role: req.body.new_role },
    });
    res.status(200).json("Cập nhật quyền user thành công");
  } catch (error) {
    next(error);
  }
};
export const setUserStatus = async (req, res, next) => {
  console.log(req.params);
  const role = process.env.ROLE;
  const newStatus = req.params.newstatus;
  // if (!role.includes(req.user.role) && req.body.new_role !== "admin") {
  //   return next(createError(403, "Tham số truyền lên không đúng"));
  // }
  // try {
  //   await User.findByIdAndUpdate(req.params.id, {
  //     $set: { status: newStatus },
  //   });
  //   res.status(200).json("Cập nhật quyền user thành công");
  // } catch (error) {
  //   next(error);
  // }
};
// delete một user
export const deleteUser = async (req, res, next) => {
  if (!permission.includes(req.user.role)) {
    return next(
      createError(403, "Bạn không được phép thực hiện chức năng này")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User đã bị xóa");
  } catch (error) {
    next(error);
  }
};
