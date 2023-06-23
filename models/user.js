import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required:true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


export const usermodel = new mongoose.model("user", schema)  