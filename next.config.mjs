const nextConfig = {
  images: {
    domains: [
      "caremantrahealth.com", 
      "www.caremantrahealth.com"
    ], // Allow your own domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any host using HTTPS
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 128, 256, 384, 512],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
};

export default nextConfig;
