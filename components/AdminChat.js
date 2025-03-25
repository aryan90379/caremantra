"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchMessages, createConnection } from "@/actions/useractions";
import { Send, CheckCircle } from "lucide-react";
import Link from "next/link";

const AdminChat = () => {
  const { data: session, status } = useSession();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

  const pathname = usePathname();
  const email = pathname.split("/").pop();
  const formattedEmail = email?.replace(/\/$/, "");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [statusText, setStatusText] = useState("open");
  const chatEndRef = useRef(null);

  const isAdmin = () => {
    return session?.user?.email && adminEmails.includes(session.user.email);
  };

  useEffect(() => {
    if (formattedEmail && isAdmin()) loadMessages();
  }, [formattedEmail]);

  const loadMessages = useCallback(async () => {
    setLoadingMessages(true);
    try {
      const contact = await fetchMessages(formattedEmail, "admin");
      setMessages(contact?.messages || []);
      setStatusText(contact?.status || "open");
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  }, [formattedEmail]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);

    const tempMessage = {
      content: newMessage,
      sentBy: "admin",
      sentAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      const updatedContact = await createConnection(
        formattedEmail,
        newMessage,
        "admin"
      );
      setMessages(updatedContact.messages);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = async () => {
    try {
      await createConnection(
        formattedEmail,
        "Your query is marked as resolved. Let us know if you have further queries.",
        "admin",
        "resolved"
      );
      setStatusText("resolved");
    } catch (error) {
      console.error("Error resolving chat:", error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          404 - Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You do not have access to this page.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto flex flex-col h-[85vh] bg-gray-900 text-white shadow-lg rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-4 bg-gray-800 text-lg font-bold border-b border-gray-700 flex justify-between items-center">
        <span>Chat with {formattedEmail}</span>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-sm rounded-md ${
              statusText === "resolved" ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {statusText === "resolved" ? "Resolved" : "Open"}
          </span>
          {statusText !== "resolved" && (
            <button
              className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-md text-white hover:bg-green-700"
              onClick={markAsResolved}
            >
              <CheckCircle size={18} /> Resolve
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full"></div>
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sentBy === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-end gap-3">
                {msg.sentBy !== "admin" && (
                  <img
                    className="w-9 h-9 rounded-full shadow-md"
                    src="https://cdn-icons-png.flaticon.com/512/560/560199.png"
                    alt="User"
                  />
                )}
                <div
                  className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] p-3 rounded-xl text-sm shadow-md ${
                    msg.sentBy === "admin"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs opacity-50 block text-right mt-1">
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No messages yet.</p>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Message Input */}
      <div className="p-3 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
        <textarea
          className="flex-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none resize-none placeholder-gray-400 max-h-[100px] overflow-y-auto"
          rows="2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform active:scale-90 disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : <Send size={22} />}
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
