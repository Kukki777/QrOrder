import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;  // ✅ just the variable, no quotes with MONGO_URI=
    if (!url) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(url);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
  }
};

export default connectDB;
