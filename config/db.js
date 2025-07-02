import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI)
        console.log("Database Connected Successfully!")
        return mongoose.connection
    } catch (error) {
        console.error("Database Connection Failed:", error.message)
    }
}

export default dbConnection;