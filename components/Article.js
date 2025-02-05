"use client";

import React, { useEffect, useState } from "react";
import { fetchArticle, updateArticle } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { usePathname } from "next/navigation";

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
    "author",
    "category",
    "tags",
  ];

  const stats = [
    { name: "Slug", icon: "🔗" },
    { name: "Views", icon: "👁️" },
    { name: "Likes", icon: "❤️" },
    { name: "Comments", icon: "💬" },
    { name: "Created At", icon: "📅" },
    { name: "Updated At", icon: "🔄" },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetchArticle(id);
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
            <div key={field} className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                name={field}
                value={article[field] || ""}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:scale-105 transition-transform duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm shadow-sm"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Static Fields Sidebar */}
      <div className="bg-white mt-20 dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Article Stats
        </h2>
        {stats.map(({ name, icon }) => (
          <div
            key={name}
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span className="text-xl">{icon}</span>
            <div className="text-right">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400">
                {name}
              </label>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                {article[name.toLowerCase().replace(/ /g, "")] || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default EditArticle;
