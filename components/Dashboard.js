'use client';
import React, { useEffect, useState } from 'react';
import { fetchArticles } from '@/actions/useractions';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { FaArrowDown } from 'react-icons/fa';
import 'chart.js/auto';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [viewMode, setViewMode] = useState('individual');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        const now = new Date();
        const publishedArticles = data.filter(
          (article) => article.status === 'published' && new Date(article.publishedAt) <= now
        );
        setArticles(publishedArticles);

        const total = publishedArticles.reduce((sum, article) => sum + (article.views || 0), 0);
        setTotalViews(total);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    loadArticles();
  }, []);

  const chartData = {
    labels: ['Total Views'],
    datasets: [
      {
        label: 'Total Views',
        data: [totalViews],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row min-h-screen p-6 gap-6 bg-gray-100 dark:bg-gray-900"
    >
      <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold dark:text-white">Dashboard</h2>
        <div
          className="mt-4 flex items-center justify-between cursor-pointer bg-gray-200 dark:bg-gray-700 p-3 rounded-lg"
          onClick={() => setViewMode(viewMode === 'individual' ? 'total' : 'individual')}
        >
          <span className="text-sm font-semibold dark:text-white">
            {viewMode === 'individual' ? 'Individual Views' : 'Total Views'}
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
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Articles</h1>

        {viewMode === 'individual' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <motion.div
                key={article._id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={article.thumbnail || '/placeholder.jpg'}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 dark:text-white">{article.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Likes: {article.likes || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Views: {Math.round(article.views) || 0}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md mt-4">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                      color: 'black',
                      callback: function(value) {
                        return value;
                      },
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                  x: {
                    ticks: { color: 'black' },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                },
                plugins: {
                  legend: { position: 'top', labels: { color: 'black' } },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    callbacks: {
                      label: (context) => `${context.dataset.label}: ${Math.round(context.raw)}`,
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
