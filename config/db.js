import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database Connected Successfully!")
    
    } catch (error) {
        console.error("Database Connection Failed:", error.message)
    }
}

export default dbConnection;