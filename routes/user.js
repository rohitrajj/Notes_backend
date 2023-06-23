import express from "express"
// import { sendcookie } from "../utils/features"
import {  register,login,getmyProfile,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router()

router.post("/new", register)
router.post("/login", login)
router.get("/logout",logout)
router.get("/me",isAuthenticated,getmyProfile)



export default router