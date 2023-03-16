import Config from "../models/Config.js";

export const updateConfig = async (req, res, next) => {
  try {
    await Config.findOneAndUpdate({
      $inc: { visitorsCount: 1 },
    });
  } catch (error) {
    next(error);
  }
};
