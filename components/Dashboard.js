"use client";
import React, { useEffect, useState } from "react";
import { fetchArticles, fetchSectionViews } from "@/actions/useractions";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [sectionViews, setSectionViews] = useState({
    home: 0,
    blogs: 0,
    "bmi-calculator": 0,
    "age-calculator": 0,
    "unit-convertor": 0,
  });
  const [viewMode, setViewMode] = useState("individual");

  useEffect(() => {
    const loadData = async () => {
      try {
        const articlesData = await fetchArticles();
        const now = new Date();
        const publishedArticles = articlesData.filter(
          (article) =>
            article.status === "published" &&
            new Date(article.publishedAt) <= now
        );
        setArticles(publishedArticles);

        const totalArticleViews = publishedArticles.reduce(
          (sum, article) => sum + (article.views || 0),
          0
        );
        setTotalViews(totalArticleViews);
        const sections = await fetchSectionViews();
        console.log(sections)
        const homeViews = sections.find((s) => s.section === "home")?.views || 0;
        const blogViews = sections.find((s) => s.section === "blogs")?.views || 0;
        const bmiViews = sections.find((s) => s.section === "bmi-calculator")?.views || 0;
        const ageViews = sections.find((s) => s.section === "age-calculator")?.views || 0;
        const unitConvertorViews = sections.find((s) => s.section === "unit-convertor")?.views || 0;

        setSectionViews({
          home: homeViews,
          blogs: blogViews,
          "bmi-calculator": bmiViews,
          "age-calculator": ageViews,
          "unit-convertor": unitConvertorViews,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row min-h-screen p-4 gap-6 bg-gray-100 dark:bg-gray-900"
    >
      <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold dark:text-white">Dashboard</h2>
        <div
          className="mt-4 flex items-center justify-between cursor-pointer bg-gray-200 dark:bg-gray-700 p-3 rounded-lg"
          onClick={() =>
            setViewMode(viewMode === "individual" ? "total" : "individual")
          }
        >
          <span className="text-sm font-semibold dark:text-white">
            {viewMode === "individual" ? "Individual Views" : "Total Views"}
          </span>
          <FaArrowDown className="dark:text-white" />
        </div>
      </aside>

      <motion.div
        className="w-full md:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {viewMode === "individual" ? (
          <div>
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Articles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles
                .slice()
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .map((article) => (
                  <motion.div
                    key={article._id}
                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    <img
                      src={article.thumbnail || "/placeholder.jpg"}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-2 dark:text-white">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Likes: {article.likes || 0}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Views: {Math.round(article.views) || 0}
                    </p>
                  </motion.div>
                ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold dark:text-white mb-4">Total Views</h2>
            <p className="text-lg dark:text-white">Total Article Views: {totalViews}</p>
            <p className="text-lg dark:text-white">Home Views: {sectionViews.home}</p>
            <p className="text-lg dark:text-white">Blogs Views: {sectionViews.blogs}</p>
            <p className="text-lg dark:text-white">BMI Calculator Views: {sectionViews["bmi-calculator"]}</p>
            <p className="text-lg dark:text-white">Age Calculator Views: {sectionViews["age-calculator"]}</p>
            <p className="text-lg dark:text-white">Unit Convertor Views: {sectionViews["unit-convertor"]}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
