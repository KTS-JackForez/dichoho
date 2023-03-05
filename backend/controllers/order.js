import { createError } from "../error.js";
import Order from "../models/Order.js";
const permistion = ["admin", "staff"];
export const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({ ...req.body, buyerId: req.user.id });
    await newOrder.save();
    res.status(200).json("Tạo đơn hàng thành công");
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = permistion.includes(req.user.role)
      ? await Order.find()
      : await Order.find({ buyerId: req.user.id });
    if (!orders) {
      res.status(403).json("Không có dữ liệu đơn hàng nào");
    }
    res.status(200).json(orders);
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json("Không tìm được dữ liệu đơn hàng tương ứng");
    } else {
      if (permistion.includes(req.user.role) || order.buyerId !== req.user.id) {
        res.status(200).json(order);
      } else {
        return res
          .status(403)
          .json("Bạn không được cấp quyền thực hiện chức năng");
      }
    }
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};
