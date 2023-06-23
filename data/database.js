import mongoose from "mongoose"

export const connectdb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"todo",
    }).then((c) => {
        console.log("Database Connected with "+c.connection.host)
    }).catch((err) => {
        console.log("Failed to connect Database")
    });
}