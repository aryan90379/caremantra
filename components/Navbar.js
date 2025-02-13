"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "@fontsource/roboto";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { fetchArticles } from "@/actions/useractions";
import Breadcrumb from "./BreadCrumb";

const Navbar = () => {
  const { data: session, status } = useSession();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const renderInfoDropdown = () => (
    <ul className="md:py-2  text-xl md:text-sm text-gray-900 dark:text-gray-200">
      {["About", "Privacy Policy", "Terms of Service", "Cookie Policy"].map(
        (item) => (
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
        )
      )}
    </ul>
  );

  const renderToolsDropdown = () => (
    <ul className="py-2 text-xl font-medium pl-8  md:pl-0  md:text-sm text-gray-900 dark:text-gray-200">
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
  );

  const renderBlogDropdown = () => (
    <ul className="py-2  text-xl font-medium pl-8 md:text-sm md:pl-0 text-gray-900 dark:text-gray-200">
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
  );

  const getData = async () => {
    const data = await fetchArticles();
    setArticles(data);
    setFilteredArticles(data);
  };

  //search bar implementation
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredArticles(articles);
      return;
    }
    const matchedArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(matchedArticles);
  };

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
      <nav className="z-20  fixed top-0 left-0 right-0 max-h-fit bg-white dark:bg-gray-950">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo.jpg"
              className=" invert dark:invert-0"
              alt="Flowbite Logo"
              width={26}
              height={26}
            />

            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+JP:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            </style>

            <span
              className="text-lg md:text-[1.5rem]"
              style={{
                fontFamily: "'Noto Sans JP', serif",
                fontWeight: "900",
                // fontSize: "1.5rem",
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
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
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
                <div>
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full rounded-full p-3 pl-12 text-sm text-gray-900 border border-gray-300  bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out 
    md:shadow-2xl dark:shadow-2xl shadow-pink-400/70 dark:shadow-purple-500/60 
    hover:shadow-3xl hover:shadow-pink-500/60 dark:hover:shadow-purple-600/60 
    placeholder:text-gray-400 dark:focus:ring-indigo-300 dark:focus:border-indigo-400"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value); // Update the state
                      handleSearch(); // Trigger the search function with the new value
                    }}
                    onFocus={() => setIsFocused(true)} // Set focus state to true
                    onBlur={() => setTimeout(() => setIsFocused(false), 300)} // Delay closing to allow click event
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(); // Call the same search handler used by the button
                      }
                    }}
                  />

                  {/* showing articles in search bar */}
                  {isFocused && (
                    <div className="forlarge absolute hidden lg:block  top-full z-[9999] mt-2 w-9/12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-200 dark:scrollbar-thumb-purple-500 dark:scrollbar-track-gray-700 transition-all duration-300 ease-in-out hover:shadow-2xl">
                      {filteredArticles.length > 0 ? (
                        filteredArticles.slice(0, 10).map((article, idx) => (
                          <Link
                            href={`/blogs/${article.slug}`}
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                            passHref
                          >
                            <Image
                              alt={article.title}
                              src={
                                article.thumbnail ||
                                "https://via.placeholder.com/50"
                              }
                              width={50}
                              height={50}
                              className="w-12 h-12 rounded-md object-cover shadow-md"
                            />
                            <p className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                              {article.title}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p className="p-3 text-center text-gray-600 dark:text-gray-400">
                          No results found.
                        </p>
                      )}
                    </div>
                  )}
                </div>

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
                            <div className="font-medium  truncate">
                              {session.user.email.split('@')[0]}
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
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
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
              <div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full rounded-full p-3 pl-12 text-sm text-gray-900 border border-gray-300  bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out 
    md:shadow-2xl dark:shadow-2xl shadow-pink-400/70 dark:shadow-purple-500/60 
    hover:shadow-3xl hover:shadow-pink-500/60 dark:hover:shadow-purple-600/60 
    placeholder:text-gray-400 dark:focus:ring-indigo-300 dark:focus:border-indigo-400"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value); // Update the state
                    handleSearch(); // Trigger the search function with the new value
                  }}
                  onFocus={() => setIsFocused(true)} // Set focus state to true
                  onBlur={() => setTimeout(() => setIsFocused(false), 300)} // Delay closing to allow click event
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(); // Call the same search handler used by the button
                    }
                  }}
                />

                {/* for small devices */}
                {isFocused && (
                  <div className="absolute llg:hidden   top-full z-[9999] mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-200 dark:scrollbar-thumb-purple-500 dark:scrollbar-track-gray-700 transition-all duration-300 ease-in-out hover:shadow-2xl">
                    {filteredArticles.length > 0 ? (
                      filteredArticles.slice(0, 10).map((article, idx) => (
                        <Link
                          href={`/blogs/${article.slug}`}
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                          passHref
                        >
                          <Image
                            alt={article.title}
                            src={
                              article.thumbnail ||
                              "https://via.placeholder.com/50"
                            }
                            width={50}
                            height={50}
                            className="w-12 h-12 rounded-md object-cover shadow-md"
                          />
                          <p className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                            {article.title}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <p className="p-3 text-center text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
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
                  className={`block py-3 px-4 text-xl font-semibold rounded-md transition-all duration-300 
      ${
        pathname === "/blogs"
          ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 md:shadow-xl dark:md:shadow-blue-600/50"
          : "text-gray-800 dark:text-gray-200"
      }`}
                  type="button"
                >
                  <Link href={"/blogs"}>Blogs</Link>
                  <AnimatedArrow isOpen={isBlogDropdownOpen} />
                </button>

                {/* Dropdown inside "Blogs" (For md and larger) */}
                {isBlogDropdownOpen && (
                  <div
                    className="absolute left-0 z-10 w-48 bg-white dark:bg-gray-950 rounded-lg md:shadow-lg 
      backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 
      animate-fadeIn hidden md:block"
                  >
                    {renderBlogDropdown()}
                  </div>
                )}
              </li>

              {/* Dropdown appended after "Blogs" (For small screens) */}
              {isBlogDropdownOpen && (
                <li className="md:hidden ">{renderBlogDropdown()}</li>
              )}

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
              {/* Tools List Item */}
              <li
                className="relative group"
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                onMouseLeave={() => setIsToolsDropdownOpen(false)}
              >
                <button
                  onClick={toggleToolsDropdown}
                  className={`block py-3 px-4 text-xl font-semibold rounded-md transition-all duration-300 
      ${
        pathname === "/tools"
          ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 md:shadow-xl dark:md:shadow-blue-600/50"
          : "text-gray-800 dark:text-gray-200"
      }`}
                  type="button"
                >
                  <Link href={"/tools"}>Tools</Link>
                  <AnimatedArrow isOpen={isToolsDropdownOpen} />
                </button>

                {/* Dropdown inside "Tools" (For md and larger) */}
                {isToolsDropdownOpen && (
                  <div
                    className="absolute left-0 z-10 w-48 bg-white dark:bg-gray-950 rounded-lg md:shadow-lg 
      backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 
      animate-fadeIn hidden md:block"
                  >
                    {renderToolsDropdown()}
                  </div>
                )}
              </li>

              {/* Dropdown appended after "Tools" (For small screens) */}
              {isToolsDropdownOpen && (
                <li className="md:hidden">{renderToolsDropdown()}</li>
              )}

              {/* Info with Dropdown */}
              {/* Info List Item */}
              <li
                className="relative group hidden md:block"
                onMouseEnter={() => setIsInfoDropdownOpen(true)}
                onMouseLeave={() => setIsInfoDropdownOpen(false)}
              >
                <button
                  onClick={toggleInfoDropdown}
                  className="text-xl font-semibold block py-3 px-4 rounded-md transition-all duration-300 
      text-gray-900 dark:text-gray-100"
                  type="button"
                >
                  Info
                  <AnimatedArrow isOpen={isInfoDropdownOpen} />
                </button>

                {/* Dropdown inside "Info" (For md and larger) */}
                {isInfoDropdownOpen && (
                  <div
                    className="absolute left-0 z-10 w-48 bg-white dark:bg-gray-900 rounded-lg md:shadow-lg 
      backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 
      animate-fadeIn hidden md:block"
                  >
                    {renderInfoDropdown()}
                  </div>
                )}
              </li>

              {<li className="md:hidden">{renderInfoDropdown()}</li>}
            </ul>
          </div>
        </div>
        <div className={`  ${isNavOpen ? "hidden" : "block"}`}>
          <Breadcrumb />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
