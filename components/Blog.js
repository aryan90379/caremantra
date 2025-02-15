"use client";
import React, { useState, useEffect } from "react";
import { fetchArticleTitle } from "@/actions/useractions";
import { usePathname } from "next/navigation";
import ShareButtons from "./sharedbuttons";
import { motion } from "framer-motion";
import ParseContent from "./ParseContent";
import Comments from "./Comments";
import EditMessage from "./Editmessage";
import Right from "./Right";
import Head from "next/head";
import Link from "next/link";

export const metadata = ({ params }) => {
  const article = getArticle(params.slug);
  return {
    title: article?.metaTitle || "Default Title",
    description: "Your guide to Today's Healthcare",
  };
};



const Blog = () => {
  const pathname = usePathname();
  const title = decodeURIComponent(pathname.split("/").pop() || "");

  const [article, setArticle] = useState({
    title: "",
    author: "",
    publishedAt: "",
    content: "",
    thumbnail: "",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    slug: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) {
      getData();
    }
  }, [title]);

  const getData = async () => {
    try {
      const data = await fetchArticleTitle(title);
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Read Time
  // const calculateReadTime = (text) => {
  //   const wordsPerMinute = 200;
  //   const words = text.split(" ").length;
  //   return Math.ceil(words / wordsPerMinute);
  // };

  return (
    <>
      <Head>
        <title>{article.metaTitle || article.title || "Loading..."}</title>
        <meta
          name="description"
          content={article.metaDescription || "Read this amazing article!"}
        />
        <meta name="keywords" content={article.keywords?.join(", ") || ""} />
        <meta property="og:title" content={article.metaTitle || article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={article.thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourwebsite.com/blog/${article.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.metaTitle || article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={article.thumbnail} />
        <link rel="canonical" href={`https://yourwebsite.com/blog/${article.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": article.metaTitle || article.title,
              "author": {
                "@type": "Person",
                "name": article.author,
              },
              "datePublished": article.publishedAt,
              "dateModified": article.updatedAt,
              "mainEntityOfPage": `https://yourwebsite.com/blog/${article.slug}`,
              "image": article.thumbnail,
              "publisher": {
                "@type": "Organization",
                "name": "YourWebsite",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://yourwebsite.com/logo.png",
                },
              },
            }),
          }}
        />
      </Head>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:flex text-gray-600 dark:text-gray-300 body-font min-h-screen"
      >
        <aside className="lg:w-1/4 lg:block hidden"></aside>
        
        <main className="lg:w-3/4 w-full pt-9 px-3 md:px-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold">
              {loading ? "Loading..." : article.title}
            </h1>
          </motion.header>

          <motion.section
            className="mt-4 text-md text-gray-500 dark:text-gray-400"
          >
            <p>
              by <span className="font-semibold">{article.author || "Unknown"}</span> 
              in <span className="font-semibold">{article.category || "General"}</span>
              on <time>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "N/A"}</time>
            </p>
            <p className="mt-2 text-sm">Estimated read time: {article.readingTime} mins</p>
          </motion.section>

          <motion.section className="mt-6">
            <ShareButtons />
          </motion.section>

          <motion.section className="mt-8 text-lg leading-relaxed">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-md"></div>
              </div>
            ) : (
              <>
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="rounded-lg"
                  loading="lazy"
                />
                <ParseContent value={article.content} />
              </>
            )}
          </motion.section>
          
          <div>
            <h1 className="text-3xl font-bold mt-8">Discussions ({article.comments?.length || 0})</h1>
            <EditMessage />
            <Comments commentData={article.comments || []} title={article.slug} />
          </div>
        </main>
        
        <aside className="lg:w-1/4 lg:block hidden">
          <Right />
        </aside>
      </motion.article>
    </>
  );
};

export default Blog;




