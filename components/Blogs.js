"use client";
import React, { useEffect, useState } from "react";
import { fetchArticles, CreateArticle } from "@/actions/useractions";
import Link from "next/link";
import Image from "next/image";
// Import Image component from next/image

const DisplayBlogs = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

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
      <div className="container px-5 py-24 mx-auto">
        <div className="mb-4 flex flex-col md:flex-row items-center justify-center relative space-y-3 md:space-y-0">
          <div className="flex items-center w-full md:w-1/2 lg:w-1/3 space-x-2 px-4">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full p-3 rounded-lg border text-sm transition-all duration-300
        border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500
        dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
        shadow-sm hover:shadow-md"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value); // Update the state
                handleSearch(); // Trigger the search function with the new value
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Call the same search handler used by the button
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <div key={idx} className="p-4 lg:w-1/4 w-full">
                <Link href={`/Blogs/${article.slug}`}>
                  <article className="group">
                    {/* Using Next.js Image component for optimized image handling */}
                    <Image
                      alt={article.title}
                      src={
                        article.thumbnail ||
                        "https://via.placeholder.com/600x400"
                      }
                      width={600} // Set width to desired value
                      height={400} // Set height to desired value
                      className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] dark:shadow-gray-700/25"
                      priority={false} // Load image immediately for better performance (useful for above-the-fold images)
                      placeholder="blur" // Adds a blur-up effect while the image is loading
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWx...eF1zdmc+PHN2ZyBkYXRhPSJldmFsbCwgM2sgcnMgc3h1cGE=" // Custom low-quality image placeholder (base64)
                      loading="lazy" // Enables lazy loading of images for better performance
                    />

                    <div className="p-4">
                      <Link href={`/article/${article.slug}`}>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                        {article.content.length > 150
                          ? article.content.substring(0, 150) + "..."
                          : article.content}
                      </p>

                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {article.author} | {article.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 w-full">
              No articles available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DisplayBlogs;
