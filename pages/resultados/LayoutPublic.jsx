import React from "react";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import "tailwindcss/tailwind.css";

const LayoutPublic = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="bg-gray-800">
        <NavbarBrand className="text-blue-50">
          Resultados - Estilos de Aprendizaje
        </NavbarBrand>
      </Navbar>
      <main className="flex-1 p-2 bg-slate-200">{children}</main>
      <footer className="bg-gray-800 text-slate-100 text-center text-xs p-3">
        <p>
          © {new Date().getFullYear()} - Resultados - Estilos de Aprendizaje -
          CETMAR18
        </p>
      </footer>
    </div>
  );
};

export default LayoutPublic;
