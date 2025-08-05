import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["31.172.66.97", "http://31.172.66.97/"],
    unoptimized: true,
  },
  distDir: "dist",
};

export default nextConfig;
