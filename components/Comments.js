"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";

const formatDate = (date) => {
  const formattedDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(formattedDate);
};

const Comments = ({ commentData, title }) => {
  const [expandedReplies, setExpandedReplies] = useState({});
  const [visibleComments, setVisibleComments] = useState(5);

  if (!commentData || commentData.length === 0)
    return <p className="text-gray-500">No comments yet.</p>;

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  return (
    <div className="space-y-4 p-4 rounded-lg ">
      

      <AnimatePresence>
        {commentData
          .sort((a, b) => new Date(b.onDate) - new Date(a.onDate))
          .filter((comment) => comment.parentId == null)
          .slice(0, visibleComments)
          .map((parentComment) => {
            const replies = commentData.filter(
              (reply) => reply.parentId === parentComment._id
            );
            const isExpanded = expandedReplies[parentComment._id];

            return (
              <motion.div
                key={parentComment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pb-4"
              >
                <ChatBubble
                  name={parentComment.by_user}
                  parentID={parentComment._id}
                  avatar={parentComment.profile || "/default-avatar.png"}
                  time={formatDate(parentComment.onDate)}
                  message={parentComment.content}
                  extraInfo={{ title: title, id: parentComment._id }}
                />

                {replies.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setExpandedReplies((prev) => ({
                        ...prev,
                        [parentComment._id]: !prev[parentComment._id],
                      }))
                    }
                    className="ml-4 mt-2 text-sm text-blue-500 hover:underline"
                  >
                    {isExpanded
                      ? `Hide Replies (${replies.length})`
                      : `View Replies (${replies.length})`}
                  </motion.button>
                )}

                <AnimatePresence>
                  {isExpanded &&
                    replies.map((reply) => (
                      <motion.div
                        key={reply._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 pl-4 mt-2"
                      >
                        <ChatBubble
                          name={reply.by_user}
                          parentID={parentComment._id}
                          childID={reply.childId}
                          replied={true}
                          avatar={reply.profile || "/default-avatar.png"}
                          time={formatDate(reply.onDate)}
                          message={reply.content}
                          extraInfo={{ title: title, id: reply._id }}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {visibleComments < commentData.filter((c) => c.parentId == null).length && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadMoreComments}
          className="w-full text-center text-sm text-blue-600 hover:underline mt-4"
        >
          More to Read
        </motion.button>
      )}
    </div>
  );
};

export default Comments;