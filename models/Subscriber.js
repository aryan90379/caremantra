import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
    endpoint: { type: String, required: true, unique: true },
    keys: {
        auth: { type: String, required: true },
        p256dh: { type: String, required: true }
    },
    subscribedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
