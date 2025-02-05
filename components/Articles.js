"use client"
import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/actions/useractions";
import Link from "next/link";


// Function to convert title into a slug
// const slugify = (text) => {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
//     .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
// };

const DisplayArticles = () => {
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
      article.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredArticles(matchedArticles);
  };

  return (
    <section className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by title..."
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <div key={idx} className="p-4 lg:w-1/3">
                <div className="h-full bg-gray-100 dark:bg-gray-800 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                    
                      {article.title}
                    
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {article.content.length > 150
                      ? `${article.content.slice(0, 150)}...`
                      : article.content}
                  </p>
                  <Link href={`/admin/articles/${(article._id)}`}>
                    <button className="text-indigo-500 inline-flex items-center">
                      Edit
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    
                  </Link>
                </div>
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

export default DisplayArticles;
