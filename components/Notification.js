"use client";
import React, { useEffect, useState } from "react";
import { fetchArticles, getSubscriberCount } from "@/actions/useractions";

const sendNotification = async (article, setLoading) => {
  try {
    setLoading((prev) => ({ ...prev, [article.id]: true }));

    const notification = {
      title: article.title,
      message: `New article published: ${article.title}`,
      url: `${process.env.NEXT_PUBLIC_URL}/blogs/${article.slug}`,
      image: article.thumbnail,
    };

    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notifications: [notification] }),
    });

    const responseData = await response.json();
    setLoading((prev) => ({ ...prev, [article.id]: false }));

    if (response.ok) {
      alert(`✅ Notification sent for "${article.title}"!`);
    } else {
      alert(`Failed to send notification: ${responseData.error || "Unknown error"}`);
    }
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    alert("An error occurred while sending the notification.");
    setLoading((prev) => ({ ...prev, [article.id]: false }));
  }
};

export default function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState({});
  const [subscriberCount, setSubscriberCount] = useState(0);
  const currentTime = new Date();

  useEffect(() => {
    getData();
    fetchSubscriberCount();
  }, []);

  const getData = async () => {
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error("❌ Error fetching articles:", error);
    }
  };

  const fetchSubscriberCount = async () => {
    try {
      const count = await getSubscriberCount();
      setSubscriberCount(count);
    } catch (error) {
      console.error("❌ Error fetching subscriber count:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <h2 className="text-lg font-semibold text-gray-600 mt-2">
        Subscribers: <span className="text-blue-600 font-bold">{subscriberCount}</span>
      </h2>

      <h2 className="text-lg font-semibold text-gray-600 mt-4">Articles List:</h2>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.filter((article) => {
                  const publishedAt = new Date(article.publishedAt);
                  return (
                    article.status === "published" && publishedAt < currentTime
                  );
                })
                .sort(
                  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                ).map((article) => (
          <li
            key={article.id}
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <span className="text-gray-700 font-medium text-center">{article.title}</span>
            <button
              onClick={() => sendNotification(article, setLoading)}
              className={`mt-3 w-full px-4 py-2 rounded-lg shadow-md text-white transition 
                ${loading[article.id] ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading[article.id]}
            >
              {loading[article.id] ? "Sending..." : "Send Notification"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
