import express from "express"
import {config} from "dotenv"
import userroute from "./routes/user.js"
import cookieParser from "cookie-parser"
import taskroute from "./routes/task.js"
import { errormiddleware } from "./middlewares/errors.js"
import cors from "cors"

export const app=express()
config({
    path:"./data/config.env"
})


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET", "POST", "DELETE", "PUT"],
    credentials:true
}))

app.use("/users",userroute)
app.use("/tasks",taskroute) 

//error middleware

app.use(errormiddleware)