import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow an isolated build dir so a second dev server can run alongside another
  // one on the same repo without corrupting the shared .next directory.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // The optimizer only serves these quality levels. 90 is used for project
    // covers and case images (sharp screenshots); 75 stays for everything else.
    qualities: [75, 90],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
