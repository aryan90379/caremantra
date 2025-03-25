"use client";

import Head from "next/head";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaQuora, FaInstagram } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <title>About Us - Care Mantra Health</title>
        <meta name="description" content="Care Mantra Health provides trusted, well-researched health information. Get expert-backed insights on wellness, nutrition, and medical advancements." />
        <meta name="keywords" content="health, wellness, medical advancements, nutrition, fitness, disease prevention, Care Mantra Health" />
        <meta name="author" content="Care Mantra Health" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Social Media Meta */}
        <meta property="og:title" content="About Us - Care Mantra Health" />
        <meta property="og:description" content="Care Mantra Health offers accurate, fact-checked health insights from trusted medical sources like WHO and top experts." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://caremantrahealth.com/about-us" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Care Mantra Health" />
        <meta name="twitter:description" content="Explore trusted, expert-reviewed health insights at Care Mantra Health." />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      <section className="relative body-font text-gray-900 dark:text-gray-200 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-blue-900 to-purple-900 dark:from-black dark:to-gray-900"></div>

        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-10">About Us</h1>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto text-gray-300">
            Welcome to <span className="text-blue-300 font-semibold">Care Mantra Health</span>, your 
            <strong> one-stop destination for trusted health information.</strong> Founded on 
            <strong> November 1, 2004</strong>, we are dedicated to providing 
            <strong> well-researched, expert-reviewed health insights</strong> to help individuals make informed decisions.
          </p>
        </div>

        {/* Our Mission */}
        <div className="container mx-auto space-y-16 py-16 px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-300 mb-6">🌍 Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At <span className="text-blue-300 font-semibold">Care Mantra Health</span>, our goal is to 
              <strong> simplify complex medical information</strong> so that individuals can make better health choices.
              We prioritize credibility, relying on sources like the <strong>World Health Organization (WHO)</strong> and 
              top medical institutions.
            </p>
          </div>

          {/* Why Choose Us? */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">💡 Why Choose Us?</h2>
            <ul className="text-lg text-gray-300 leading-relaxed list-disc list-inside">
              <li><strong>No Industry Partnerships</strong> – We are <span className="text-blue-300 font-semibold">completely independent</span>.</li>
              <li><strong>Fact-Checked Content</strong> – Our writers <span className="text-blue-300 font-semibold">verify details</span> across multiple sources.</li>
              <li><strong>Expert-Reviewed</strong> – We consult <span className="text-blue-300 font-semibold">medical professionals</span> for accuracy.</li>
              <li><strong>Comprehensive Articles</strong> – We provide <span className="text-blue-300 font-semibold">detailed comparisons</span>, not just summaries.</li>
              <li><strong>Latest Updates</strong> – Subscribe to <span className="text-blue-300 font-semibold">stay informed</span> about health news.</li>
            </ul>
          </div>

          {/* Explore Blogs */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">🚀 Explore Our Blogs</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Read the latest on <strong>healthcare, wellness, and medical breakthroughs</strong>. Our articles cover 
              <strong> nutrition, mental health, fitness, and more.</strong>
            </p>
            <div className="mt-6">
              <Link href="/blogs" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition">
                Read Our Blogs
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-300 mb-6">📩 Get in Touch</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Have questions? Visit our <Link href="/contact-us" className="text-blue-400 hover:underline">Contact Us</Link> page.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">🌐 Follow Us</h2>
            <div className="flex justify-center gap-6">
              <a href="https://x.com/Caremantrahelth" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#1DA1F2]"><FaTwitter /></a>
              <a href="https://www.linkedin.com/in/caremantra-health-7b3492255" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#0077B5]"><FaLinkedin /></a>
              <a href="https://whatsapp.com/channel/0029VapOOK52Jl8HMUYYGG3w" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#25D366]"><FaWhatsapp /></a>
              <a href="https://www.quora.com/profile/CareMantraHealth" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#B92B27]"><FaQuora /></a>
              <a href="https://www.instagram.com/caremantrahealth/" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#E4405F]"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
