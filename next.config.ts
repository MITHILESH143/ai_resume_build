import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "xjvn480g-3000.inc1.devtunnels.ms"],
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "6vqprsktfd3qqvtb.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
