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
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

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

  const styles = StyleSheet.create({
    page: { flexDirection: "row", backgroundColor: "#2371DE" },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundColor: "#E4E4E4",
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            ESTILOS DE APRENDIZAJE - CETMAR 18
          </Text>
          <Text style={{ fontSize: 13, textAlign: "center", margin: 1 }}>
            Nombre: {alumno.nombre} {alumno.apellido}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "center", margin: 0.5 }}>
            CURP: {alumno.curp}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "center", margin: 0.5 }}>
            Grupo: {alumno.grupo}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "center", margin: 0.7 }}>
            Estilo de Aprendizaje: {alumno.estilo_aprendizaje}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <LayoutPublic>
      <div className="flex flex-col items-center justify-center h-full">
        {alumno ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
            <div className="flex flex-col sticky top-16 bg-white p-4 rounded-lg shadow max-h-[250px] overflow-y-auto">
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
              <PDFDownloadLink
                document={<MyDocument />}
                fileName={`estilo_aprendizaje_${curpalumno}.pdf`}
              >
                <Button
                  className="mt-4 align-center"
                  variant="flat"
                  color="danger"
                >
                  Descargar PDF
                </Button>
              </PDFDownloadLink>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
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
