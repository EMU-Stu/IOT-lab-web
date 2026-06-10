import type { NextConfig } from "next";
import { siteConfig } from "./lib/site-config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: siteConfig.basePath,
  assetPrefix: siteConfig.basePath ? `${siteConfig.basePath}/` : undefined,
};

export default nextConfig;