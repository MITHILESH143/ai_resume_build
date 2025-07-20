import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://profilebuilder-two.vercel.app/",
        "localhost:3000",
      ],
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
