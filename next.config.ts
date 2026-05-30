import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/primet-redesign",
  images: {
    unoptimized: true, // required for static export
  },
  trailingSlash: true,
};

export default nextConfig;
