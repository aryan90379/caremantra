"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("health"); // Default topic set to health
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchArticles = async (searchTopic) => {
    setLoading(true);
    const apiKey = "b1488dbebcbb4ef7aaea0d7449930102"; // Replace with your API key
    const url = `https://newsapi.org/v2/everything?q=${searchTopic}&language=en&sortBy=popularity&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const validArticles = data.articles.filter(
          (article) => article.title && article.description && article.urlToImage
        );
        setArticles(validArticles);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(topic);
  }, [topic]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newTopic = e.target.elements.topic.value.trim();
    if (newTopic) {
      setTopic(newTopic);
    }
  };

  const handleArticleClick = (article) => {
    const formattedTitle = encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase());
    router.push(`/daily-health/${formattedTitle}`);
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="max-w-6xl mx-auto text-white">
        <h1 className="text-5xl font-bold text-center mb-8">Top Health Headlines</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex justify-center mb-10">
          <input
            type="text"
            name="topic"
            placeholder="Search for health news..."
            className="px-6 py-3 w-3/4 md:w-1/2 text-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-l-full focus:outline-none focus:ring focus:ring-blue-300 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-r-full text-lg text-white hover:bg-blue-700 transition shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Articles */}
        {loading ? (
          <div className="text-center text-gray-200 text-xl">Loading...</div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition text-white cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{article.title}</h2>
                  <p className="text-sm mb-6">{article.description}</p>
                  <span className="text-blue-300 font-medium hover:underline">Read More</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-200 text-xl">
            No health articles found for "{topic}".
          </div>
        )}
      </div>
    </div>
  );
}
