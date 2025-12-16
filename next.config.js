/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ⛔ BẮT BUỘC KHÔNG dùng static export cho SPA + Map
  // output: "export", ❌ PHẢI BỎ

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
