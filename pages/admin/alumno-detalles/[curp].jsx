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
import { useRouter } from "next/router";
import LayoutAdmin from "../LayoutAdmin";
import Link from "next/link";
import { getAlumnoByCurp } from "@/services/api";

const AlumnoDetallesPage = () => {
  const router = useRouter();
  const { curp } = router.query;

  const [alumno, setAlumno] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlumno() {
      if (curp) {
        try {
          setLoading(true);
          setError(null);
          console.log("Buscando alumno con CURP:", curp);
          const alumnoData = await getAlumnoByCurp(curp);
          console.log("Datos recibidos:", alumnoData);
          if (alumnoData) {
            setAlumno(alumnoData);
          } else {
            setError("No se encontró el alumno");
          }
        } catch (err) {
          console.error("Error al obtener alumno:", err);
          setError(`Error: ${err.message || "Error desconocido"}`);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchAlumno();
  }, [curp]);

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

  const renderRespuestas = () => {
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
        </TableRow>,
      );
    }
    return respuestasAlumno;
  };

  const countEstilo = (estilo) => {
    if (!alumno) return 0;

    let count = 0;
    for (let i = 0; i < patronesRespuestas.length; i++) {
      if (alumno[`element${i + 1}`] === patronesRespuestas[i][estilo]) {
        count++;
      }
    }
    return count;
  };

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
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center h-full">
            <Spinner label="Cargando" color="primary" labelColor="primary" />
          </div>
        )}
        {alumno && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
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
              {/* Contador de estilos */}
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
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AlumnoDetallesPage;
