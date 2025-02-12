"use client";

import React, { useEffect, useState } from "react";
import { fetchArticleID, updateArticle } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { usePathname } from "next/navigation";
import DynamicContentEditor from "./DynamicContentEditor";
import {
  FaLink,
  FaEye,
  FaHeart,
  FaComments,
  FaCalendarAlt,
  FaSync,
  FaRocket,
} from "react-icons/fa";
import DateTimePicker from "./DateTimePicker";

const EditArticle = () => {
  const [article, setArticle] = useState({});
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const fields = [
    "title",
    "metaTitle",
    "metaDescription",
    "keywords",
    "content",
    "status",
    "author",
    "category",
    "tags",
    "featuredImage",
    "thumbnail",
    "readingTime",
    "publishedAt",
  ];

  const stats = [
    { name: "Slug", icon: <FaLink />, value: article.slug },
    { name: "Views", icon: <FaEye />, value: article.views },
    { name: "Likes", icon: <FaHeart />, value: article.likes },
    // { name: "Comments", icon: <FaComments />, value: article.comments.length },
    { name: "Created At", icon: <FaCalendarAlt />, value: article.createdAt },
    { name: "Updated At", icon: <FaSync />, value: article.updatedAt },
    { name: "Published At", icon: <FaRocket />, value: article.publishedAt },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetchArticleID(id);
    setArticle(data);
  };

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(article, id);
      toast("Article Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to update article", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editable Fields Section */}
        <div className="lg:col-span-2">
          <h1 className="text-center my-5 text-3xl font-bold text-gray-900 dark:text-white">
            Edit Article
          </h1>
          <form
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-300 dark:border-gray-700"
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div key={field} className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wide">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>

                {field === "content" ? (
                  <>
                    <div className="flex flex-col gap-3">
                      <DynamicContentEditor
                        value={article["content"]}
                        onChange={(newValue) =>
                          handleChange({
                            target: { name: "content", value: newValue },
                          })
                        }
                        className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-900 dark:border-gray-700"
                      />
                      <button
  type="submit"
  className="group relative inline-block w-full text-sm font-medium text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-800"
>
  <span className="absolute inset-0 border border-blue-500 dark:border-purple-500"></span>
  <span
    className="block border border-blue-500 dark:border-purple-500 bg-blue-500 dark:bg-purple-500 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-blue-600 dark:group-hover:bg-purple-600"
  >
    Save Changes
  </span>
</button>

                    </div>
                  </>
                ) : field === "status" ? (
                  <select
                    name={field}
                    value={article[field] || ""}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                ) : field === "metaDescription" ? (
                  <input
                    name={field}
                    value={article[field] || ""}
                    onChange={handleChange}
                    type="text"
                    maxLength={160}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                  />
                ) : field === "readingTime" ? (
                  <div className="flex flex-col">
                    <input
                      type="range"
                      name={field}
                      min="1"
                      max="60"
                      step="1"
                      value={article[field] || 1}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out"
                    />
                    <div className="text-sm text-gray-700 dark:text-gray-400 mt-2 font-medium tracking-wide">
                      Reading Time: {article[field] || 1} minute(s)
                    </div>
                  </div>
                ) : field === "publishedAt" ? (
                  <DateTimePicker
                    value={article[field] || ""}
                    onChange={(newValue) =>
                      handleChange({ target: { name: field, value: newValue } })
                    }
                  />
                ) : (
                  <input
                    name={field}
                    value={article[field] || ""}
                    onChange={handleChange}
                    type="text"
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                  />
                )}
              </div>
            ))}

<button
  type="submit"
  className="group relative inline-block w-full text-sm font-medium text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-800"
>
  <span className="absolute inset-0 border border-blue-500 dark:border-purple-500"></span>
  <span
    className="block border border-blue-500 dark:border-purple-500 bg-blue-500 dark:bg-purple-500 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-blue-600 dark:group-hover:bg-purple-600"
  >
    Save Changes
  </span>
</button>
          </form>
        </div>

        {/* Static Fields Sidebar */}
        <div className="bg-white mt-20 dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 space-y-6">
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
    Article Stats
  </h2>
  {stats.map(({ name, icon, value, isPositive, percentage }) => (
    <div
      key={name}
      className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            {name}
          </label>
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            {value || "N/A"}
          </p>
        </div>
      </div>
      <div
        className={`inline-flex items-center gap-2 rounded-sm px-2 py-1 text-xs font-medium ${
          isPositive
            ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-50"
            : "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-50"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"}
          />
        </svg>
        <span>{percentage || "0%"}</span>
      </div>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default EditArticle;
