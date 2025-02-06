"use client";
import React, { useEffect, useState } from "react";
import { fetchArticles, CreateArticle } from "@/actions/useractions";
import Link from "next/link";
import Image from "next/image";

// import Router, { useRouter } from "next/router";

// Function to convert title into a slug
// const slugify = (text) => {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
//     .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
// };

const DisplayArticles = () => {
  // const router = useRouter();
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

  const handleAdd = async () => {
    await CreateArticle();
    // console.log(newId);
    // router.push("/newId")
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
          <button
            onClick={handleAdd}
            className="md:mt-0 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium dark:text-white text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent">
              Add Article
            </span>
          </button>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <div key={idx} className="p-4 lg:w-1/3 w-full">
                <div className="h-full   bg-opacity-75 lg:px-8 pt-8 pb-8 rounded-lg overflow-hidden text-center relative">
                  {/* Image using Next.js Image component */}
                  <Image
                    alt={article.title}
                    src={
                      article.thumbnail || "https://via.placeholder.com/600x400"
                    }
                    width={600} // Set width to desired value
                    height={400} // Set height to desired value
                    className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] dark:shadow-gray-700/25"
                    priority={false} // Load image immediately for better performance
                    placeholder="blur" // Blur-up effect while loading
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWx...eF1zdmc+PHN2ZyBkYXRhPSJldmFsbCwgM2sgcnMgc3h1cGE=" // Custom low-quality image placeholder
                    loading="lazy" // Lazy loading for optimized performance
                  />

                  <h2 className="tracking-widest text-sm title-font font-medium text-gray-400 mb-1">
                    {article.category}
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                    {article.title}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {article.content.length > 150
                      ? `${article.content.slice(0, 150)}...`
                      : article.content}
                  </p>
                  <Link href={`/admin/articles/${article._id}`}>
                    <button className="group relative inline-block overflow-hidden border border-indigo-600 rounded-lg px-8 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                      {/* Animation line on hover */}
                      <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all duration-500 group-hover:w-full"></span>

                      {/* Button text */}
                      <span className="relative text-sm font-medium text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white dark:text-indigo-400 dark:group-hover:text-white">
                        Edit
                        {/* SVG icon */}
                        <svg
                          className="w-4 h-4 ml-2 inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:rotate-90"
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
                      </span>
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
