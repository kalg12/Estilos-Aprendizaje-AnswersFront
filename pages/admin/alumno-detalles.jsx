import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { getAlumnoByCurp } from "../../src/services/api"; // Asegúrate de importar la función correcta para obtener el alumno por CURP
import LayoutAdmin from "./LayoutAdmin";

const AlumnoDetallesPage = () => {
  const router = useRouter();
  const { curp } = router.query;

  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    async function fetchAlumno() {
      if (curp) {
        console.log(curp);
        const alumnoData = await getAlumnoByCurp(curp); // Reemplaza esto con la llamada correcta a la API
        if (alumnoData) {
          setAlumno(alumnoData);
        }
      }
    }

    fetchAlumno();
  }, [curp]);

  const renderRespuestas = () => {
    const preguntas = []; // Aquí debes proporcionar el patrón de preguntas
    for (let i = 1; i <= 40; i++) {
      preguntas.push(
        <TableRow key={i}>
          <TableCell>{i}</TableCell>
          <TableCell>{alumno ? alumno[`element${i}`] : ""}</TableCell>
          <TableCell>{alumno ? alumno[`element${i + 40}`] : ""}</TableCell>
          <TableCell>{alumno ? alumno[`element${i + 80}`] : ""}</TableCell>
        </TableRow>
      );
    }
    return preguntas;
  };

  return (
    <LayoutAdmin>
      <div className="flex flex-col items-center justify-center h-full">
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
