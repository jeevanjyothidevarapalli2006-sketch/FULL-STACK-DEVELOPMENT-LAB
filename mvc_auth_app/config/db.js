import mongoose from "mongoose";

const DEFAULT_MONGO_URL = "mongodb+srv://deepikaarugalla_db_user:CTwGuWP9yQWmDb3p@cluster0.wvbmzxj.mongodb.net";

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL || DEFAULT_MONGO_URL;
        await mongoose.connect(url, {
            dbName: process.env.DB_NAME || "authDB",
            serverSelectionTimeoutMS: 5000
        });

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDB;