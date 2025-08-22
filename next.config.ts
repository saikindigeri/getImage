// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "via.placeholder.com",
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for SSR and API routes on Amplify
  images: {
    unoptimized: true, // Disable Next.js image optimization for Amplify
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      // Add other domains if needed (e.g., for recipe images)
      {
        protocol: "https",
        hostname: "*.your-image-domain.com",
      },
    ],
  },
  // Optional: Proxy API requests to a separate backend (e.g., Elastic Beanstalk)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://your-backend.elasticbeanstalk.com/api/:path*", // If using separate backend
      },
