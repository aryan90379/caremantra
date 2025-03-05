"use client";
import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import ClickShow from "@/components/Clicks";
import DisplayBlogs from "@/components/Blogs";
import { useEffect } from "react";
import { updateSectionViews } from "@/actions/useractions";
export default function Home() {
  //  UPADTE THE VIEWS

  const updateHomeSectionViews = async () => {
    if (typeof window === "undefined") return; // Ensure it's running on the client

    const section = "home"; // Define the specific section
    const viewedSections =
      JSON.parse(localStorage.getItem("viewedSections")) || {};
    console.log("Viewed sections:", viewedSections);

    if (!viewedSections[section]) {
      try {
        const updatedViews = await updateSectionViews(section);
        viewedSections[section] = true;
        localStorage.setItem("viewedSections", JSON.stringify(viewedSections));
        console.log(`Updated views for section "${section}":`, updatedViews);
      } catch (error) {
        console.error("Error updating section views:", error);
      }
    }
  };

  useEffect(() => {
    updateHomeSectionViews();
  }, []);

  return (
    <>
      <section className="relative w-full md:h-screen h-96 bg-gray-900 overflow-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <motion.h1
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typewriter
              words={[
                "Discover Blogs",
                "Daily Health Insights",
                "Stay Informed",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h1>

          <motion.p
            className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Engage with inspiring stories, explore top health tips, and stay
            informed with our curated daily health updates.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            {/* Explore Blogs Button */}
            <motion.a
              href="/blogs"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-all duration-200 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              Explore Blogs
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </motion.a>

            {/* Explore Daily Health Button */}

            <motion.a
              href="/daily-health"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ml-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 transition-all duration-200 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              Explore Daily Health
            </motion.a>
          </div>
        </div>
      </section>
      <section>
        <DisplayBlogs />
      </section>
    </>
  );
}
