"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { fetchMessages, createConnection } from "@/actions/useractions";
import { Send } from "lucide-react";

const WavingDotsLoader = () => (
  <div className="flex items-center space-x-2">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-[wave_1.2s_infinite]"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-[wave_1.2s_infinite] [animation-delay:-0.2s]"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-[wave_1.2s_infinite] [animation-delay:-0.4s]"></span>
    <style>
      {`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}
    </style>
  </div>
);

const ContactChat = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
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

  if (status === "loading") {
    return (
      <div className="text-center py-4 text-gray-500">
        <WavingDotsLoader />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-semibold mb-4">Login to chat with us</h2>
        <button
          onClick={() => signIn("google")}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-5 bg-gray-900 text-white shadow-xl rounded-lg flex flex-col h-[80vh] backdrop-blur-md bg-opacity-80 border border-gray-700">
      <h2 className="text-2xl font-bold mb-3 text-center">Support Chat</h2>

      <div className="flex-1 overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-inner">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sentBy === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-end gap-3">
                {msg.sentBy !== "user" && (
                  <img className="w-8 h-8 rounded-full shadow-md" src="https://cdn-icons-png.flaticon.com/512/560/560199.png" alt="Support" />
                )}
                <div
                  className={`max-w-[320px] p-4 rounded-xl shadow-lg ${
                    msg.sentBy === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-xs opacity-60 block text-right mt-1">
                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
          {loading ? <WavingDotsLoader /> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ContactChat;
