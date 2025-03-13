"use client";
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY; // Ensure this is set

export default function PushNotifications() {
  const [showPopup, setShowPopup] = useState(false);
  const [permission, setPermission] = useState(() => {
    return typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "default";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.error("❌ Push notifications are not supported.");
      return;
    }

    if (permission === "default") {
      const timeout = setTimeout(() => {
        setShowPopup(true);
      }, 15000); // 15 seconds delay
  
      return () => clearTimeout(timeout);
    } else if (permission === "granted") {
      subscribeUser();
      setShowPopup(false);
    }
  }, [permission]);

  const subscribeUser = async () => {
    try {
      console.log("📌 Requesting service worker registration...");
      const registration = await navigator.serviceWorker.register("/service-worker.js");

      console.log("✅ Service Worker registered:", registration);

      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("📌 Existing subscription found:", existingSubscription);
        return;
      }

      console.log("📌 Requesting new subscription...");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });

      console.log("✅ New Subscription object:", subscription);

      // Send subscription to backend
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription), // Send the subscription object directly
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      console.log("📨 Server response:", responseData);

      if (response.ok) {
        alert("✅ Successfully subscribed!");
        setPermission("granted");
      } else {
        alert("❌ Failed to subscribe.");
      }
    } catch (error) {
      console.error("❌ Subscription failed:", error);
    }
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  return (
<>
  {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg text-center dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Stay Ahead with Instant Updates!
        </h2>
        <p className="mb-3 text-base font-medium text-gray-700 dark:text-gray-400">
          Get life-saving health alerts, expert medical tips, and urgent updates delivered to you instantly.
          Never miss an important health breakthrough again!
        </p>
        <button
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition-all"
          onClick={() => Notification.requestPermission().then(setPermission)}
        >
          Enable Now & Stay Safe ❤️
        </button>
      </div>
    </div>
  )}
</>

  );
}

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};
