"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import LayoutPublic from "./LayoutPublic";
import { getAlumnoByCurpPublic } from "@/services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AlumnosPublicPage = () => {
  const router = useRouter();
  const { curpalumno } = router.query;
  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    const getAlumno = async () => {
      if (curpalumno) {
        const alumnoData = await getAlumnoByCurpPublic(curpalumno);
        if (alumnoData) {
          setAlumno(alumnoData);
        }
      }
    };
    getAlumno();
  }, [curpalumno]);

  const patronesRespuestas = [
    ["B", "A", "C"],
    ["A", "C", "B"],
    ["B", "A", "C"],
    ["C", "B", "A"],
    ["C", "B", "A"],
    ["B", "A", "C"],
    ["A", "B", "C"],
    ["B", "A", "C"],
    ["A", "C", "B"],
    ["C", "B", "A"],
    ["B", "A", "C"],
    ["B", "C", "A"],
    ["C", "A", "B"],
    ["A", "B", "C"],
    ["B", "A", "C"],
    ["A", "C", "B"],
    ["C", "B", "A"],
    ["C", "A", "B"],
    ["A", "B", "C"],
    ["A", "C", "B"],
    ["B", "C", "A"],
    ["C", "A", "B"],
    ["A", "B", "C"],
    ["B", "A", "C"],
    ["A", "B", "C"],
    ["C", "B", "A"],
    ["B", "A", "C"],
    ["C", "B", "A"],
    ["B", "C", "A"],
    ["C", "B", "A"],
    ["B", "A", "C"],
    ["C", "A", "B"],
    ["A", "C", "B"],
    ["B", "A", "C"],
    ["B", "C", "A"],
    ["A", "C", "B"],
    ["A", "B", "C"],
    ["B", "C", "A"],
    ["B", "C", "A"],
    ["C", "A", "B"],
  ];

  const renderRespuestas = () => {
    if (!alumno) return null;

    return patronesRespuestas.map((patron, i) => {
      const respuestaVisual =
        alumno[`element${i + 1}`] === patron[0] ? "X" : "";
      const respuestaAuditivo =
        alumno[`element${i + 1}`] === patron[1] ? "X" : "";
      const respuestaKinestesico =
        alumno[`element${i + 1}`] === patron[2] ? "X" : "";
      return (
        <TableRow key={i + 1}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{respuestaVisual}</TableCell>
          <TableCell>{respuestaAuditivo}</TableCell>
          <TableCell>{respuestaKinestesico}</TableCell>
        </TableRow>
      );
    });
  };

  const countEstilo = (estilo) => {
    if (!alumno) return 0;

    return patronesRespuestas.reduce((count, patron, i) => {
      if (alumno[`element${i + 1}`] === patron[estilo]) {
        count++;
      }
      return count;
    }, 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("ESTILOS DE APRENDIZAJE - CETMAR 18", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre: ${alumno.nombre} ${alumno.apellido}`, 20, 30);
    doc.text(`CURP: ${alumno.curp}`, 20, 40);
    doc.text(`Grupo: ${alumno.grupo}`, 20, 50);
    doc.text(`Estilo de Aprendizaje: ${alumno.estilo_aprendizaje}`, 20, 60);

    const tableColumn = ["Pregunta", "Visual", "Auditivo", "Kinestésico"];
    const tableRows = patronesRespuestas.map((patron, i) => {
      const respuestaVisual =
        alumno[`element${i + 1}`] === patron[0] ? "X" : "";
      const respuestaAuditivo =
        alumno[`element${i + 1}`] === patron[1] ? "X" : "";
      const respuestaKinestesico =
        alumno[`element${i + 1}`] === patron[2] ? "X" : "";
      return [i + 1, respuestaVisual, respuestaAuditivo, respuestaKinestesico];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70,
    });

    doc.save(`estilo_aprendizaje_${curpalumno}.pdf`);
  };

  return (
    <LayoutPublic>
      <div className="flex flex-col items-center justify-center h-full">
        {alumno ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
            <div
              id="pdfContent"
              className="bg-white p-4 rounded-lg shadow w-full max-w-screen-md"
            >
              <div className="flex flex-col items-center mb-4">
                <p className="text-2xl font-semibold mb-4 text-center">
                  Información del Alumno
                </p>
                <p>
                  <strong>CURP:</strong> {alumno.curp}
                </p>
                <p>
                  <strong>Nombre:</strong> {alumno.nombre} {alumno.apellido}
                </p>
                <p>
                  <strong>Grupo:</strong> {alumno.grupo}
                </p>
                <p>
                  <strong>Estilo de Aprendizaje:</strong>{" "}
                  {alumno.estilo_aprendizaje}
                </p>
              </div>
              <p className="text-2xl font-semibold mb-4 text-center">
                Respuestas del Alumno
              </p>
              <Table aria-label="Tabla de Respuestas">
                <TableHeader>
                  <TableColumn key="pregunta" align="center">
                    Pregunta
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
                </TableHeader>
                <TableBody>{renderRespuestas()}</TableBody>
              </Table>
              <div className="flex justify-center mt-4">
                <div className="mr-4">
                  <p className="text-lg font-semibold">
                    Visual: {countEstilo(0)}
                  </p>
                </div>
                <div className="mr-4">
                  <p className="text-lg font-semibold">
                    Auditivo: {countEstilo(1)}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    Kinestésico: {countEstilo(2)}
                  </p>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 align-center"
              variant="flat"
              color="danger"
              onClick={generatePDF}
            >
              Descargar PDF
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Spinner label="Cargando" color="primary" labelColor="primary" />
          </div>
        )}
      </div>
    </LayoutPublic>
  );
};

export default AlumnosPublicPage;
