import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (.next/standalone/server.js).
  output: "standalone",
  reactStrictMode: true,
  // Lets a production build run alongside `next dev` (e.g. NEXT_DIST_DIR=.next-prod).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [{ source: "/branches", destination: "/communaute", permanent: true }];
  },
};

export default nextConfig;
