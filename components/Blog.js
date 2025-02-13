"use client";
import React, { useState, useEffect } from "react";
import { fetchArticleTitle } from "@/actions/useractions";
import { usePathname } from "next/navigation";
import ShareButtons from "./sharedbuttons";
import Image from "next/image";
import { motion } from "framer-motion";
import ParseContent from "./ParseContent";
import Comments from "./Comments";
import EditMessage from "./Editmessage";
import Right from "./Right";
const Blog = () => {
  const pathname = usePathname();
  const title = decodeURIComponent(pathname.split("/").pop() || "");

  const [article, setArticle] = useState({
    title: "",
    author: "",
    publishedAt: "",
    content: "",
    thumbnail: "",
  });

  // parsing the content

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) {
      getData();
    }
  }, [title]);

  const getData = async () => {
    try {
      const data = await fetchArticleTitle(title);
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="lg:flex text-gray-600  dark:text-gray-300 body-font min-h-screen"
    >
      
      
      <aside className="lg:w-1/4 lg:block hidden">

      </aside>

      {/* Main Content */}
      <main className="lg:w-3/4 w-full pt-9 px-4  ">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold">
            {loading ? "Loading..." : article.title}
          </h1>
        </motion.header>

        {/* Author & Meta Info */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-md text-gray-500 dark:text-gray-400"
        >
          <p>
            by{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {article.author || "Unknown"}
            </span>{" "}
            in{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {article.category || "General"}
            </span>{" "}
            category on{" "}
            <time dateTime={article.publishedAt}>
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString()
                : "N/A"}
            </time>
            .
          </p>
        </motion.section>

        {/* Share Buttons */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <ShareButtons />
        </motion.section>

        {/* Article Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {loading ? (
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <p className="mt-4 h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></p>
              <p className="mt-2 h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={600}
                  height={400}
                  layout="responsive"
                  objectFit="cover"
                  priority
                  quality={100}
                  placeholder="blur"
                  blurDataURL="https://placehold.co/600x400"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="p-3"
              >
                <ParseContent value={article.content} />
              </motion.div>
            </>
          )}
        </motion.section>
        <div>
          <h1 className="text-3xl  font-bold text-gray-800 dark:text-gray-300 mt-8 mb-4 border-gray-300 dark:border-gray-600 pb-2">
            Discussions (
            {Array.isArray(article.comments) ? article.comments.length : 0})
          </h1>

          <EditMessage />
          <Comments commentData={article.comments || []} title = {article.slug}/>
        </div>
        {/* </motion.section> */}
      </main>
      {/* Main Content */}

      <aside className="lg:w-1/4 lg:block hidden">
      <Right/>
      </aside>
    </motion.article>
  );
};

export default Blog;
