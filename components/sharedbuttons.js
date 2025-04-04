"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaLink,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";

const ShareButtons = ({ title }) => {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_URL}${pathname}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "Copied!" after 2s
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-5">
      {/* Facebook Share */}
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        <FaFacebookF size={16} />
        <span>Share</span>
      </Link>

      {/* Twitter (X) Share */}
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <FaXTwitter size={16} />
        <span>Tweet</span>
      </Link>

      {/* Instagram Profile Link */}
      <Link
        href="https://www.instagram.com/caremantrahealth/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium hover:opacity-80 transition dark:from-pink-400 dark:to-purple-500"
      >
        <FaInstagram size={16} />
        <span>Instagram</span>
      </Link>

      {/* WhatsApp Share */}
      <Link
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition dark:bg-green-400 dark:hover:bg-green-500"
      >
        <FaWhatsapp size={16} />
        <span>WhatsApp</span>
      </Link>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-400 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      >
        <FaLink size={16} />
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
};

export default ShareButtons;
