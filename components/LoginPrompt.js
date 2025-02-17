"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPrompt() {
  const { data: session, status } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasContinuedAsGuest = localStorage.getItem("continuedAsGuest");
    const hasSignedInBefore = localStorage.getItem("hasSignedInBefore");

    if (status === "authenticated") {
      localStorage.setItem("hasSignedInBefore", "true"); // Store that user has signed in before
      return;
    }

    if (status === "unauthenticated" && !hasContinuedAsGuest && !hasSignedInBefore) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1500); // Show after 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowPopup(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGuestContinue = () => {
    localStorage.setItem("continuedAsGuest", "true");
    setShowPopup(false);
  };

  if (!showPopup || status === "authenticated") return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowPopup(false)}
            >
              <X size={20} />
            </button>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome to Our Platform!
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Sign in to unlock all features, or continue as a guest.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => signIn("google")}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in with Google
              </button>
              <button
                onClick={handleGuestContinue}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Continue as Guest
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
