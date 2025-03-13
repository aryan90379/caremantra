import webPush from "@/utils/webPush";
import { connectToDatabase } from "@/md/mongodb";
import Subscriber from "@/models/Subscriber";
import Notification from "@/models/Notification";

export async function POST(req) {
    try {
        await connectToDatabase(); // Ensure DB connection

        const body = await req.json();
        const { notifications } = body;

        if (!notifications || notifications.length === 0) {
            return new Response(JSON.stringify({ error: "Missing notifications array" }), { status: 400 });
        }

        const subscribers = await Subscriber.find(); // Fetch all subscribers

        if (subscribers.length === 0) {
            return new Response(JSON.stringify({ error: "No subscribers found" }), { status: 400 });
        }

        for (const notification of notifications) {
            const { title, message, url,image } = notification;

            // Save notification in DB
            await Notification.create({ title, message, url,image });

            // Send push notifications to all subscribers
            for (const subscriber of subscribers) {
                const payload = JSON.stringify({ title, message, url,image });
                
                try {
                    await webPush.sendNotification(subscriber, payload);
                } catch (error) {
                    console.error("Push notification failed for:", subscriber.endpoint, error);
                }
            }
        }

        return new Response(JSON.stringify({ success: true, message: "Notifications stored and sent!" }), { status: 200 });
    } catch (error) {
        console.error("Push notification error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
