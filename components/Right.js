"use client";

import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import DisplayBlogs from "./Blogs";

const categories = [
  { name: "Cardiology", icon: "❤️", link: "/blogs/categories/cardiology" },
  { name: "Orthopedics", icon: "🦴", link: "/blogs/categories/orthopedics" },
  { name: "Gastroenterology", icon: "🦠", link: "/blogs/categories/gastroenterology" },
  { name: "Pediatrics", icon: "👶", link: "/blogs/categories/pediatrics" },
  { name: "Gynecology", icon: "👩‍⚕️", link: "/blogs/categories/gynecology" },
  { name: "Urology", icon: "💧", link: "/blogs/categories/urology" },
  { name: "Pulmonology", icon: "🌬️", link: "/blogs/categories/pulmonology" },
  { name: "Ophthalmology", icon: "👁️", link: "/blogs/categories/ophthalmology" },
  { name: "ENT", icon: "👂", link: "/blogs/categories/ent" },
  { name: "Nephrology", icon: "💊", link: "/blogs/categories/nephrology" },
  { name: "Endocrinology", icon: "🔬", link: "/blogs/categories/endocrinology" },
  { name: "Rheumatology", icon: "🦵", link: "/blogs/categories/rheumatology" },
  { name: "Nutrition & Diet", icon: "🥗", link: "/blogs/categories/nutrition-&-diet" },
  { name: "Mental Health", icon: "🧠", link: "/blogs/categories/mental-health" },
  { name: "New Mom Tips", icon: "🤱", link: "/blogs/categories/new-mom-tips" },
  { name: "Lifestyle", icon: "🌟", link: "/blogs/categories/lifestyle" },
  { name: "Dermatology", icon: "🧴", link: "/blogs/categories/dermatology" },
  { name: "Oncology", icon: "🎗️", link: "/blogs/categories/oncology" },
  { name: "Fertility Health", icon: "🍼", link: "/blogs/categories/fertility-health" },
];


const Right = () => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="  dark:bg-gray-900 rounded-2xl  backdrop-blur-md  border-gray-200 dark:border-gray-700"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xl mt-10 font-bold text-gray-900 dark:text-white mb-5 tracking-wide"
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
                href={category.link}
                className="flex items-center gap-4 px-5 py-3 rounded-xl bg-white dark:bg-gray-700 transition duration-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 group shadow-md"
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
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-3xl font-bold pl-5 pt-6 text-gray-900 dark:text-white mb-5 tracking-wide"
        >
          Related Articles
        </motion.h2>

        <DisplayBlogs aside={true} />
      </motion.aside>
    </LazyMotion>
  );
};

export default Right;