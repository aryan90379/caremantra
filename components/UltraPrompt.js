"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UltraPrompt({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 relative text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={handleClose}
            >
              <X size={20} />
            </button>

            {/* Title */}
            <motion.h5
              className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
            >
              🚀 Sign in to Unlock Cool Features!
            </motion.h5>

            {/* Description */}
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Get access to premium features by signing in.
            </p>

            {/* Sign in button */}
            <motion.button
              onClick={() => signIn("google")}
              className="px-6 py-2 text-white text-sm font-medium bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in with Google
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
