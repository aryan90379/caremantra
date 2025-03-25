import AdminInbox from "@/components/AdminBox";
import AdminChat from "@/components/AdminChat";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex w-1/3 md:w-1/3 border-r border-gray-700 bg-gray-900">
        <AdminInbox />
      </div>

      {/* Chat Section (Always visible on mobile, takes 2/3 on larger screens) */}
      <div className="w-full md:w-2/3 h-screen bg-gray-800">
        <AdminChat />
      </div>
    </div>
  );
};

export default Page;
