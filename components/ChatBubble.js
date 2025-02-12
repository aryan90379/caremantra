"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteCommentById } from "@/actions/useractions";
import EditMessage from "./Editmessage";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ChatBubble = ({
  name = "Anonymous",
  parentID = null,
  replied = false,
  childID = null,
  avatar,
  time,
  message = "",
  extraInfo,
}) => {
  const { data: session, status } = useSession();
  const [replying, setReplying] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteCommentById(extraInfo.title, extraInfo.id);

      if (response.success) {
        toast.success("Comment deleted successfully");
      } else {
        toast.error("Failed to delete the comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("An error occurred while deleting the comment.");
    }
  };

  const RepliedMessage = ({ name, content }) => (
    <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 rounded">
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        Replying to:{" "}
        <span className="text-blue-600 dark:text-blue-400">{name}</span>
      </p>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 italic">
        "{content}"
      </p>
    </div>
  );

  return (
    <div>
      <article
        className={`px-2 py-6 text-base rounded-l ${replied ? "pl-10" : ""}`}
      >
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
              <Image
                className="mr-2 w-6 h-6 rounded-full object-cover"
                src={avatar || "/profileplace.jpg"}
                alt={`${name}'s avatar`}
                width={24}
                height={24}
                priority
                quality={100}
              />
              {name.split("@")[0]}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={time}>{time || "Just now"}</time>
            </p>
          </div>

          {status === "authenticated" && session.user.email === name && (
            <button
              onClick={handleDelete}
              className="text-sm text-red-500 hover:underline dark:text-red-400 font-medium"
            >
              Delete
            </button>
          )}
        </footer>

        {childID && (
          <RepliedMessage
            name={childID.split("@#$#@")[0]} // Extracting the name from childID
            content={childID.split("@#$#@")[1]} // Extracting the content from childID
          />
        )}

        <p className="text-gray-500 dark:text-gray-400">{message}</p>

        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => setReplying(!replying)}
            className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              className="mr-1.5 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reply
          </button>
        </div>
      </article>

      {replying && (
        <EditMessage
          parentId={parentID}
          childId={`${name.split("@")[0]}@#$#@${message}`}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ChatBubble;
