"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TermsOfService() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 2000);
  }, []);

  return (
    <section className="text-gray-300 bg-gray-900 dark:bg-black body-font">
      <div className="container mx-auto px-5 py-24">
        {/* Heading with Animation */}
        <motion.h1
          className="text-5xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Terms of Service
        </motion.h1>

        {/* Introduction */}
        <motion.p
          className="text-lg text-center text-gray-400 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Welcome to <strong>Care Mantra Health</strong>. These Terms of Service outline the rules and regulations
          for using our platform. By accessing or using our website, you agree to comply with these terms.
        </motion.p>

        {/* Content Sections */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 space-y-12"
          >
            {/* Acceptance of Terms */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">✅ Acceptance of Terms</h2>
              <p className="text-gray-400 text-lg">
                By using <strong>Care Mantra Health</strong>, you acknowledge and agree to abide by our terms.
                If you do not agree with any part of these terms, please refrain from using our services.
              </p>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">🔄 Changes to Terms</h2>
              <p className="text-gray-400 text-lg">
                We reserve the right to modify these terms at any time. Users will be notified of significant updates
                via email or website notifications. Continued use of the platform after changes means you accept
                the new terms.
              </p>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">👤 User Responsibilities</h2>
              <p className="text-gray-400 text-lg">
                Users must provide accurate information when registering and are responsible for maintaining the
                security of their accounts. Any suspicious or unauthorized activity should be reported immediately.
              </p>
            </motion.div>

            {/* Prohibited Activities */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">🚫 Prohibited Activities</h2>
              <ul className="list-disc pl-6 text-gray-400">
                <li>Spamming, harassing, or misleading users.</li>
                <li>Uploading viruses or malicious software.</li>
                <li>Unauthorized access to other accounts.</li>
                <li>Violating any local or international laws.</li>
              </ul>
            </motion.div>

            {/* Content Ownership */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">✍️ Content Ownership</h2>
              <p className="text-gray-400 text-lg">
                Users retain ownership of the content they post but grant <strong>Care Mantra Health</strong>
                a license to display it. Website content cannot be copied without permission.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">📩 Contact Us</h2>
              <p className="text-gray-400 text-lg">
                If you have any concerns or questions regarding these terms, reach out to us at:
              </p>
              <p className="text-blue-500 mt-2 text-lg">
                <a href="mailto:support@caremantrahealth.com" className="hover:underline">
                  support@caremantrahealth.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}