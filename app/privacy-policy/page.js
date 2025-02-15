"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <section className="text-gray-300 bg-gray-900 dark:bg-black body-font">
      <div className="container mx-auto px-5 py-24">
        
        {/* Privacy Policy Heading */}
        <motion.h1
          className="text-5xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Privacy Policy
        </motion.h1>

        {/* Introduction */}
        <p className="text-lg text-center text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Welcome to **Care Mantra Health**. Your privacy is critically important to us.  
          This Privacy Policy explains how we **collect, use, and protect your personal information** when you use our website.
        </p>

        {/* What Information We Collect */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🔍 What Information We Collect
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We **only collect the following information** when you sign in using Google:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>🔹 **Google Email** (to identify you for comments and features)</li>
            <li>🔹 **Google Profile Picture** (for displaying your avatar in comments)</li>
          </ul>
          <p className="mt-4 text-gray-400">
            **We do not collect any other personal data, browsing history, or device information.**  
            Your data remains **secure and private** at all times.
          </p>
        </div>

        {/* How We Use Your Information */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ⚙️ How We Use Your Information
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Your data is used **solely to improve your experience** on our platform:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>✅ Displaying your **profile picture and name** in comments.</li>
            <li>✅ Enabling **seamless login across multiple devices**.</li>
            <li>✅ Keeping track of your **comment history and interactions**.</li>
          </ul>
          <p className="mt-4 text-gray-400">
            We **do not share, sell, or distribute** your data to any third-party companies or advertisers.
          </p>
        </div>

        {/* Data Security */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🔒 Data Security & Protection
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We take **serious measures** to protect your personal data:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>🔹 Your data is stored securely with **encryption protocols**.</li>
            <li>🔹 We use **Google OAuth authentication**, so we never see your password.</li>
            <li>🔹 Our website follows **best security practices** to prevent unauthorized access.</li>
          </ul>
          <p className="mt-4 text-gray-400">
            Your **privacy and security are our top priorities**.
          </p>
        </div>

        {/* Data Retention Policy */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🗑️ Data Retention & Deletion
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We **only store your Google email and profile picture** as long as you use our website.  
            You can delete your data anytime by:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>✅ **Removing your Google account** from our platform.</li>
            <li>✅ **Manually deleting your comments**, which will remove your profile from them.</li>
            <li>✅ Contacting us at <a href="mailto:support@caremantrahealth.com" className="text-blue-500 hover:underline">support@caremantrahealth.com</a> for assistance.</li>
          </ul>
        </div>

        {/* Third-Party Services */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🔗 Third-Party Services
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We **do not** share your data with advertisers, but our website may use third-party services like:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>🔹 **Google Analytics** (for anonymous website traffic insights).</li>
            <li>🔹 **Google OAuth** (for secure authentication).</li>
          </ul>
        </div>

        {/* User Rights */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🏛️ Your Rights
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            As a user, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>✅ **Access and review** your stored data.</li>
            <li>✅ **Request deletion** of your data.</li>
            <li>✅ **Withdraw consent** to use your Google profile.</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            📩 Contact Us
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            If you have any concerns about our Privacy Policy, feel free to contact us at:
          </p>
          <p className="text-blue-500 mt-2 text-lg">
            <a href="mailto:support@caremantrahealth.com" className="hover:underline">support@caremantrahealth.com</a>
          </p>
        </div>

      </div>
    </section>
  );
}
