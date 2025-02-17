"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function PrivacyPolicy() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 2000);
  }, []);

  return (
    <section className="text-gray-300 bg-gray-900 dark:bg-black body-font overflow-hidden">
      <div className="container mx-auto px-5 py-24">
        
        {/* Typing Animation Header */}
        <motion.h1
          className="text-5xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typewriter words={["Privacy Policy"]} loop={1} cursor cursorStyle="|" typeSpeed={50} />
        </motion.h1>
        
        {/* Introduction */}
        <motion.p
          className="text-lg text-center text-gray-400 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Welcome to Care Mantra Health. Your privacy is of utmost importance to us. This Privacy Policy serves to provide you with a detailed explanation of what data we collect, why we collect it, and how it is used to improve your experience while ensuring top-notch security measures.
        </motion.p>

        {/* Animated Sections */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 space-y-12"
          >
            {/* Information Collection */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">🔍 What Information We Collect</h2>
              <p className="text-gray-400 text-lg">We collect only the necessary information when you sign in with Google, ensuring minimal data usage:</p>
              <ul className="list-disc pl-6 text-gray-400 mt-2">
                <li>📧 <strong>Google Email:</strong> This is used to uniquely identify you across our platform, enabling personalized services like remembering your interactions and providing a seamless experience.</li>
                <li>🖼️ <strong>Google Profile Picture:</strong> This is used solely for displaying your avatar in comments and enhancing social interactions within our platform.</li>
              </ul>
              <p className="mt-4 text-gray-400">We do not track or store any additional personal data, including your browsing history, device details, or sensitive private information.</p>
            </motion.div>

            {/* Data Usage */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">⚙️ How We Use Your Data</h2>
              <p className="text-gray-400 text-lg">We leverage your data to provide a smooth and enhanced user experience. Here’s how:</p>
              <ul className="list-disc pl-6 text-gray-400 mt-2">
                <li>✅ <strong>Displaying Profile Information:</strong> Your profile picture and name are displayed in comments, fostering a more interactive community.</li>
                <li>✅ <strong>Seamless Login:</strong> By using Google authentication, you can access your account across multiple devices without needing to remember passwords.</li>
                <li>✅ <strong>Comment and Interaction History:</strong> Your previous interactions and comments are stored so that you can keep track of your participation on the platform.</li>
              </ul>
              <p className="mt-4 text-gray-400">We ensure that your data is never shared, sold, or used for advertising purposes.</p>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">🔒 Data Security</h2>
              <p className="text-gray-400 text-lg">We implement rigorous security protocols to ensure your information remains safe:</p>
              <ul className="list-disc pl-6 text-gray-400 mt-2">
                <li>🔹 <strong>Encryption:</strong> All data stored is protected using advanced encryption methods to prevent unauthorized access.</li>
                <li>🔹 <strong>Secure Authentication:</strong> Google OAuth authentication ensures that your login credentials remain private and secure.</li>
                <li>🔹 <strong>Strict Access Controls:</strong> Only authorized systems and personnel can access data, ensuring an additional layer of security.</li>
              </ul>
              <p className="mt-4 text-gray-400">We continuously update our security measures to stay ahead of potential threats.</p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">📩 Contact Us</h2>
              <p className="text-gray-400 text-lg">If you have any concerns about data privacy, feel free to reach out to us:</p>
              <p className="text-blue-500 mt-2 text-lg">
                <a href="mailto:support@caremantrahealth.com" className="hover:underline">support@caremantrahealth.com</a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}