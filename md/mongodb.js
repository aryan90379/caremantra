import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/caremantra"; // Use your connection string here.

let isConnected = false; // Track connection status.

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
