/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["fulltech.com.mx", "royalholidaynews.info"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
