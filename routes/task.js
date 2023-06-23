import express from "express"
import { newTask ,getMyTask, updateTask, deleteTask} from "../controllers/task.js"
import { isAuthenticated } from "../middlewares/auth.js"



const router=express.Router()

router.post("/new",isAuthenticated,newTask)
router.get( "/my",isAuthenticated,getMyTask)

// route is being used as we want to function for same domain
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router


