import webPush from "web-push";

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY, // Public key for server-side
  privateKey: process.env.VAPID_PRIVATE_KEY, // Private key for server-side
};

webPush.setVapidDetails(
  "mailto:your-email@example.com", // Replace with your email
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default webPush;
