/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*.localhost", "localhost"],
  },
};

module.exports = nextConfig;
