import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";
import Script from "next/script";
import PushNotifications from "@/components/PushNotifications";
import Head from "next/head"; // Import Head for meta tags

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Google AdSense Verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5050716098508416"
          crossorigin="anonymous"
        ></script>
      </Head>
      <body
        className={`bg-gray-100 dark:bg-gray-950 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GHLRS2X1XN"></Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JZ0H4RL9MS"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GHLRS2X1XN');
            gtag('config', 'G-JZ0H4RL9MS');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l;j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W3BNZ6R5');
          `}
        </Script>

        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3BNZ6R5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <SessionWrapper>
          <Navbar />
          <PushNotifications />
          <main className="pt-[7rem]">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
