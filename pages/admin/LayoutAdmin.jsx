import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { removeToken } from "@/services/authService"; // Importa la función para eliminar el token
import "tailwindcss/tailwind.css";

const LayoutAdmin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Verificar si el token existe en el localStorage
    if (!token) {
      setIsLoading(false);
      router.push("/"); // Redirigir a la página principal si no hay token
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Verificar si el token ha expirado
        if (decodedToken.exp < Date.now() / 1000) {
          setIsLoading(false);
          removeToken(); // Eliminar el token
          router.push("/"); // Redirigir a la página principal si el token ha expirado
        } else {
          // El token es válido, mostrar la página
          setIsLoading(false);
          setShowPage(true);
        }
      } catch (error) {
        // El token es inválido o no se pudo decodificar correctamente
        setIsLoading(false);
        removeToken(); // Eliminar el token
        router.push("/"); // Redirigir a la página principal si el token es inválido
      }
    }
  }, [router]);

  const handleLogout = () => {
    removeToken(); // Eliminar el token al hacer clic en "Cerrar Sesión"
    router.push("/"); // Redirigir a la página principal
  };

  return (
    <>
      {isLoading ? null : showPage ? (
        <div className="flex flex-col min-h-screen">
          <Navbar className="bg-gray-800">
            <NavbarBrand className="text-blue-50">
              Resultados - Estilos de Aprendizaje
            </NavbarBrand>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  color="warning"
                  href="#"
                  variant="flat"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <main className="flex-1 p-2">{children}</main>
          <footer className="bg-gray-800 text-slate-100 text-center text-xs p-3">
            <p>
              © {new Date().getFullYear()} - Resultados - Estilos de Aprendizaje
              - CETMAR18
            </p>
          </footer>
        </div>
      ) : null}
    </>
  );
};

export default LayoutAdmin;
