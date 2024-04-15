/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steamcdn-a.akamaihd.net"
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com"
      }
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
