import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import "tailwindcss/tailwind.css";

const LayoutAdmin = ({ children }) => {
  // Aquí definirías la lógica para obtener el año actual
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <navbar>
        <Navbar className="bg-gray-800">
          <NavbarBrand className="text-blue-50">
            Resultados - Estilos de Aprendizaje
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} color="warning" href="#" variant="flat">
                Cerrar Sesión
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </navbar>
      <main className="flex-1 p-2">{children}</main>
      <footer className="bg-gray-800 text-slate-100 text-center text-xs p-3">
        <p>© {currentYear} - Resultados - Estilos de Aprendizaje - CETMAR18</p>
      </footer>
    </div>
  );
};

export default LayoutAdmin;
