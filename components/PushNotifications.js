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
  
    navigator.serviceWorker.ready
      .then(async (registration) => {
        const existingSubscription = await registration.pushManager.getSubscription();
  
        if (existingSubscription) {
          console.log("📌 User is already subscribed:", existingSubscription);
          setPermission("granted"); // Set permission as granted
          setShowPopup(false); // Don't show popup
        } else if (permission === "default") {
          const timeout = setTimeout(() => {
            setShowPopup(true);
          }, 15000); // 15 seconds delay
  
          return () => clearTimeout(timeout);
        }
      })
      .catch((error) => console.error("❌ Error checking subscription:", error));
  }, [permission]);
  

  const subscribeUser = async () => {
    try {
      console.log("📌 Requesting service worker registration...");
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );

      console.log("✅ Service Worker registered:", registration);

      const existingSubscription =
        await registration.pushManager.getSubscription();
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
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  return (
    <>
      {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
    <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 overflow-hidden relative">
      
      {/* Image */}
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Trusted Health Updates"
      />

      {/* Content */}
      <div className="p-6 text-center">
        <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white tracking-wide">
          Stay Ahead with Verified Health Insights
        </h2>
        <p className="mb-4 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Get timely updates on groundbreaking medical advancements, 
          expert-approved health tips, and emergency alerts. We ensure 
          accuracy so you can make informed decisions for you and your loved ones.
        </p>
        <button
          className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition-all"
          onClick={() =>
            Notification.requestPermission().then(setPermission)
          }
        >
          Enable Trusted Alerts
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
        onClick={() => setShowPopup(false)}
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  </div>
)}


    </>
  );
}


