"use client";

import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/actions/useractions";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const BlogCarousel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchArticles();
      setArticles(data.slice(0, 10));
    };
    getData();
  }, []);

  const currentTime = new Date();

  return (
    <div className="relative w-full p-2">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        loop
        className="w-full"
      >
        {articles
          .filter((article) => {
            const publishedAt = new Date(article.publishedAt);
            return article.status === "published" && publishedAt < currentTime;
          })
          .map((article) => (
            <SwiperSlide key={article.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-transform duration-500"
              >
                <Link href={`/blogs/${article.slug}`} passHref>
                  <div className="relative w-full h-64 md:h-80 group">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
                    <div className="absolute bottom-5 left-5 right-5 text-white bg-gradient-to-t from-black/60 to-transparent p-4 rounded-lg">
                      <h2 className="text-lg md:text-xl font-bold">
                        {article.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default BlogCarousel;
