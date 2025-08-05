import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: "dist",
  devIndicators: false,
  images: {
    domains: ["31.172.66.97", "http://31.172.66.97/"],
    unoptimized: true,
  },
};

export default nextConfig;
