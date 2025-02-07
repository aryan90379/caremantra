"use client"; // Ensure this component runs on the client side
import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/actions/useractions";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};



const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DisplayBlogs = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const currentTime = new Date(); 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetchArticles();
    setArticles(data);
    setFilteredArticles(data);
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
    <section className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-gray-900">
      <div className="container px-5 py-20 mx-auto">
        {/* Search Bar Animation */}
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

        {/* Blog Cards Animation */}
        <div className="flex flex-wrap -m-4">
          {filteredArticles.length > 0 ? (
            filteredArticles
              .filter((article) => {
                const publishedAt = new Date(article.publishedAt); // Convert to Date object
                // Get the current date and time
                return (
                  article.status === "published" && publishedAt < currentTime
                );
              })
              .map((article, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="p-4 lg:w-1/4 w-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href={`/blogs/${article.slug}`}>
                    <article className="group">
                      {/* Animated Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <Image
                          alt={article.title}
                          src={
                            article.thumbnail ||
                            "https://via.placeholder.com/600x400"
                          }
                          width={600}
                          height={400}
                          className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] dark:shadow-gray-700/25"
                          placeholder="blur"
                          blurDataURL="https://placehold.co/600x400"
                          loading="lazy"
                        />
                      </motion.div>

                      <div className="p-4">
                        <motion.h3
                          className="text-lg font-medium text-gray-900 dark:text-white"
                          variants={fadeIn}
                        >
                          {article.title}
                        </motion.h3>

                        <motion.p
                          className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400"
                          variants={fadeIn}
                        >
                          {article.metaDescription}
                        </motion.p>

                        <motion.div
                          className="flex items-center mt-2"
                          variants={fadeIn}
                        >
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {article.author} | {article.readingTime}  min read | {(article.publishedAt).slice(0,10)} 
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
    </section>
  );
};

export default DisplayBlogs;
