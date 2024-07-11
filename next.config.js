/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fulltech.com.mx", "royalholidaynews.info"],
  },
  trailingSlash: true, // Mantén esta línea si prefieres tener una barra inclinada al final de las rutas
  reactStrictMode: true, // Opcional, pero recomendado para detectar problemas potenciales
};

module.exports = nextConfig;
