import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f4.bcbits.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
