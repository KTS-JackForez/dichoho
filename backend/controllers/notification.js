import { createError } from "../error.js";
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notis = await Notification.find({
      salerId: req.user.id,
      status: { $in: [0, 1] },
    });
    res.status(200).json(notis);
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};
export const getNotification = async (req, res, next) => {
  console.log(req.params);
  try {
    const noti = await Notification.findById(req.params.id);
    res.status(200).json(noti);
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};
