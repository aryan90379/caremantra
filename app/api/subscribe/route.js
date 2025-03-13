import { connectToDatabase } from "@/md/mongodb";
import Subscriber from "@/models/Subscriber";

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { endpoint, keys } = body;

        if (!endpoint || !keys || !keys.auth || !keys.p256dh) {
            return new Response(JSON.stringify({ error: "Invalid subscription data" }), { status: 400 });
        }

        // Save the subscriber if not already present
        await Subscriber.findOneAndUpdate(
            { endpoint }, // Find by endpoint
            { endpoint, keys }, // Update or insert new
            { upsert: true }
        );

        return new Response(JSON.stringify({ success: true, message: "Subscribed successfully!" }), { status: 200 });
    } catch (error) {
        console.error("Error subscribing:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
