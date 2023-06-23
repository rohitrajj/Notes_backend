import ErrorHandler from "../middlewares/errors.js"
import { taskmodel } from "../models/task.js"



export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        await taskmodel.create({
            title,
            description,
            user: req.user,
        })
        res.status(201).json({
            success: true,
            message: "Task Saved Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id
        const tasks = await taskmodel.find({ user: userid })
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { title, description, tag } = req.body
        const { id } = req.params
        let notes = await taskmodel.findById(id)
        if (!notes) {
            return res.json({
                success: false,
                message: "Task not exists"
            })
        }

        if (title) {
            notes.title = title
            await notes.save()

        }
        if (description) {
            notes.description = description
            await notes.save()

        }
        if (tag) {
            notes.tag = tag
            await notes.save()
        }

        res.json({
            success: true,
            message: "Task Updated"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await taskmodel.findById(id)
        if (!task) {
            return next(new ErrorHandler("ID not found", 404))
        }
        await task.deleteOne()

        res.status(200).json({
            success: true,
            message: "Task Deleted!"
        })
    } catch (error) {
        next(error)
    }
}