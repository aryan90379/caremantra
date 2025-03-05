"use client"; // Ensure this component runs on the client side
import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/actions/useractions";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingSkeleton from "./Skeleton";
import { updateSectionViews } from "@/actions/useractions";
// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


// UPADTE THE VIES
const updateBlogSectionViews = async () => {
  const section = "blogs"; // Define the specific section

  const viewedSections = JSON.parse(localStorage.getItem("viewedSections")) || {};
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





const DisplayBlogs = ({ aside = false }) => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const currentTime = new Date();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetchArticles();
    setArticles(data);
    setFilteredArticles(data);
    setisLoading(false);
    updateBlogSectionViews();
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredArticles(articles);
      return;
    }
    const matchedArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(matchedArticles);
  };

  return (
    <section
      className={`text-gray-600 dark:text-gray-300 body-font ${
        aside ? "w-full" : ""
      }`}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className={`container mx-auto ${aside ? "p-0" : "px-3 pt-8"}`}>
          {/* Search Bar (Hidden in Aside Mode) */}
          {!aside && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-4 flex flex-col md:flex-row items-center justify-center relative space-y-3 md:space-y-0"
            >
              <div className="flex pb-6 items-center w-full md:w-1/2 lg:w-1/3 space-x-2 px-4">
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="w-full p-3 rounded-full border text-sm transition-all duration-300
                  border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500
                  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                  shadow-sm hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Blog Cards */}
          <div
            className={`${
              aside ? "flex flex-col space-y-6 pb-7" : "flex flex-wrap -m-4"
            }`}
          >
            {filteredArticles.length > 0 ? (
              filteredArticles
                .filter((article) => {
                  const publishedAt = new Date(article.publishedAt);
                  return (
                    article.status === "published" && publishedAt < currentTime
                  );
                })
                .sort(
                  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                )
                .map((article, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }} // Moves up slightly for smooth appearance
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }} // Ensures it appears ASAP without unnecessary re-triggers
                    className={`${
                      aside ? "w-full" : "lg:w-1/4 p-4 md:w-1/2 w-full"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link href={`/blogs/${article.slug}`}>
                      <article
                        className={`group ${
                          aside ? "flex items-start space-x-4" : ""
                        }`}
                      >
                        {/* Adjusted Image Size for Aside */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <img
                            alt={article.title}
                            src={
                              article.featuredImage ||
                              "https://via.placeholder.com/600x400"
                            }
                            width={aside ? "100" : "600"}
                            height={aside ? "100" : "400"}
                            className={`${
                              aside
                                ? "w-24 h-24 rounded-md object-cover filter"
                                : "h-56 w-full rounded-lg object-cover shadow-xl"
                            } transition group-hover:grayscale-[50%] dark:shadow-gray-700/25`}
                            loading="lazy"
                          />
                        </motion.div>

                        <div className={`${aside ? "flex-1" : "p-4"}`}>
                          <motion.h3
                            className={`${
                              aside ? "text-sm" : "text-lg"
                            } font-medium text-gray-900 hover:text-violet-400 dark:text-white`}
                          >
                            {article.title}
                          </motion.h3>

                          {!aside && (
                            <motion.p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                              {article.metaDescription}
                            </motion.p>
                          )}

                          <motion.div className="flex items-center mt-2">
                            <span
                              className={` ${
                                aside ? "hidden" : ""
                              } text-sm text-gray-500 dark:text-gray-400`}
                            >
                              {article?.author || "Unknown"} |{" "}
                              {article?.readingTime || "N/A"} min read |{" "}
                              {article?.publishedAt?.slice(0, 10) ||
                                "Unknown Date"}
                            </span>
                          </motion.div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))
            ) : (
              <motion.p
                className="text-center text-gray-600 dark:text-gray-400 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                No articles available.
              </motion.p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default DisplayBlogs;
