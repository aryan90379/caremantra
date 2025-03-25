"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaQuora, FaInstagram } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 w-full">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Logo and Intro */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-3">
            <img 
  src="/logo.jpg" 
  alt="CareMantra Health Logo" 
  width="30" 
  height="30" 
  className="invert dark:invert-0" 
  loading="lazy"
/>

              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                CareMantraHealth
              </span>
            </Link>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Your Trusted Guide to a Healthier Tomorrow.
            </p>

            {/* Social Icons */}
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              {[
                { href: "https://x.com/Caremantrahelth?t=bunMPfaWQqiUC5TgyMLfEA&s=09", icon: FaTwitter, color: "#1DA1F2" },
                { href: "https://www.linkedin.com/in/caremantra-health-7b3492255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: FaLinkedin, color: "#0077B5" },
                { href: "https://whatsapp.com/channel/0029VapOOK52Jl8HMUYYGG3w", icon: FaWhatsapp, color: "#25D366" },
                { href: "https://www.quora.com/profile/CareMantraHealth?ch=10&oid=2066029641&share=05a360cc&srid=hKYL7I&target_type=user", icon: FaQuora, color: "#B92B27" },
                { href: "https://www.instagram.com/caremantrahealth/", icon: FaInstagram, color: "#E4405F" },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:opacity-80 transition-opacity"
                  aria-label={social.href}
                >
                  <social.icon style={{ color: social.color }} />
                </a>
              ))}
            </div>

            {/* Sign In / Sign Out */}
            <div className="mt-4">
              {session ? (
                <button 
                  onClick={() => signOut()} 
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={() => signIn()} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Explore Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Explore</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/blogs" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/about-us", label: "About Us" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/cookie-policy", label: "Cookie Policy" },
                { href: "/contact-us", label: "Contact Us" },
                { href: "/chat-support", label: "Chat Support" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Disclaimer: Content is for research and informational purposes only and should not be considered medical advice. Please consult a doctor before taking any action.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} CareMantraHealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
