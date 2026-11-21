import mongoose from "mongoose";

const DEFAULT_MONGO_URI = "mongodb+srv://deepikaarugalla_db_user:CTwGuWP9yQWmDb3p@cluster0.wvbmzxj.mongodb.net";

const connectDB = async (mongoUri, dbName) => {
  try {
    const uri = mongoUri || process.env.MONGO_URI || process.env.MONGO_URL || DEFAULT_MONGO_URI;
    const db = dbName || process.env.DB_NAME || "productsDB";

    await mongoose.connect(uri, {
      dbName: db,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected to database: ${db}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
