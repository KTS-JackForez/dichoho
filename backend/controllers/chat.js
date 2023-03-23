import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
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
  let chats = [];
  try {
    const chat = await Chat.find({
      members: { $in: [req.user.id] },
    });
    if (!chat) return res.status(403).json("Bạn chưa có tin nhắn nào");
    await Promise.all(
      chat.map(async (c) => {
        const m = await Message.find({ chatId: c._id });
        if (m) {
          chats.push(m);
        }
      })
    );
    res.status(200).json(chats);
  } catch (err) {
    next(err);
  }
};

export const getChat = async (req, res, next) => {
  const { shopId } = req.params;
  try {
    let chat = await Chat.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if (!chat) {
      chat = new Chat({
        members: [req.params.firstUserId, req.params.secondUserId],
      });
      await chat.save();
    }
    const messages = await Message.find({ chatId: chat._id });
    const shop = await User.findById(shopId).select(["displayName", "img"]);
    if (!shop) return res.status(403).json("Người dùng không khả dụng");
    res.status(200).json({
      messages,
      chatId: chat._id,
      shop,
    });
  } catch (err) {
    next(err);
  }
};
