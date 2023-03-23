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
        const messages = await Message.find({ chatId: c._id });
        if (messages) {
          const lastMess = messages[messages.length - 1];
          if (lastMess) {
            const user = await User.findById(lastMess.sender);
            if (user) {
              chats.push({
                id: c._id,
                senderName: user.displayName || user.username,
                senderImg: user.img,
                senderId: user._id,
                text: lastMess.text,
                time: lastMess.createdAt,
                status: lastMess.status,
              });
            }
          }
        }
      })
    );
    res.status(200).json(chats.sort((a, b) => b.time - a.time));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getChat = async (req, res, next) => {
  const { shopId } = req.params;
  try {
    let chat = await Chat.findOne({
      members: { $all: [req.params.userId, req.params.shopId] },
    });
    if (!chat) {
      chat = new Chat({
        members: [req.params.userId, req.params.shopId],
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
