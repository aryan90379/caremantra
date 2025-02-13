"use client";

import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";

const categories = [
  { name: "Mental Health", icon: "🧠" },
  { name: "Fitness & Exercise", icon: "🏋️" },
  { name: "Nutrition", icon: "🥗" },
  { name: "Yoga & Meditation", icon: "🧘" },
  { name: "Weight Loss", icon: "⚖️" },
  { name: "Healthy Recipes", icon: "🍎" },
  { name: "Sleep & Recovery", icon: "😴" },
  { name: "Heart Health", icon: "❤️" },
  { name: "Skincare & Beauty", icon: "💆" },
  { name: "Gut Health", icon: "🦠" },
];

const Right = () => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-6 bg-white/90 dark:bg-gray-900 rounded-2xl shadow-xl backdrop-blur-md border border-gray-200 dark:border-gray-700"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-wide"
        >
          🚀 Explore Categories
        </motion.h2>

        {/* Category List */}
        <ul className="space-y-4">
          {categories.map((category, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <a
                href="#"
                className="flex items-center gap-4 px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 transition duration-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 group shadow-md"
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-2xl"
                >
                  {category.icon}
                </motion.span>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200 tracking-wide transition group-hover:text-white">
                  {category.name}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.aside>
    </LazyMotion>
  );
};

export default Right;
