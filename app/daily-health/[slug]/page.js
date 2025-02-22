"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Function to scrape paragraphs from the article URL
async function scrapeWebsite(url) {
  try {
    const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error("Failed to scrape website");
    
    const data = await response.json();
    return data.paragraphs || [];
  } catch (error) {
    console.error("Scraping error:", error);
    return [];
  }
}

export default function ArticlePage() {
  const pathname = usePathname();
  const articleTitle = pathname.split("/")[2]; // Extract article title from URL

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    if (!articleTitle) return;

    const fetchArticle = async () => {
      setLoading(true);
      const apiKey = "b1488dbebcbb4ef7aaea0d7449930102"; // Replace with your API key
      const url = `https://newsapi.org/v2/everything?q=${articleTitle.replace(/-/g, " ")}&language=en&sortBy=popularity&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.articles.length > 0) {
            setArticle(data.articles[0]); // Select most relevant article
          }
        } else {
          console.error(`Error fetching article: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleTitle]);

  // Scrape website after article URL is available
  useEffect(() => {
    if (article?.url) {
      scrapeWebsite(article.url).then(setParagraphs);
    }
  }, [article?.url]);

  if (loading) {
    return <div className="text-center text-xl text-gray-200">Loading...</div>;
  }

  if (!article) {
    return <div className="text-center text-xl text-gray-200">Article not found.</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm mb-2">By {article.author || "Unknown"} | {new Date(article.publishedAt).toLocaleDateString()}</p>
        <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover rounded-md mb-4" />
        
        {/* Display Scraped Paragraphs */}
        {paragraphs.length > 0 ? (
          paragraphs.map((para, index) => (
            <p key={index} className="text-lg mb-4">{para}</p>
          ))
        ) : (
          <p className="text-lg">No additional content available.</p>
        )}

        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-300 font-medium hover:underline">
          Read Full Article
        </a>
      </div>
    </div>
  );
}
