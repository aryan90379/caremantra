/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any host (or specify a domain like 'images.example.com')
      },
    ],
  },
};

export default nextConfig;
