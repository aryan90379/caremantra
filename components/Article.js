"use client";

import React, { useEffect, useState } from "react";
import { fetchArticleID, updateArticle } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { usePathname } from "next/navigation";
import DynamicContentEditor from "./DynamicContentEditor";
import { FaSave } from "react-icons/fa";
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

const Minbutton = () => {
  return (
    <button
      type="submit"
      className="group my-3 relative inline-flex items-center gap-2 overflow-hidden rounded-lg border-2 border-blue-500 dark:border-purple-500 bg-blue-500 dark:bg-purple-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:scale-105 hover:bg-blue-600 dark:hover:bg-purple-600 hover:shadow-blue-500/50 dark:hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-purple-800"
    >
      <span className="absolute inset-0 animate-pulse opacity-20 blur-md bg-gradient-to-r from-blue-400 to-purple-500"></span>
      <FaSave className="relative text-white text-xl group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative">Save Changes</span>
    </button>
  );
};

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
      <div className="container mx-auto py-8     md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                        <span className="block border border-blue-500 dark:border-purple-500 bg-blue-500 dark:bg-purple-500 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-blue-600 dark:group-hover:bg-purple-600">
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
                ) : field === "title" ? (
                  <>
                    <input
                      name={field}
                      value={article[field] || ""}
                      onChange={handleChange}
                      type="text"
                      maxLength={160}
                      className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                    />
                    <div className="flex flex-col gap-1">
                      <p>Current Url: {article.slug}</p>

                      <Minbutton />
                    </div>
                  </>
                ) : field === "metaDescription" ? (
                  <>
                    <input
                      name={field}
                      value={article[field] || ""}
                      onChange={handleChange}
                      type="text"
                      maxLength={160}
                      className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                    />
                    <Minbutton />
                  </>
                ) : field === "readingTime" ? (
                  <div className="flex flex-col items-center relative w-full">
                    <div className="relative w-full">
                      <input
                        type="range"
                        name={field}
                        min="1"
                        max="60"
                        step="1"
                        value={article[field] || 1}
                        onChange={handleChange}
                        className="w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg appearance-none cursor-pointer focus:outline-none transition-all duration-300"
                      />
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg"
                        style={{
                          left: `${((article[field] || 1) / 60) * 100}%`,
                          transition: "left 0.3s ease-in-out",
                        }}
                      >
                        {article[field] || 1} min
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-400 mt-3 font-medium tracking-wide">
                      Reading Time:{" "}
                      <span className="font-bold text-blue-500">
                        {article[field] || 1}
                      </span>{" "}
                      minute(s)
                    </div>
                  </div>
                ) : field === "publishedAt" ? (
                  <DateTimePicker
                    value={article[field] || ""}
                    onChange={(newValue) =>
                      handleChange({ target: { name: field, value: newValue } })
                    }
                  />
                ) : field === "category" ? (
                  <select
                    name={field}
                    value={article[field] || ""}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                  >
                    <option value="Uncategorized">Select Category</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Urology">Urology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="ENT">ENT</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Rheumatology">Rheumatology</option>
                    <option value="Nutrition & Diet">Nutrition & Diet</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="New Mom Tips">New Mom Tips</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Fertility Health">Fertility Health</option>
                  </select>
                ) : (
                  <>
                    <input
                      name={field}
                      value={article[field] || ""}
                      onChange={handleChange}
                      type="text"
                      className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out shadow-sm"
                    />
                    <Minbutton />
                  </>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="group relative inline-block w-full text-sm font-medium text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-800"
            >
              <span className="absolute inset-0 border border-blue-500 dark:border-purple-500"></span>
              <span className="block border border-blue-500 dark:border-purple-500 bg-blue-500 dark:bg-purple-500 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-blue-600 dark:group-hover:bg-purple-600">
                Save Changes
              </span>
            </button>
          </form>
        </div>

        {/* Static Fields Sidebar */}
        <div className="bg-white mt-20 dark:bg-gray-900 p-5 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 space-y-6">
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
                    d={
                      isPositive
                        ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    }
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
