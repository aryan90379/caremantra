"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="text-gray-300 bg-gray-900 dark:bg-black body-font">
      
      {/* About Section */}
      <div className="container mx-auto px-5 py-24">
        <motion.h1
          className="text-5xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
        <p className="text-lg text-center text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Welcome to **Care Mantra Health**, your go-to platform for **trusted health news, wellness tips, and expert medical insights**.  
          Our mission is to provide **accurate, up-to-date, and reliable health information** to help you make informed decisions about your well-being.
        </p>
        <div className="mt-6 text-center">
          <p className="text-gray-400 max-w-4xl mx-auto">
            Our team of **health professionals, medical writers, and fitness experts** curate content that covers **nutrition, mental health, disease prevention, medical research, and lifestyle improvements**.  
            Whether you're looking for the latest breakthroughs in medicine, daily wellness hacks, or in-depth articles on specific health conditions, we've got you covered.
          </p>
        </div>
      </div>

      {/* Explore Blogs Section */}
      <div className="container mx-auto flex flex-wrap py-24 items-center">
        <div className="w-full lg:w-1/2 px-6 text-center lg:text-left">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🚀 Explore Blogs
          </motion.h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Stay ahead with the **latest health trends, expert opinions, and medical news**.  
            Our blogs are carefully researched and written by industry professionals to give you the most **accurate and insightful information**.
          </p>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/blogs"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Read Our Blogs
            </Link>
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 px-6 mt-12 lg:mt-0">
          <motion.img
            src="/images/blogs.jpg"
            alt="Health Blogs"
            className="w-full rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Explore Daily Health Section */}
      <div className="container mx-auto flex flex-wrap py-24 items-center flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-1/2 px-6 mt-12 lg:mt-0">
          <motion.img
            src="/images/daily-health.jpg"
            alt="Daily Health Tips"
            className="w-full rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="w-full lg:w-1/2 px-6 text-center lg:text-left">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🌿 Explore Daily Health
          </motion.h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Start your day with **simple, effective, and research-backed health tips**.  
            Our daily health section provides **easy-to-follow wellness advice, diet recommendations, and fitness insights** to help you stay on track.
          </p>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/daily-health"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Discover Daily Tips
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="container px-5 py-24 mx-auto">
        <motion.h2
          className="text-white text-center text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Meet Our Founders
        </motion.h2>
        <div className="flex flex-wrap -m-4 justify-center">
          <motion.div
            className="p-4 w-full md:w-1/3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              alt="founder"
              className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-2 border-gray-800"
              src="/founder1.jpg"
            />
            <h3 className="text-white font-medium text-lg">Your Name</h3>
            <p className="text-gray-500">Co-Founder & Visionary</p>
            <p className="mt-2">Passionate about innovation and bringing creative ideas to life.</p>
          </motion.div>
          <motion.div
            className="p-4 w-full md:w-1/3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <img
              alt="founder"
              className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-2 border-gray-800"
              src="/founder2.jpg"
            />
            <h3 className="text-white font-medium text-lg">Other Founder</h3>
            <p className="text-gray-500">Co-Founder & Strategist</p>
            <p className="mt-2">Dedicated to driving success and shaping the future of the brand.</p>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
