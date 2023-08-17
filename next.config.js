/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fulltech.com.mx", "royalholidaynews.info"],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin/alumno-detalles/:curp",
        destination: "/admin/alumno-detalles", // Ruta del componente AlumnoDetallesPage
      },
    ];
  },
};

module.exports = nextConfig;
