/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["fulltech.com.mx", "royalholidaynews.info"],
  },
  reactStrictMode: true,
  trailingSlash: true, // Agregar esta línea para habilitar trailing slash en las rutas
};

module.exports = nextConfig;
