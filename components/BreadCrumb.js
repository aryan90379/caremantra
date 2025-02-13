"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

const Breadcrumb = () => {
  const pathname = usePathname() || "/"; // Fallback for stability

  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${array.slice(0, index + 1).join("/")}`,
    }));

  return (
    <nav className="flex px-7 pb-1" aria-label="Breadcrumb"> {/* Add consistent padding */}
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <HomeIcon className="w-4 h-4 me-2.5" aria-hidden="true" />
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>

            {index === pathSegments.length - 1 ? (
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                {segment.name}
              </span>
            ) : (
              <Link
                href={segment.href}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {segment.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
