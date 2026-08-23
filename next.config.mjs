/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 85, 90, 95],
  },
};

export default nextConfig;
