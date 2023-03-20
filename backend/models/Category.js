import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    code:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    createdBy:{
        type:String,
        required:true,
    },
    updatedBy:{
        type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
