"use client";
import React from "react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <>
      <head>
        <title>Contact Us - Care Mantra Health</title>
        <meta
          name="description"
          content="Get in touch with Care Mantra Health for comprehensive health-related queries, expert medical advice, or technical website assistance. Contact us via email, phone, or live chat for prompt support."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Care Mantra Health",
              "url": "https://caremantrahealth.com/contact-us",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@caremantrahealth.com",
                "contactType": "customer service",
                "areaServed": "Worldwide",
                "availableLanguage": ["English"]
              }
            })
          }}
        />
      </head>

      <main className="max-w-full mx-auto p-6 space-y-6 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg">
          At Care Mantra Health, we are committed to providing exceptional customer service. Whether you have medical inquiries, technical issues, or partnership opportunities, we are here to help you. Reach out to us using any of the channels listed below.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold">Contact Details</h2>
          <p className="text-lg">
            Email:{" "}
            <Link href="mailto:support@caremantrahealth.com" className="text-blue-600 dark:text-blue-400">
              support@caremantrahealth.com
            </Link>
          </p>
        </div>

        <h2 className="text-2xl font-semibold">Live Chat Support</h2>
        <p className="text-lg">
          
          Our live chat feature offers immediate support from our dedicated team of experts. Whether you need guidance on navigating the website, have urgent medical questions, or require technical assistance, our team is here for you .
        <Link href="/chat-support" className="text-blue-600 dark:text-blue-400"> Start a chat now</Link>.
        </p>
        
        

        <h2 className="text-2xl font-semibold">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4">
          {[
            {
              question: "How can I contact Care Mantra Health?",
              answer: "You can contact us via email at support@caremantrahealth.com or by using the live chat feature on this page."
            },
            {
              question: "What kind of health topics do you cover?",
              answer: "We provide comprehensive content on various health-related topics including medical conditions, treatment options, wellness strategies, and fitness guidance to ensure you stay informed and healthy."
            },
            {
              question: "What response time can I expect from your support team?",
              answer: "Our team strives to respond to emails within 24 hours, and live chat support is typically available instantly during operating hours."
            },
            {
              question: "Can I request specific health-related content or advice?",
              answer: "Absolutely! Our team is committed to addressing your concerns. Feel free to reach out with requests for specific content, health guides, or expert advice."
            }
          ].map((faq, index) => (
            <details key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-2 text-lg">{faq.answer}</p>
            </details>
          ))}
        </div>

        <h2 className="text-2xl font-semibold">Policies & Terms</h2>
        <p className="text-lg">
          To understand how we handle your data and ensure your privacy, we encourage you to review our comprehensive policies:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-lg">
          <li>
            Read our{" "}
            <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400">
              Privacy Policy
            </Link>{" "}
            to learn how we protect your personal information.
          </li>
          <li>
            Familiarize yourself with our{" "}
            <Link href="/terms-of-service" className="text-blue-600 dark:text-blue-400">
              Terms of Service
            </Link>{" "}
            to understand our service commitments and user expectations.
          </li>
        </ul>

        <p className="text-lg font-semibold mt-6">
          Your well-being is our priority. Contact us today for professional support and reliable health information.
        </p>
      </main>
    </>
  );
};

export default ContactPage;
