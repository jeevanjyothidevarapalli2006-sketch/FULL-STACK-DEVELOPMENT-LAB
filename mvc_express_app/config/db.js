import mongoose from "mongoose";

const DEFAULT_MONGO_URL = "mongodb+srv://deepikaarugalla_db_user:CTwGuWP9yQWmDb3p@cluster0.wvbmzxj.mongodb.net";

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL || DEFAULT_MONGO_URL;
        await mongoose.connect(url, {
            dbName: process.env.DB_NAME || "movieDB",
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

export default connectDB;