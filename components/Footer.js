"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaQuora,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 w-full">
      <div className="mx-auto max-w-screen-xl space-y-8  px-4 pt-16 pb-5 sm:px-6  lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex md:justify-normal justify-center text-teal-600 dark:text-teal-300"
            >
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <Image
                  src="/logo.jpg"
                  className="invert dark:invert-0"
                  alt="Caremantra Logo"
                  width={26}
                  height={26}
                />
                <span
                  className="text-lg md:text-[1.5rem]"
                  style={{
                    fontFamily: "'Noto Sans JP', serif",
                    fontWeight: "900",
                    background:
                      "linear-gradient(to right, #3b82f6, #a855f7, #ec4899)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  CaremantraHealth
                </span>
              </Link>
            </motion.div>

            <p className="mt-4 flex md:justify-normal justify-center text-gray-500 dark:text-gray-400">
              Your Trusted Guide to a Healthier Tomorrow
            </p>

            <motion.div
              className="mt-8 flex justify-center md:justify-normal space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                {
                  href: "https://twitter.com",
                  icon: <FaTwitter />,
                  color: "#1DA1F2",
                },
                {
                  href: "https://linkedin.com",
                  icon: <FaLinkedin />,
                  color: "#0077B5",
                },
                {
                  href: "https://wa.me",
                  icon: <FaWhatsapp />,
                  color: "#25D366",
                },
                {
                  href: "https://quora.com",
                  icon: <FaQuora />,
                  color: "#B92B27",
                },
                {
                  href: "https://instagram.com",
                  icon: <FaInstagram />,
                  color: "#E4405F",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl transition-transform transform hover:scale-110 hover:brightness-110"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          <div className="grid  grid-cols-2  pl-10  gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                Explore
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/blogs"
                    className="group relative inline-flex items-center overflow-hidden rounded-md bg-indigo-600 px-6 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:outline-none"
                  >
                    <span className="absolute -end-full transition-all duration-300 group-hover:end-4">
                      <svg
                        className="w-5 h-5 rtl:rotate-180 text-white dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>

                    <span className="text-sm font-medium transition-all duration-300 group-hover:me-4 dark:text-gray-100">
                      Blogs
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/daily-health"
                    className="group relative inline-flex items-center overflow-hidden rounded-md bg-indigo-600 px-6 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:outline-none"
                  >
                    <span className="absolute -end-full transition-all duration-300 group-hover:end-4">
                      <svg
                        className="w-5 h-5 rtl:rotate-180 text-white dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>

                    <span className="text-sm font-medium transition-all duration-300 group-hover:me-4 dark:text-gray-100">
                      Daily Health
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                Legal
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/policies/privacy-policy", label: "Privacy Policy" },
                  {
                    href: "/policies/cookies-policy",
                    label: "Terms of Service",
                  },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative inline-flex items-center overflow-hidden rounded-md bg-indigo-600 px-6 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:outline-none"
                    >
                      <span className="absolute -end-full transition-all duration-300 group-hover:end-4">
                        <svg
                          className="w-5 h-5 rtl:rotate-180 text-white dark:text-gray-200"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-medium transition-all duration-300 group-hover:me-4 dark:text-gray-100">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Disclaimer: Content is for research and informational purposes only
          and should not be considered medical advice. Please consult a doctor
          before taking any action.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          &copy; {new Date().getFullYear()} CaremantraHealth. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
