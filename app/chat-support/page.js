"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { fetchMessages, createConnection } from "@/actions/useractions";
import { Send } from "lucide-react";
import Head from "next/head";

const SkeletonLoader = () => (
  <div className="space-y-4">
    {Array(3).fill("").map((_, index) => (
      <div key={index} className={`w-3/4 h-12 bg-gray-700 rounded-lg ${index % 2 === 0 ? "ml-auto" : ""}`}></div>
    ))}
  </div>
);

const ContactChat = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (session?.user?.email) loadMessages();
  }, [session]);

  const loadMessages = useCallback(async () => {
    try {
      const contact = await fetchMessages(session.user.email);
      setMessages(contact?.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  }, [session]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);

    const tempMessage = {
      content: newMessage,
      sentBy: "user",
      sentAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      const updatedContact = await createConnection(session.user.email, newMessage, "user");
      setMessages(updatedContact.messages);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Head>
        <title>Contact Support - Chat with Us</title>
        <meta name="description" content="Chat with our support team in real time. Get help, ask questions, and receive quick responses." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="support chat, help desk, contact us, customer service, live chat" />
        <meta property="og:title" content="Contact Support - Chat with Us" />
        <meta property="og:description" content="Need help? Start a conversation with our support team now." />
        <meta property="og:url" content="https://caremantrahealth.com/chat-support" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://caremantrahealth.com/chat-support" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Support Chat",
            "url": "https://caremantrahealth.com/chat-support",
            "inLanguage": "en-US",
            "description": "Chat with our support team in real time. Get help, ask questions, and receive quick responses.",
            "author": {
              "@type": "Organization",
              "name": "Care Mantra Health",
              "url": "https://caremantrahealth.com"
            }
          })}
        </script>
      </Head>

      <div className="max-w-full mx-auto p-5 bg-gray-900 text-white shadow-xl rounded-lg flex flex-col h-[80vh] backdrop-blur-md bg-opacity-80 border border-gray-700">
        <h2 className="text-2xl font-bold mb-3 text-center">Support Chat</h2>

        <div className="flex-1 overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-inner">
          {messages === null ? (
            <SkeletonLoader />
          ) : messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.sentBy === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-3">
                  {msg.sentBy !== "user" && (
                    <img className="w-8 h-8 rounded-full shadow-md" src="https://cdn-icons-png.flaticon.com/512/560/560199.png" alt="Support" />
                  )}
                  <div className={`max-w-[320px] p-4 rounded-xl shadow-lg ${
                    msg.sentBy === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-60 block text-right mt-1">
                      {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <div className="flex items-center gap-3 mt-3 bg-gray-800 p-3 rounded-lg shadow-md">
          <textarea
            className="flex-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none resize-none placeholder-gray-400"
            rows="2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition duration-300 disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : <Send size={20} />}
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 mt-4">
          <p>By using this chat, you agree to our <a href="/terms-of-service" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </>
  );
};

export default ContactChat;
