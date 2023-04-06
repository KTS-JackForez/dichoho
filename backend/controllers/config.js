import Config from "../models/Config.js";

export const updateConfig = async (req, res, next) => {
  try {
    await Config.findOneAndUpdate({
      $inc: { visitorsCount: 1 },
    });
    res.status(200);
  } catch (error) {
    next(error);
  }
};
