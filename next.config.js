/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Cho phép load ảnh từ CDN
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "cdn.nailbooking.com"
    ],
  },

  // Xoá console.log khi build production (tăng tốc)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
