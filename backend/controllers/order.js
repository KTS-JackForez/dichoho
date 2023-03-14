import { createError } from "../error.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
const permistion = ["admin", "staff"];
export const createOrder = async (req, res, next) => {
  try {
    const orderNumber = new Date().getTime();
    const newOrder = new Order({
      ...req.body,
      buyerId: req.user.id,
      orderNumber,
    });
    await newOrder.save();
    Promise.all(
      req.body.products.map(async (i) => {
        const p = await Product.findByIdAndUpdate(i.id, {
          $inc: { outStock: i.quantity },
        });
      })
    );
    res
      .status(200)
      .json({ message: "Tạo đơn hàng thành công", data: orderNumber });
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
export const getMyOrders = async (req, res, next) => {
  let myOrders = [];
  try {
    const orders = permistion.includes(req.user.role)
      ? await Order.find()
      : await Order.find({ products: { $elemMatch: { shopID: req.user.id } } });
    if (!orders) {
      res.status(403).json("Không có dữ liệu đơn hàng nào");
    }
    orders.map((o) => {
      const products = o.products.filter((i) => i.shopID === req.user.id);
      const order = {
        ...o._doc,
        products,
      };
      myOrders.push(order);
    });
    const list = myOrders.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(list);
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
