import { usermodel } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendcookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/errors.js";


export const login=async(req,res,next)=>{
    try {
        const {email,password}= req.body
        const user= await usermodel.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorHandler("User Not Found",404))
        }
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return next(new ErrorHandler("Password Incorrect",400))
        }
        sendcookie(user,res,"Welcome back",200) 
    } catch (error) {
        next(error)
    }
}


export const register=async (req, res,next) => {
    try {
        const { name, email, password } = req.body
        let user = await usermodel.findOne({ email })
        if (user) {
            return next(new ErrorHandler("User already exists",400))
        }
        const hashpassword = await bcrypt.hash(password, 10)
        user = await usermodel.create({
            name,
            email,
            password: hashpassword,
        })
    
    
        sendcookie(user,res,"Registered Successfully",201)
    } catch (error) {
        next(error)
    }
}

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),       
        sameSite: process.env.NODE_ENV==="Development" ? "lax":"none",
        secure: process.env.NODE_ENV==="Development" ? false:true,
    }).json({
        success:true,
        message:"Successfully Logout"
    })
}

export const getmyProfile=(req,res)=>{
    
    res.status(200).json({
        success:true,
        user:req.user,
    })
}