import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/caremantra"; // Use your connection string here.

let isConnected = false; // Track connection status.

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
