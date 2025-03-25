import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ContactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      index: true, // Helps in searching messages by email
    },
    messages: {
      type: [
        {
          content: { type: String, required: true }, // Message text
          sentAt: { type: Date, default: Date.now }, // Time of message
          sentBy: { type: String, enum: ["user", "admin"], required: true }, // Who sent the message
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["unread", "read", "resolved"],
      default: "unread", // Helps in managing support tickets
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || model("Contact", ContactSchema);
