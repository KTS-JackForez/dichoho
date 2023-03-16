import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema(
  {
    visitorsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Config", ConfigSchema);
