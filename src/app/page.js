"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <navbar>
      <Navbar>
        <NavbarBrand>Resultados - Estilos de Aprendizaje</NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Iniciar Sesión
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </navbar>
  );
}
