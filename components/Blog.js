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
import DisplayBlogs from "./Blogs";
import { updateViewCount } from "@/actions/useractions";
import LoadingSkeleton from "./Skeleton";

const SingleBlog = () => {
  const pathname = usePathname();
  const title = decodeURIComponent(pathname.split("/").pop() || "");
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    if (article.slug) {
      updateViews();
    }
  }, [article.slug]);

  const getData = async () => {
    try {
      const data = await fetchArticleTitle(title);
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const updateViews = async () => {
    if (!article.slug) return; // Ensure article is available

    const viewedArticles =
      JSON.parse(localStorage.getItem("viewedArticles")) || {};
    console.log("viewwed article are", viewedArticles);
    if (!viewedArticles[article.slug]) {
      try {
        await updateViewCount(article.slug);
        viewedArticles[article.slug] = true;
        localStorage.setItem("viewedArticles", JSON.stringify(viewedArticles));
      } catch (error) {
        console.error("Error updating views:", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{article.metaTitle || article.title || "Loading..."}</title>
        <meta
          name="description"
          content={article.metaDescription || "Read this amazing article!"}
        />
        <meta name="keywords" content={article.keywords?.join(", ") || ""} />

        {/* 🔥 ADD TAGS HERE */}
        <meta name="article:tag" content={article.tags?.join(", ") || ""} />

        <meta
          property="og:title"
          content={article.metaTitle || article.title}
        />
        <meta property="og:description" content={article.metaDescription} />
        <meta
          property="og:image"
          content={`https://caremantrahealth.com${article.thumbnail}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://caremantrahealth.com/blogs/${article.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={article.metaTitle || article.title}
        />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta
          name="twitter:image"
          content={`https://caremantrahealth.com${article.thumbnail}`}
        />
        <link
          rel="canonical"
          href={`https://caremantrahealth.com/blogs/${article.slug}`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.metaTitle || article.title,
              author: { "@type": "Person", name: article.author },
              datePublished: article.publishedAt
                ? new Date(article.publishedAt).toISOString()
                : undefined,
              dateModified: article.updatedAt
                ? new Date(article.updatedAt).toISOString()
                : undefined,

              mainEntityOfPage: `https://caremantrahealth.com/blogs/${article.slug}`,
              image: article.thumbnail,
              publisher: {
                "@type": "Organization",
                name: "Caremantrahealth.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://caremantrahealth.com/logo.jpg",
                },
              },
              // 🔥 ADD TAGS TO STRUCTURED DATA
              keywords: article.tags || [],
            }),
          }}
        />
      </Head>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:flex text-gray-600 dark:text-gray-300 body-font min-h-screen"
        >
          <aside className="lg:w-1/5 lg:block hidden"></aside>

          <main className="lg:w-3/5 w-full pt-9 px-3 md:px-12">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-transform duration-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {loading ? "Loading..." : article.title}
              </h1>
            </motion.header>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/50"
            >
              <p className="text-md font-medium text-gray-600 dark:text-gray-300">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {article.author || "Unknown"}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Published on{" "}
                <time className="font-semibold text-gray-700 dark:text-gray-300">
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : "N/A"}
                </time>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                ⏳ {article.readingTime} min read
              </p>
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
                    alt={article.title}
                    src={
                      article.thumbnail || "https://via.placeholder.com/600x400"
                    }
                    width={"600"}
                    height={"400"}
                    className={`${"max-h-56 sm:max-h-[500px]   w-full rounded-xl object-cover shadow-xl"} transition group-hover:grayscale-[50%] dark:shadow-gray-700/25`}
                    loading="lazy"
                    onError={() =>
                      console.error("Image failed to load:", article.thumbnail)
                    }
                  />

                  <ParseContent value={article.content} />
                </>
              )}
            </motion.section>

            <div>
              <h1 className="text-3xl font-bold pb-4 pl-3 mt-8">
                Discussions
                {/* ({article.comments?.length || 0}) */}
              </h1>
              <EditMessage />
              <Comments
                commentData={article.comments || []}
                title={article.slug}
              />
            </div>
            <div className="md:hidden">
              <h1 className="text-3xl  font-bold mt-8">Related Articles</h1>
              <DisplayBlogs aside={true} />
            </div>
          </main>

          <aside className="lg:w-1/5 lg:block hidden">
            <Right />
          </aside>
        </motion.article>
      )}
    </>
  );
};

export default SingleBlog;
