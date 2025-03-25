"use client";

import Link from "next/link";
import Head from "next/head";

export default function CookiePolicyPage() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Care Mantra Health</title>
        <meta
          name="description"
          content="Learn about how Care Mantra Health uses cookies to improve your browsing experience, deliver personalized content, and comply with data privacy regulations."
        />
        <meta
          name="keywords"
          content="Cookie Policy, Cookies, Care Mantra Health, Privacy, Data Protection, GDPR, CCPA, Google AdSense"
        />
        <meta name="author" content="Care Mantra Health" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Cookie Policy | Care Mantra Health" />
        <meta
          property="og:description"
          content="Care Mantra Health's Cookie Policy explains our use of cookies for improved user experience, analytics, and compliance with data privacy laws."
        />
        <meta property="og:url" content="https://www.caremantrahealth.com/cookie-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/cookie-policy-banner.jpg" />
      </Head>
      <section className="text-gray-900 bg-white body-font">
        <div className="container mx-auto px-5 py-24">
          <h1 className="text-5xl font-extrabold text-center text-black mb-8">
            Cookie Policy
          </h1>
          <p className="text-lg text-center text-gray-700 leading-relaxed max-w-3xl mx-auto">
            This Cookie Policy explains how{" "}
            <span className="font-bold">Care Mantra Health</span> uses cookies
            and similar tracking technologies on our website. By using our
            website, you agree to our use of cookies as described in this
            policy.
          </p>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">What Are Cookies?</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Cookies are small text files stored on your device (computer,
            tablet, or mobile) when you visit a website. They help us enhance
            your browsing experience, remember your preferences, and serve
            relevant advertisements.
          </p>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">Types of Cookies We Use</h2>
          <ul className="text-lg text-gray-700 list-disc list-inside">
            <li>
              <strong>Essential Cookies:</strong> Necessary for core website
              functions like security, authentication, and accessibility.
            </li>
            <li>
              <strong>Performance & Analytics Cookies:</strong> Help us
              understand how users interact with our site and improve our
              services.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Store your preferences to
              provide a personalized experience.
            </li>
            <li>
              <strong>Advertising & Marketing Cookies:</strong> Used by
              third-party advertisers like Google AdSense to serve relevant ads
              based on your browsing behavior.
            </li>
          </ul>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">
            Why We Use Cookies
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">We use cookies to:</p>
          <ul className="text-lg text-gray-700 list-disc list-inside">
            <li>Enhance website performance and usability.</li>
            <li>Personalize content and save user preferences.</li>
            <li>Analyze traffic and improve website functionality.</li>
            <li>
              Deliver targeted advertisements through Google AdSense and other
              ad networks.
            </li>
            <li>Prevent fraud and enhance security.</li>
          </ul>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">
            Managing & Controlling Cookies
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            You can manage or disable cookies in your browser settings.
            However, disabling some cookies may affect your website experience.
            You can also opt out of personalized ads through{" "}
            <a
              href="https://adssettings.google.com"
              className="text-blue-600 hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">
            Third-Party Cookies
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We use third-party services such as Google Analytics and Google
            AdSense, which may store cookies on your device. These cookies help
            track website traffic and serve relevant ads. You can learn more
            about how Google uses cookies in its{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              className="text-blue-600 hover:underline"
            >
              Cookie Policy
            </a>
            .
          </p>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">Legal Compliance</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our cookie usage complies with GDPR, CCPA, and other international
            data privacy regulations. You have the right to access, delete, or
            modify your cookie preferences at any time.
          </p>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">Updates to This Policy</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We may update this Cookie Policy periodically to reflect changes in
            legal requirements or our cookie usage. Any updates will be posted
            on this page.
          </p>
        </div>

        <div className="container mx-auto px-5 py-12">
          <h2 className="text-4xl font-bold text-black mb-6">Contact Us</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            If you have any questions about our cookie policy, please visit our{" "}
            <Link
              href="/contact-us"
              className="text-blue-600 hover:underline"
            >
              Contact Us
            </Link>{" "}
            page.
          </p>
        </div>
      </section>
    </>
  );
}
