"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/home.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">
        {/* Hero Section */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-gray-200 text-center tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Blogs & Daily Health Insights
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 dark:text-gray-400 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Engage with inspiring stories, explore top health tips, and stay
          informed with our curated daily health updates.
        </motion.p>

        {/* Explore Buttons */}
        <div className="mt-8 flex gap-6">
          {/* Button for Blogs */}
          <motion.a
            href="/blogs"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          >
            <span className="relative px-6 py-3 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent">
              Explore Blogs
            </span>
          </motion.a>

          {/* Button for Daily Health */}
          <motion.a
            href="/daily-health"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          >
            <span className="relative px-6 py-3 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent">
              Explore Daily Health
            </span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
