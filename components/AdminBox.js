"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { fetchAllContacts } from "@/actions/useractions";
import { MessageCircle, Loader2 } from "lucide-react";

const AdminInbox = () => {
  const { data: session, status } = useSession();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && isAdmin()) {
      loadContacts();
    } else {
      setLoading(false);
    }
  }, [session, status]);

  const isAdmin = () => {
    return session?.user?.email && adminEmails.includes(session.user.email);
  };

  const loadContacts = async () => {
    try {
      const data = await fetchAllContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusStyles = {
    unread: "bg-yellow-500 text-black",
    read: "bg-blue-500 text-white",
    resolved: "bg-green-500 text-white",
  };

  if (!isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404 - Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You do not have access to this page.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Inbox</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      ) : contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map(({ email, latestMessage, status }, index) => (
            <Link key={index} href={`/admin/chats/${email}`} className="block">
              <div className="flex items-center justify-between p-4 rounded-lg w-full
                bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-md cursor-pointer">
                
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                  <MessageCircle className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={32} />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold truncate">{email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {latestMessage?.content || "No messages yet"}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-4 py-1 text-sm font-semibold rounded-full 
                    ${statusStyles[status] || "bg-gray-600 text-white"}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-5">No conversations found.</p>
      )}
    </div>
  );
};

export default AdminInbox;
