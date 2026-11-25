import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.176", "192.168.0.1", "localhost"],
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
