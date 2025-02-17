"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";

export default function AboutPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 2000);
  }, []);

  return (
    <section className="relative body-font text-gray-100 dark:text-gray-200 overflow-hidden">
      {/* Background Styling */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-blue-900 to-purple-900 dark:from-black dark:to-gray-900"></div>
      
      {/* About Section */}
      <div className="container mx-auto px-6 py-24 text-center">
        <motion.h1
          className="text-6xl font-extrabold text-white mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typewriter words={["About Us", "Our Mission & Vision", "Care Mantra Health"]} loop={true} cursor cursorStyle="|" typeSpeed={50} />
        </motion.h1>
        <motion.p
          className="text-xl leading-relaxed max-w-4xl mx-auto text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Welcome to <span className="text-blue-300 font-semibold">Care Mantra Health</span>, your trusted source for reliable health insights, wellness guidance, and expert medical knowledge. Our mission is to bridge the gap between complex medical information and everyday individuals, providing clarity and confidence in making informed health decisions.
        </motion.p>
      </div>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto space-y-16 py-24 px-6"
        >
          {/* Explore Blogs Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">🚀 Explore Our Blogs</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Stay ahead with the latest developments in healthcare, wellness trends, and expert insights. Our blogs are meticulously curated to keep you informed and empowered, covering a vast spectrum of health topics including nutrition, mental health, disease prevention, fitness, and medical advancements. 
            </p>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Link
                href="/blogs"
                className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Read Our Blogs
              </Link>
            </motion.div>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-blue-300 mb-6">🌍 Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At <span className="text-blue-300 font-semibold">Care Mantra Health</span>, we are dedicated to enhancing the well-being of individuals by providing evidence-based health information that is easy to understand, trustworthy, and accessible to all. Our vision is to empower people to lead healthier, happier lives through accurate knowledge, expert insights, and actionable wellness strategies.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              We believe that knowledge is power, and our goal is to make complex medical information easy to digest. From preventive healthcare tips to managing chronic conditions, we cover a wide range of topics to help you take control of your health and make well-informed decisions.
            </p>
          </motion.div>

          {/* Founders Section
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">👥 Meet Our Founders</h2>
            <p className="text-lg text-gray-300 mb-2">🔹 <span className="text-blue-300 font-semibold">Aryan Meena</span> - Co-Founder & Visionary</p>
            <p className="text-lg text-gray-300">🔹 <span className="text-blue-300 font-semibold">Avaddesh Meena</span> - Co-Founder & Strategist</p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Aryan and Avaddesh Meena founded Care Mantra Health with a passion for making healthcare knowledge accessible to everyone. With backgrounds in health sciences and technology, they have combined their expertise to create a platform that brings together medical professionals, wellness experts, and trusted resources to help individuals make informed decisions about their health.
            </p>
          </motion.div> */}
        </motion.div>
      )}
    </section>
  );
}