"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <section className="text-gray-300 bg-gray-900 dark:bg-black body-font">
      
      {/* Cookie Policy Header */}
      <div className="container mx-auto px-5 py-24">
        <motion.h1
          className="text-5xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Cookie Policy
        </motion.h1>
        <p className="text-lg text-center text-gray-400 leading-relaxed max-w-3xl mx-auto">
          This Cookie Policy explains how **Care Mantra Health** uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control their usage.
        </p>
      </div>

      {/* What Are Cookies? */}
      <div className="container mx-auto px-5 py-12">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🍪 What Are Cookies?
        </motion.h2>
        <p className="text-lg leading-relaxed text-gray-400">
          Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit a website. They help websites remember information about your visit, making your experience more personalized and efficient.
        </p>
      </div>

      {/* Types of Cookies */}
      <div className="container mx-auto px-5 py-12">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🏷️ Types of Cookies We Use
        </motion.h2>
        <ul className="text-lg text-gray-400 list-disc list-inside">
          <li><strong>Essential Cookies:</strong> Necessary for website functionality and security.</li>
          <li><strong>Analytical Cookies:</strong> Help us analyze how users interact with our site.</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.</li>
          <li><strong>Preference Cookies:</strong> Store user preferences for a better experience.</li>
        </ul>
      </div>

      {/* Managing Cookies */}
      <div className="container mx-auto px-5 py-12">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ⚙️ Managing Cookies
        </motion.h2>
        <p className="text-lg leading-relaxed text-gray-400">
          You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect your website experience.
        </p>
      </div>

      {/* Legal Compliance */}
      <div className="container mx-auto px-5 py-12">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🛡️ Legal Compliance
        </motion.h2>
        <p className="text-lg leading-relaxed text-gray-400">
          We comply with GDPR, CCPA, and other privacy regulations. You have the right to access, delete, or modify your cookie preferences at any time.
        </p>
      </div>
    </section>
  );
}
