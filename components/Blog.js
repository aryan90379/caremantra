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
import Image from "next/image";
import DisplayBlogs from "./Blogs";
import { updateViewCount } from "@/actions/useractions";


export const metadata = ({ params }) => {
  const article = getArticle(params.slug);
  return {
    title: article?.metaTitle || "Default Title",
    description: "Your guide to Today's Healthcare",
  };
};

const LoadingSkeleton = () => (
  <div
    role="status"
    className="flex items-center justify-center h-56 max-w-sm mx-auto bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
  >
    <svg
      className="w-10 h-10 text-gray-200 dark:text-gray-600"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 20"
    >
      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);




const Blog = () => {
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };



  
  const updateViews = async () => {
    if (!article.slug) return; // Ensure article is available
  
    const viewedArticles = JSON.parse(localStorage.getItem("viewedArticles")) || {};
  console.log("viewwed article are",viewedArticles);
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
      ):(
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
          >
            <h1 className="text-4xl font-bold">
              {loading ? "Loading..." : article.title}
            </h1>
          </motion.header>

          <motion.section className="mt-4 text-md text-gray-500 dark:text-gray-400">
            <p>
              by{" "}
              <span className="font-semibold">
                {article.author || "Unknown"}
              </span>{" "}
              in{" "}
              <span className="font-semibold">
                {article.category || "General"}
              </span>{" "}
              Category on{" "}
              <time>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : "N/A"}
              </time>
            </p>
            <p className="mt-2 text-sm">
              Estimated read time: {article.readingTime} mins
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

export default Blog;
