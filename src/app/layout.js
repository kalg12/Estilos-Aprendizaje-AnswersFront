import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resultados - Estilos de Aprendizaje",
  description:
    "Sistema para obtener los resultados de la aplicación de los estilos de aprendizaje - CETMAR18",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="es" className="light">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
