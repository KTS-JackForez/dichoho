import Config from "../models/Config.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Report from "../models/Report.js";
import User from "../models/User.js";

export const createReport = async (req, res, next) => {
  if (!["admin", "special"].includes(req.user.role)) {
    return res
      .status(403)
      .json("Bạn không được phép cấp quyền thực hiện chức năng này");
  } else {
    try {
      const vc = await Config.findOne();
      const totalproducts = await Product.find({});
      const totalusers = await User.find({
        role: "shop",
        status: { $in: [0, 1] },
      });
      const totalOrder = await Order.find();

      const sc = totalOrder.filter((e) => e.status === 2);
      const fail = totalOrder.length - sc.length;
      const value = sc.reduce((sum, i) => sum + i?.total, 0);
      const report = new Report({
        visitorsCount: vc?.visitorsCount,
        totalProducts: totalproducts.length,
        newProducts: totalproducts.length / 2,
        totalShop: totalusers.length,
        newShop: Math.round(totalusers.length / 2),
        totalOrders: totalOrder.length,
        successOrders: sc.length,
        failOrders: fail,
        successValue: value,
      });
      await report.save();
      res.status(200).json(report);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
