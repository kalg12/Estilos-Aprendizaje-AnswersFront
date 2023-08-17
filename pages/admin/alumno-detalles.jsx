import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { getAlumnoByCurp } from "../../src/services/api";
import LayoutAdmin from "./LayoutAdmin";
import Link from "next/link";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const AlumnoDetallesPage = () => {
  const router = useRouter();
  const { curp } = router.query;

  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    async function fetchAlumno() {
      if (curp) {
        const alumnoData = await getAlumnoByCurp(curp); // Reemplaza esto con la llamada correcta a la API
        if (alumnoData) {
          setAlumno(alumnoData);
        }
      }
    }

    fetchAlumno();
  }, [curp]);

  const renderRespuestas = () => {
    const patronesRespuestas = [
      /* 1 */
      ["B", "A", "C"],
      /* 2 */
      ["A", "C", "B"],
      /* 3 */
      ["B", "A", "C"],
      /* 4 */
      ["C", "B", "A"],
      /* 5 */
      ["C", "B", "A"],
      /* 6 */
      ["B", "A", "C"],
      /* 7 */
      ["A", "B", "C"],
      /* 8 */
      ["B", "A", "C"],
      /* 9 */
      ["A", "C", "B"],
      /* 10 */
      ["C", "B", "A"],
      /* 11 */
      ["B", "A", "C"],
      /* 12 */
      ["B", "C", "A"],
      /* 13 */
      ["C", "A", "B"],
      /* 14 */
      ["A", "B", "C"],
      /* 15 */
      ["B", "A", "C"],
      /* 16 */
      ["A", "C", "B"],
      /* 17 */
      ["C", "B", "A"],
      /* 18 */
      ["C", "A", "B"],
      /* 19 */
      ["A", "B", "C"],
      /* 20 */
      ["A", "C", "B"],
      /* 21 */
      ["B", "C", "A"],
      /* 22 */
      ["C", "A", "B"],
      /* 23 */
      ["A", "B", "C"],
      /* 24 */
      ["B", "A", "C"],
      /* 25 */
      ["A", "B", "C"],
      /* 26 */
      ["C", "B", "A"],
      /* 27 */
      ["B", "A", "C"],
      /* 28 */
      ["C", "B", "A"],
      /* 29 */
      ["B", "C", "A"],
      /* 30 */
      ["C", "B", "A"],
      /* 31 */
      ["B", "A", "C"],
      /* 32 */
      ["C", "A", "B"],
      /* 33 */
      ["A", "C", "B"],
      /* 34 */
      ["B", "A", "C"],
      /* 35 */
      ["B", "C", "A"],
      /* 36 */
      ["A", "C", "B"],
      /* 37 */
      ["A", "B", "C"],
      /* 38 */
      ["B", "C", "A"],
      /* 39 */
      ["B", "C", "A"],
      /* 40 */
      ["C", "A", "B"],
    ];

    if (!alumno) return null;

    const respuestasAlumno = [];
    for (let i = 0; i < patronesRespuestas.length; i++) {
      const respuestaVisual =
        alumno[`element${i + 1}`] === patronesRespuestas[i][0] ? "X" : "";
      const respuestaAuditivo =
        alumno[`element${i + 1}`] === patronesRespuestas[i][1] ? "X" : "";
      const respuestaKinestesico =
        alumno[`element${i + 1}`] === patronesRespuestas[i][2] ? "X" : "";
      respuestasAlumno.push(
        <TableRow key={i + 1}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{respuestaVisual}</TableCell>
          <TableCell>{respuestaAuditivo}</TableCell>
          <TableCell>{respuestaKinestesico}</TableCell>
        </TableRow>
      );
    }
    return respuestasAlumno;
  };

  // Define los estilos del documento PDF
  const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // Crea el componente del documento PDF
  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text>Sección #1</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text>Sección #2</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <LayoutAdmin>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-8">
          <Button>
            <Link className="text-blue-500 hover:underline" href="/admin/all">
              👈 Regresar al Listado de Alumnos
            </Link>
          </Button>
        </div>
        {alumno && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-xl font-semibold mb-2">
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
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-xl font-semibold mb-2">
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
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AlumnoDetallesPage;
