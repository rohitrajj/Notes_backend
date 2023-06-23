import mongoose from "mongoose";

const schema= mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    description:{
        required:true,
        type:String,
    },
    tag:{
        type:String,
        default:"General"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

export const taskmodel=mongoose.model("task",schema)