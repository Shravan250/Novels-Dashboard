import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI =
    "mongodb+srv://Shravan:pass@novels.0oocrai.mongodb.net/novelsdb?retryWrites=true&w=majority&appName=Novels";
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
// process.env.MONGODB_URI
