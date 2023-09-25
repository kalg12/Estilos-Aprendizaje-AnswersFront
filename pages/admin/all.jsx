import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";
import { getAllAlumnos } from "../../src/services/api";
import LayoutAdmin from "./LayoutAdmin";
import Link from "next/link";
const ExcelJS = require("exceljs");

const AllPage = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    async function fetchAlumnos() {
      const alumnosData = await getAllAlumnos();
      if (alumnosData) {
        setAlumnos(alumnosData);
      }
    }
    fetchAlumnos();
  }, []);

  const renderActions = (alumno) => (
    <div className="flex justify-end items-center gap-2">
      <Button variant="flat" color="primary">
        <Link href={`/admin/alumno-detalles/${alumno.curp}`}>Ver detalles</Link>
      </Button>
      <Button variant="flat" color="danger">
        Descargar PDF
      </Button>
    </div>
  );

  const countEstiloAprendizaje = (estilo) => {
    return alumnos.filter(
      (alumno) =>
        alumno.estilo_aprendizaje.toLowerCase() === estilo.toLowerCase()
    ).length;
  };

  const countDominioDosEstilos = () => {
    return alumnos.filter(
      (alumno) =>
        alumno.estilo_aprendizaje.toLowerCase().includes("visual") &&
        (alumno.estilo_aprendizaje.toLowerCase().includes("auditivo") ||
          alumno.estilo_aprendizaje.toLowerCase().includes("kinestesico"))
    ).length;
  };

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Alumnos");

    worksheet.getColumn("A").width = 25; // Ancho para ID
    worksheet.getColumn("B").width = 35; // Ancho para Nombre

    // Encabezados
    const headers = ["ID", "Nombres", "Grupo", "Estilo de Aprendizaje"]; // Agregado de estilo de aprendizaje
    for (let i = 1; i <= 40; i++) {
      headers.push(i.toString());
    }
    worksheet.addRow(headers);

    // Datos de los alumnos
    alumnos.forEach((alumno) => {
      const rowData = [
        alumno.curp,
        `${alumno.nombre} ${alumno.apellido}`,
        alumno.grupo,
        alumno.estilo_aprendizaje, // Agregado de estilo de aprendizaje
      ];
      for (let i = 1; i <= 40; i++) {
        rowData.push(alumno[`element${i}`]);
      }
      worksheet.addRow(rowData);
    });

    // Configurar el estilo de las celdas (opcional)
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    // Descargar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "respuestasFormulario.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutAdmin>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">
          Estadísticas de Estilos de Aprendizaje
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary-light p-4 rounded-lg text-center">
            <p className="text-primary-dark font-medium mb-1">
              Alumnos Kinestésicos
            </p>
            <p className="text-lg">{countEstiloAprendizaje("kinestesico")}</p>
          </div>
          <div className="bg-accent-light p-4 rounded-lg text-center">
            <p className="text-accent-dark font-medium mb-1">
              Alumnos Auditivos
            </p>
            <p className="text-lg">{countEstiloAprendizaje("auditivo")}</p>
          </div>
          <div className="bg-secondary-light p-4 rounded-lg text-center">
            <p className="text-secondary-dark font-medium mb-1">
              Alumnos Visuales
            </p>
            <p className="text-lg">{countEstiloAprendizaje("visual")}</p>
          </div>
          <div className="bg-info-light p-4 rounded-lg text-center">
            <p className="text-info-dark font-medium mb-1">
              Alumnos con Dominio de Dos Estilos
            </p>
            <p className="text-lg">{countDominioDosEstilos()}</p>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <Button color="success" onClick={downloadExcel}>
            Descargar Excel
          </Button>
        </div>
      </div>

      {alumnos.length > 0 ? (
        <Table aria-label="Tabla de Alumnos">
          <TableHeader>
            <TableColumn key="nombre" align="center">
              Nombre
            </TableColumn>
            <TableColumn key="apellido" align="center">
              Apellido
            </TableColumn>
            <TableColumn key="grupo" align="center">
              Grupo
            </TableColumn>
            <TableColumn key="email" align="center">
              Email
            </TableColumn>
            <TableColumn key="visual" align="center">
              Visual
            </TableColumn>
            <TableColumn key="auditivo" align="center">
              Auditivo
            </TableColumn>
            <TableColumn key="kinestesico" align="center">
              Kinestésico
            </TableColumn>
            <TableColumn key="estilo_aprendizaje" align="center">
              Estilo de Aprendizaje
            </TableColumn>
            <TableColumn key="actions" align="center">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody items={alumnos}>
            {(alumno, index) => (
              <TableRow key={alumno.curp}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.grupo}</TableCell>
                <TableCell>{alumno.email}</TableCell>
                <TableCell>{alumno.visual}</TableCell>
                <TableCell>{alumno.auditivo}</TableCell>
                <TableCell>{alumno.kinestesico}</TableCell>
                <TableCell>{alumno.estilo_aprendizaje}</TableCell>
                <TableCell>{renderActions(alumno)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Spinner label="Cargando" color="primary" labelColor="primary" />
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AllPage;
