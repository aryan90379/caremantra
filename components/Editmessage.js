"use client";
import React, { useState } from "react";
import { updateCommentByTitle } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import UltraPrompt from "./UltraPrompt"; // Import the sign-in prompt

const EditMessage = ({ parentId = null, childId = null }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [showPrompt, setShowPrompt] = useState(false); // State to control sign-in prompt
  const pathname = usePathname();
  const title = pathname.split("/").pop();

  const formatCommentObject = (comment, byUser, profile, parentId, childId) => {
    return {
      by_user: byUser,
      content: comment,
      profile: profile,
      parentId: parentId,
      childId: childId,
      onDate: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setShowPrompt(true); // Show sign-in prompt instead of toast error
      return;
    }

    const formattedComment = formatCommentObject(
      comment,
      session.user.email,
      session?.user?.image || "/default-avatar.png",
      parentId,
      childId
    );

    try {
      await updateCommentByTitle(title, formattedComment);
      toast.success("Comment posted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setComment("");
    } catch (error) {
      toast.error("Failed to post comment.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      {showPrompt && <UltraPrompt onClose={() => setShowPrompt(false)} />} {/* Show sign-in prompt */}
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Post Comment
          </span>
        </button>
      </form>
    </div>
  );
};

export default EditMessage;
