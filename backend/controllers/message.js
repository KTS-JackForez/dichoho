import Message from "../models/Message.js";

export const create = async (req, res, next) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });
    if (!messages) return res.status(403).json("Bạn chưa có liên hệ nào!");
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
