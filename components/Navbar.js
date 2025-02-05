"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "@fontsource/roboto";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session, status } = useSession();
  // console.log("Session data:, navbar mein hu bhai", session);
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const pathname = usePathname();
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  const AnimatedArrow = ({ isOpen }) => {
    return (
      <motion.svg
        className="w-3 h-3 ms-3 inline-block"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        animate={{
          rotate: isOpen ? 180 : 0, // Directly set target angle
          scale: isOpen ? 1.2 : 1, // A little bounce effect
        }}
        transition={{
          rotate: { duration: 0.4, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </motion.svg>
    );
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      const timeout = setTimeout(() => {
        signIn("google");
      }, 5000); // Delay of 2 seconds

      return () => clearTimeout(timeout); // Cleanup function to clear the timeout if the component unmounts or `status` changes
    }
  }, [status]);

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
  };

  // Toggle Blog Dropdown
  const toggleBlogDropdown = () => {
    setIsBlogDropdownOpen(!isBlogDropdownOpen);
  };

  // Toggle Info Dropdown
  const toggleInfoDropdown = () => {
    setIsInfoDropdownOpen(!isInfoDropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="z-20  fixed top-0 left-0 right-0  bg-white dark:bg-gray-950">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo.jpg"
              className="h-8 invert dark:invert-0"
              alt="Flowbite Logo"
              width={32}
              height={32}
            />

            <span
              style={{
                fontFamily: "'roboto', serif",
                fontWeight: "600",
                fontSize: "1.5rem",
                background:
                  "linear-gradient(to right, #3b82f6, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              CaremantraHealth
            </span>
          </Link>
          <div className="flex md:order-2">
            <div className="md:hidden">
              <ThemeToggleButton />
            </div>
            <button
              type="button"
              onClick={toggleNav}
              aria-controls="navbar-search"
              aria-expanded={isNavOpen}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            <div className="relative hidden md:block">
              <div className="flex gap-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-3 pl-12 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out 
    md:shadow-2xl dark:shadow-2xl shadow-pink-400/70 dark:shadow-purple-500/60 
    hover:shadow-3xl hover:shadow-pink-500/60 dark:hover:shadow-purple-600/60 
    placeholder:text-gray-400 dark:focus:ring-indigo-300 dark:focus:border-indigo-400"
                  placeholder="Search..."
                />

                {/* <div></div> */}
                <div className="flex items-center gap-5 ">
                  <ThemeToggleButton />
                  <div className="hidden md:block">
                    {session && (
                      <div className="relative mt-4 md:mt-0">
                        <button
                          onClick={() => setShowDropDown(!showDropDown)}
                          onBlur={() => {
                            setTimeout(() => {
                              setShowDropDown(false);
                            }, 300);
                          }}
                          className="flex items-center text-white"
                          aria-expanded={showDropDown}
                          aria-controls="dropdownInformation"
                        >
                          {/* Profile Image */}
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={
                                session?.user?.image || "/default-profile.png"
                              }
                              alt={`${
                                session?.user?.name || "User"
                              }'s profile picture`}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        </button>

                        <div
                          id="dropdownInformation"
                          className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                            showDropDown ? "block" : "hidden"
                          }`}
                        >
                          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {/* <div>{username}</div> */}
                            <div className="font-medium truncate">
                              {session.user.email}
                            </div>
                          </div>
                          {status === "authenticated" &&
                            adminEmails?.includes(session?.user?.email) && (
                              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                  <Link
                                    href="/admin/dashboard"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Dashboard
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/admin/articles`}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Articles
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/earnings"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Comments
                                  </Link>
                                </li>
                              </ul>
                            )}

                          <div
                            className="py-2 cursor-pointer text-center text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => signOut()}
                          >
                            Sign out
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={toggleNav}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isNavOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className={`block py-3 px-4 text-xl font-semibold rounded-md transition-all duration-300 
                    ${
                      pathname === "/"
                        ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 md:shadow-xl dark:md:shadow-blue-600/50"
                        : "text-gray-800 dark:text-gray-200"
                    } 
                    `}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>

              {/* Blogs with Dropdown */}
              <li
                className="relative group"
                onMouseEnter={() => setIsBlogDropdownOpen(true)}
                onMouseLeave={() => setIsBlogDropdownOpen(false)}
              >
                <button
                  onClick={toggleBlogDropdown}
                  className={`block  py-3 px-4 text-xl font-semibold rounded-md transition-all duration-300 
                    ${
                      pathname === "/blogs"
                        ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 md:shadow-xl dark:md:shadow-blue-600/50"
                        : "text-gray-800 dark:text-gray-200"
                    } 
                    
                    `}
                  type="button"
                >
                  <Link href={"/blogs"}>Blogs</Link>
                  <AnimatedArrow isOpen={isBlogDropdownOpen} />
                </button>

                {isBlogDropdownOpen && (
                  <div
                    className="absolute left-0  z-10 w-48 bg-white dark:bg-gray-900 rounded-lg md:shadow-lg 
        backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 
        animate-fadeIn"
                  >
                    <ul
                      className="py-2 text-sm text-gray-900 dark:text-gray-200"
                      onMouseLeave={() => setIsBlogDropdownOpen(false)}
                    >
                      {["Alpha", "Beta", "Gamma"].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block px-4 py-2 rounded-md transition-all duration-200 
                hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 
                dark:hover:from-gray-700 dark:hover:to-gray-800 
                hover:text-white dark:hover:text-gray-100"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Daily Health */}
              <li>
                <Link
                  href="/daily-health"
                  className={`block py-3 px-4 text-xl font-semibold rounded-md transition-all duration-300 
                    ${
                      pathname === "/daily-health"
                        ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 md:shadow-xl dark:md:shadow-blue-600/50"
                        : "text-gray-800 dark:text-gray-200"
                    } 
                    `}
                >
                  Daily Health
                </Link>
              </li>

              {/* Tools */}
              <li
                className="relative group"
                onMouseEnter={() => {
                  setIsToolsDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setIsToolsDropdownOpen(false);
                }}
              >
                <button
                  onClick={toggleToolsDropdown}
                  className={`block py-3 px-4 text-xl font-semibold rounded-md transition-all duration-300 
                      ${
                        pathname === "/tools"
                          ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 md:shadow-xl dark:md:shadow-blue-600/50"
                          : "text-gray-800 dark:text-gray-200"
                      } 
                      `}
                  type="button"
                >
                  <Link href={"/tools"}>Tools</Link>

                  <AnimatedArrow isOpen={isToolsDropdownOpen} />
                </button>

                {isToolsDropdownOpen && (
                  <div
                    className="absolute left-0  z-10 w-48 bg-white dark:bg-gray-900 rounded-lg md:shadow-lg 
            backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 
            animate-fadeIn"
                  >
                    <ul
                      className="py-2 text-sm text-gray-900 dark:text-gray-200"
                      onMouseLeave={() => setIsToolsDropdownOpen(false)}
                    >
                      {["Tool 1", "Tool 2", "Tool 3"].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block px-4 py-2 rounded-md transition-all duration-200 
                    hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 
                    dark:hover:from-gray-700 dark:hover:to-gray-800 
                    hover:text-white dark:hover:text-gray-100"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Info with Dropdown */}
              <li
                className="relative group"
                onMouseEnter={() => setIsInfoDropdownOpen(true)}
                onMouseLeave={() => setIsInfoDropdownOpen(false)}
              >
                <button
                  onClick={toggleInfoDropdown}
                  className="text-xl font-semibold block py-3 px-4 rounded-md transition-all duration-300 
  text-gray-900 dark:text-gray-100 
  "
                  type="button"
                >
                  Info
                  <AnimatedArrow isOpen={isInfoDropdownOpen} />
                </button>

                {isInfoDropdownOpen && (
                  <div
                    className="absolute left-0  z-10 w-48 bg-white dark:bg-gray-900 rounded-lg md:shadow-lg 
        backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 
        animate-fadeIn"
                    onMouseLeave={() => setIsInfoDropdownOpen(false)}
                  >
                    <ul className="py-2 text-sm text-gray-900 dark:text-gray-200">
                      {[
                        "About",
                        "Privacy Policy",
                        "Terms of Service",
                        "Cookie Policy",
                      ].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block px-4 py-2 rounded-md transition-all duration-200 
                hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 
                dark:hover:from-gray-700 dark:hover:to-gray-800 
                hover:text-white dark:hover:text-gray-100"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
