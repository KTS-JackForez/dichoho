import Chat from "../models/Chat.js";

export const create = async (req, res, next) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
};

export const getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
};
