 import jwt from "jsonwebtoken"

export const sendcookie=(user,res,msg,statuscode)=>{
    const token= jwt.sign({_id:user._id},process.env.JWT_SECRET_CODE)
    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        maxAge: 15*60*1000,
        sameSite: process.env.NODE_ENV==="Development" ? "lax":"none",
        secure: process.env.NODE_ENV==="Development" ? false:true,
    }).json({
        success:true,
        message:msg
    })
}