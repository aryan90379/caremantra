"use client";
import Head from "next/head";
export default function PrivacyPolicy() {
  return (
    <>
     <Head>
        <title>Privacy Policy | Care Mantra Health</title>
        <meta
          name="description"
          content="Care Mantra Health's Privacy Policy explains how we collect, use, and protect your personal data in compliance with Google AdSense policies."
        />
        <meta
          name="keywords"
          content="Privacy Policy, Care Mantra Health, Google AdSense, User Data Protection"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    <section className="text-gray-800 bg-white body-font overflow-hidden">
      <div className="container mx-auto px-5 py-24">
        
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center text-black mb-8">
          Privacy Policy  
        </h1>

        {/* Introduction */}
        <p className="text-lg text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At Care Mantra Health, we value your privacy and are committed to protecting any personal data collected through our services. This Privacy Policy explains how we collect, use, and safeguard your information in compliance with applicable laws and Google AdSense policies.
        </p>

        {/* Privacy Sections */}
        <div className="mt-12 space-y-12">
          
          {/* Information Collection */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">What Information We Collect</h2>
            <p className="text-gray-700 text-lg">
              We only collect the necessary data required to provide a personalized and seamless experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li><strong>Google Account Information:</strong> If you sign in using Google, we collect your name, email, and profile picture for authentication purposes.</li>
              <li><strong>Cookies:</strong> Our website and third-party services use cookies to enhance functionality and provide personalized experiences.</li>
              <li><strong>Analytics Data:</strong> We collect anonymized analytics data such as page views and interactions to improve our website.</li>
              <li><strong>Ad Personalization:</strong> Google AdSense may collect user interaction data for relevant ad delivery.</li>
            </ul>
          </div>

          {/* How We Use Your Data */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">How We Use Your Data</h2>
            <p className="text-gray-700 text-lg">
              The data we collect is used solely for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li><strong>User Authentication:</strong> Google login ensures secure and seamless access.</li>
              <li><strong>Personalized Experience:</strong> We use cookies to remember preferences and improve recommendations.</li>
              <li><strong>Ad Display:</strong> Google AdSense uses cookies and browsing behavior to deliver relevant advertisements.</li>
              <li><strong>Site Performance:</strong> Analytics help us understand visitor interactions and optimize the website.</li>
            </ul>
          </div>

          {/* Google AdSense and Third-Party Services */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">Third-Party Services and AdSense</h2>
            <p className="text-gray-700 text-lg">
              We use Google AdSense to display advertisements. Google may collect and use cookies to personalize ads based on your browsing behavior.  
              To learn more about how Google handles data, refer to the official <a href="https://policies.google.com/privacy" className="text-blue-500 hover:underline">Google Privacy Policy</a>.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Google uses the <b className="text-red-500"> DoubleClick</b> cookie to track ad performance and improve relevance.</li>
              <li>You can opt out of personalized ads by visiting the <a href="https://adssettings.google.com/authenticated" className="text-blue-500 hover:underline">Google Ads Settings</a> page.</li>
              <li>Third-party advertisers may use cookies to collect non-personally identifiable data.</li>
            </ul>
          </div>

          {/* Cookie Usage */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">Cookie Policy</h2>
            <p className="text-gray-700 text-lg">
              Cookies are small data files stored on your device. We and third-party services (such as Google AdSense) use cookies for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Remembering user preferences and session management.</li>
              <li>Providing personalized advertisements based on past interactions.</li>
              <li>Analyzing website traffic and improving user experience.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              You can manage cookie settings through your browser preferences. Blocking cookies may affect certain functionalities on our site.
            </p>
          </div>

          {/* User Rights and Data Control */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">Your Rights and Data Control</h2>
            <p className="text-gray-700 text-lg">
              As a user, you have the following rights regarding your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Access and review your personal information stored on our platform.</li>
              <li>Request deletion of your data if you wish to stop using our services.</li>
              <li>Opt out of targeted advertisements through <a href="https://adssettings.google.com/authenticated" className="text-blue-500 hover:underline">Google Ad Settings</a>.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              For data requests, visit our <a href="/contact-us" className="text-blue-500 hover:underline">Contact Us</a> page.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">Data Security</h2>
            <p className="text-gray-700 text-lg">
              We take security seriously and implement strict measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>All user data is encrypted and securely stored.</li>
              <li>Google OAuth authentication ensures a safe login process.</li>
              <li>We do not share, sell, or misuse user data for unauthorized purposes.</li>
            </ul>
          </div>

          {/* Policy Updates */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">Policy Updates</h2>
            <p className="text-gray-700 text-lg">
              We may update this Privacy Policy periodically to comply with legal requirements and enhance transparency. Any changes will be published on this page.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-black mb-4">Contact Us</h2>
            <p className="text-gray-700 text-lg">
              If you have any questions about our privacy practices, please visit our  
              <a href="/contact-us" className="text-blue-500 hover:underline"> Contact Us </a> page.
            </p>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
