"use client";

import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <section className="text-gray-300 bg-gray-900 dark:bg-black body-font">
      <div className="container mx-auto px-5 py-24">
        
        {/* Terms of Service Heading */}
        <motion.h1
          className="text-5xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Terms of Service
        </motion.h1>

        {/* Introduction */}
        <p className="text-lg text-center text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Welcome to **Care Mantra Health**. By accessing or using our website,  
          you agree to comply with our Terms of Service. Please read them carefully.
        </p>

        {/* Acceptance of Terms */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ✅ Acceptance of Terms
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            By using **Care Mantra Health**, you agree to follow these terms.  
            If you **do not agree**, please do not use our services.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🔄 Changes to Terms
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We may update these terms from time to time.  
            We will notify users about major changes through email or website notifications.
          </p>
        </div>

        {/* User Accounts */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            👤 User Accounts & Responsibilities
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Users may create an account using **Google OAuth**.  
            You are responsible for maintaining your account security.
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>✅ You must provide **accurate** information.</li>
            <li>✅ You are responsible for **your activity** on the website.</li>
            <li>✅ You **cannot share** your account with others.</li>
          </ul>
        </div>

        {/* Prohibited Activities */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🚫 Prohibited Activities
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Users are prohibited from engaging in activities including:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>❌ Spamming or harassing other users.</li>
            <li>❌ Posting false or misleading information.</li>
            <li>❌ Attempting to hack, disrupt, or modify our services.</li>
            <li>❌ Uploading malicious code or viruses.</li>
            <li>❌ Violating **intellectual property rights**.</li>
          </ul>
        </div>

        {/* Content Ownership */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ✍️ Content Ownership & Copyright
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Any content **you post** (comments, reviews, articles) remains **yours**,  
            but by posting, you grant us a **license to display** it.
          </p>
          <p className="mt-4 text-gray-400">
            All website content (articles, designs, branding) belongs to **Care Mantra Health**  
            and **cannot be copied or reused** without permission.
          </p>
        </div>

        {/* Disclaimer of Liability */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ⚠️ Disclaimer of Liability
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We provide health blogs and news for **informational purposes only**.  
            **We are not responsible** for any decisions made based on our content.
          </p>
        </div>

        {/* Termination of Accounts */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🚀 Account Suspension & Termination
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We reserve the right to suspend or terminate accounts for:
          </p>
          <ul className="list-disc pl-6 text-gray-400">
            <li>❌ Violating our Terms of Service.</li>
            <li>❌ Engaging in illegal activities.</li>
            <li>❌ Misusing our platform.</li>
          </ul>
        </div>

        {/* Governing Law */}
        <div className="mt-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ⚖️ Governing Law
          </motion.h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            These terms are governed by the laws of **India**.  
            Any legal disputes will be handled in **Indian courts**.
          </p>
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
            If you have any questions about these Terms, contact us at:
          </p>
          <p className="text-blue-500 mt-2 text-lg">
            <a href="mailto:support@caremantrahealth.com" className="hover:underline">support@caremantrahealth.com</a>
          </p>
        </div>

      </div>
    </section>
  );
}
