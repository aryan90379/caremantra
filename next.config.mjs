// Use ES Module export syntax
export default {
  images: {
    domains: ['localhost', 'your-server-domain.com'], // Add your VPS domain here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any host (can be more specific like 'example.com')
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 128, 256, 384, 512],
    minimumCacheTTL: 60,
  },
};
