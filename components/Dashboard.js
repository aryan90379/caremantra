'use client';
import React, { useEffect, useState } from 'react';
import { fetchArticles } from '@/useractions';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { FaArrowDown } from 'react-icons/fa'; // Fancy arrow icon for dropdown
import 'chart.js/auto';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [viewMode, setViewMode] = useState('individual'); // Default to individual views

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        const now = new Date();
        const publishedArticles = data.filter(
          (article) => article.status === 'published' && new Date(article.publishedAt) <= now
        );
        setArticles(publishedArticles);

        // Calculate total views for published articles
        const total = publishedArticles.reduce((sum, article) => sum + (article.views || 0), 0);
        setTotalViews(total);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    loadArticles();
  }, []);

  // Chart data preparation for total views (display a single bar)
  const chartData = {
    labels: ['Total Views'], // Single label for total views
    datasets: [
      {
        label: 'Total Views',
        data: [totalViews], // Display total views as a single bar
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap p-6 gap-6"
    >
      {/* Main Content */}
      <motion.div
        className="w-full md:w-3/4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-6">Articles</h1>

        {/* Dropdown to toggle between views */}
        <div className="mb-4 flex justify-between items-center">
          <label className="text-sm font-semibold">View Mode</label>
          <div
            className="bg-gray-200 p-2 rounded-lg flex items-center cursor-pointer"
            onClick={() => setViewMode(viewMode === 'individual' ? 'total' : 'individual')}
          >
            <span className="text-sm mr-2">{viewMode === 'individual' ? 'Individual Views' : 'Total Views'}</span>
            <FaArrowDown />
          </div>
        </div>

        {/* Display Section */}
        {viewMode === 'individual' ? (
          // Individual views for each article
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <motion.div
                key={article._id}
                className="bg-gray-100 p-4 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={article.thumbnail || '/placeholder.jpg'}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-2">Likes: {article.likes || 0}</p>
                <p className="text-sm text-gray-600">Views: {Math.round(article.views) || 0}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          // Total views chart (single bar showing total views)
          <div className="bg-white p-4 rounded-xl shadow-md mt-4">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0, // Display integer values on y-axis
                    },
                  },
                },
                plugins: {
                  legend: { position: 'top' },
                  tooltip: {
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
