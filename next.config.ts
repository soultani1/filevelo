import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude cloudconvert (Node.js SDK) from browser bundles
  serverExternalPackages: ["cloudconvert"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
