import { createError } from "../error.js";
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notis = await Notification.find({
      salerId: req.user.id,
      status: { $in: [0, 1] },
    });
    const list = notis.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(list);
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};
export const getNotification = async (req, res, next) => {
  try {
    const noti = await Notification.findById(req.params.id);
    if (!noti) {
      return res.status(403).json("Không xác định được thông báo");
    }
    await Notification.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 1 } },
      { new: true }
    );
    res.status(200).json(noti);
  } catch (error) {
    next(createError(500, `Lỗi không xác định`));
  }
};
