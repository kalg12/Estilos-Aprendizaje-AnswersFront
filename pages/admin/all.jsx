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
import { useRouter } from "next/router";
import { jsPDF } from "jspdf";
const ExcelJS = require("exceljs");

const AllPage = () => {
  const router = useRouter();
  const [alumnos, setAlumnos] = useState([]);
  const [generaciones, setGeneraciones] = useState([]); // Nueva variable de estado para las generaciones
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState(""); // Nueva variable de estado para la generación seleccionada
  const [actionLoading, setActionLoading] = useState({
    type: null,
    curp: null,
  });

  useEffect(() => {
    async function fetchAlumnos() {
      const alumnosData = await getAllAlumnos();
      if (alumnosData) {
        setAlumnos(alumnosData);

        // Extraer las generaciones únicas de los datos de los alumnos
        const generacionesUnicas = [
          ...new Set(alumnosData.map((alumno) => alumno.generacion)),
        ];
        setGeneraciones(generacionesUnicas);
      }
    }
    fetchAlumnos();
  }, []);

  const handleGeneracionChange = (e) => {
    setGeneracionSeleccionada(e.target.value);
  };

  const waitForRender = () =>
    new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );

  const alumnosFiltrados = alumnos.filter((alumno) =>
    generacionSeleccionada
      ? alumno.generacion === generacionSeleccionada && alumno.generacion !== ""
      : alumno.generacion !== "",
  );

  const handleViewDetails = async (curp) => {
    setActionLoading({ type: "details", curp });
    try {
      await waitForRender();
      await router.push(`/admin/alumno-detalles/${curp}`);
    } finally {
      setActionLoading({ type: null, curp: null });
    }
  };

  const handleDownloadPDF = async (alumno) => {
    setActionLoading({ type: "pdf", curp: alumno.curp });
    try {
      await waitForRender();
      downloadPDF(alumno);
    } finally {
      setActionLoading({ type: null, curp: null });
    }
  };

  const renderActions = (alumno) => {
    const isDetailsLoading =
      actionLoading.type === "details" && actionLoading.curp === alumno.curp;
    const isPdfLoading =
      actionLoading.type === "pdf" && actionLoading.curp === alumno.curp;
    const isBulkPdfLoading = actionLoading.type === "bulk-pdf";

    return (
      <div className="flex justify-end items-center gap-2">
        <Button
          variant="flat"
          color="primary"
          isLoading={isDetailsLoading}
          isDisabled={isPdfLoading || isBulkPdfLoading}
          onClick={() => handleViewDetails(alumno.curp)}
        >
          Ver detalles
        </Button>
        <Button
          variant="flat"
          color="danger"
          isLoading={isPdfLoading}
          isDisabled={isDetailsLoading || isBulkPdfLoading}
          onClick={() => handleDownloadPDF(alumno)}
        >
          Descargar PDF
        </Button>
      </div>
    );
  };

  const countEstiloAprendizaje = (estilo) => {
    return alumnosFiltrados.filter(
      (alumno) =>
        alumno.estilo_aprendizaje.toLowerCase() === estilo.toLowerCase(),
    ).length;
  };

  const countDominioDosEstilos = () => {
    return alumnosFiltrados.filter(
      (alumno) =>
        alumno.estilo_aprendizaje.toLowerCase().includes("visual") &&
        (alumno.estilo_aprendizaje.toLowerCase().includes("auditivo") ||
          alumno.estilo_aprendizaje.toLowerCase().includes("kinestesico")),
    ).length;
  };

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

  const getRespuestaMark = (alumno, index, colIndex) =>
    alumno[`element${index + 1}`] === patronesRespuestas[index][colIndex]
      ? "X"
      : "";

  const countEstiloByIndex = (alumno, colIndex) => {
    let count = 0;
    for (let i = 0; i < patronesRespuestas.length; i++) {
      if (alumno[`element${i + 1}`] === patronesRespuestas[i][colIndex]) {
        count++;
      }
    }
    return count;
  };

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Alumnos");

    worksheet.getColumn("A").width = 26; // Ancho para ID
    worksheet.getColumn("B").width = 35; // Ancho para Nombre

    // Encabezados
    const headers = ["ID", "Nombres", "Grupo", "Estilo de Aprendizaje"];
    for (let i = 1; i <= 40; i++) {
      headers.push(i.toString());
    }
    worksheet.addRow(headers);

    // Datos de los alumnos
    alumnosFiltrados.forEach((alumno) => {
      const rowData = [
        alumno.curp,
        `${alumno.nombre} ${alumno.apellido}`,
        alumno.grupo,
        alumno.estilo_aprendizaje,
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

  const downloadPDF = (alumno) => {
    const doc = new jsPDF();

    // Configuración del documento
    doc.setFontSize(16);
    doc.text("Reporte de Alumno", 20, 20);

    // Datos del alumno
    doc.setFontSize(12);
    let yPosition = 40;

    const datos = [
      { label: "Nombre:", value: `${alumno.nombre} ${alumno.apellido}` },
      { label: "CURP:", value: alumno.curp },
      { label: "Grupo:", value: alumno.grupo },
      { label: "Email:", value: alumno.email },
      { label: "Generación:", value: alumno.generacion },
    ];

    datos.forEach((dato) => {
      doc.setFont(undefined, "bold");
      doc.text(`${dato.label}`, 20, yPosition);
      doc.setFont(undefined, "normal");
      doc.text(String(dato.value), 80, yPosition);
      yPosition += 10;
    });

    // Sección de Estilos de Aprendizaje
    yPosition += 10;
    doc.setFont(undefined, "bold");
    doc.setFontSize(13);
    doc.text("Estilos de Aprendizaje", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    const estilos = [
      { label: "Visual:", value: alumno.visual },
      { label: "Auditivo:", value: alumno.auditivo },
      { label: "Kinestésico:", value: alumno.kinestesico },
      { label: "Estilo Principal:", value: alumno.estilo_aprendizaje },
    ];

    estilos.forEach((estilo) => {
      doc.setFont(undefined, "bold");
      doc.text(`${estilo.label}`, 20, yPosition);
      doc.setFont(undefined, "normal");
      doc.text(String(estilo.value), 80, yPosition);
      yPosition += 10;
    });

    // Descargar el PDF
    doc.save(`${alumno.nombre}_${alumno.apellido}.pdf`);
  };

  const renderAlumnoToPdf = (doc, alumno, pageIndex) => {
    if (pageIndex > 0) {
      doc.addPage();
    }

    doc.setFontSize(16);
    doc.text("Reporte de Alumno", 20, 18);

    doc.setFontSize(11);
    const infoRows = [
      ["Nombre:", `${alumno.nombre} ${alumno.apellido}`],
      ["CURP:", alumno.curp],
      ["Grupo:", alumno.grupo],
      ["Email:", alumno.email],
      ["Generación:", alumno.generacion],
      ["Estilo de Aprendizaje:", alumno.estilo_aprendizaje],
    ];

    let y = 28;
    infoRows.forEach(([label, value]) => {
      doc.setFont(undefined, "bold");
      doc.text(label, 20, y);
      doc.setFont(undefined, "normal");
      doc.text(String(value || ""), 70, y);
      y += 6;
    });

    y += 6;
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("Respuestas del Alumno", 20, y);

    y += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("Pregunta", 20, y);
    doc.text("Visual", 60, y);
    doc.text("Auditivo", 95, y);
    doc.text("Kinestésico", 135, y);

    doc.setFont(undefined, "normal");
    const rowHeight = 5;
    for (let i = 0; i < patronesRespuestas.length; i++) {
      const rowY = y + rowHeight * (i + 1);
      doc.text(String(i + 1), 20, rowY);
      doc.text(getRespuestaMark(alumno, i, 0), 60, rowY);
      doc.text(getRespuestaMark(alumno, i, 1), 95, rowY);
      doc.text(getRespuestaMark(alumno, i, 2), 135, rowY);
    }

    const visualCount = countEstiloByIndex(alumno, 0);
    const auditivoCount = countEstiloByIndex(alumno, 1);
    const kinestesicoCount = countEstiloByIndex(alumno, 2);
    const footerY = y + rowHeight * (patronesRespuestas.length + 2);

    doc.setFont(undefined, "bold");
    doc.text(`Visual: ${visualCount}`, 20, footerY);
    doc.text(`Auditivo: ${auditivoCount}`, 70, footerY);
    doc.text(`Kinestésico: ${kinestesicoCount}`, 130, footerY);
  };

  const downloadAllPdf = async () => {
    setActionLoading({ type: "bulk-pdf", curp: null });
    try {
      await waitForRender();
      const doc = new jsPDF();
      alumnosFiltrados.forEach((alumno, index) => {
        renderAlumnoToPdf(doc, alumno, index);
      });
      doc.save("reporte_alumnos.pdf");
    } finally {
      setActionLoading({ type: null, curp: null });
    }
  };

  return (
    <LayoutAdmin>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">
          Estadísticas de Estilos de Aprendizaje
        </h2>
        <div className="mb-4">
          <label htmlFor="generacion" className="mr-2">
            Filtrar por Generación:
          </label>
          <select
            id="generacion"
            value={generacionSeleccionada}
            onChange={handleGeneracionChange}
          >
            <option value="">Todas</option>
            {generaciones.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>
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
        <div className="mt-4 mb-4 flex items-center gap-3">
          <Button color="success" onClick={downloadExcel}>
            Descargar Excel
          </Button>
          <Button
            color="secondary"
            isLoading={actionLoading.type === "bulk-pdf"}
            onClick={downloadAllPdf}
          >
            Descargar PDF
          </Button>
        </div>
      </div>

      {alumnosFiltrados.length > 0 ? (
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
            <TableColumn key="generacion" align="center">
              Generación
            </TableColumn>
            <TableColumn key="actions" align="center">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody items={alumnosFiltrados}>
            {(alumno) => (
              <TableRow key={alumno.curp}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.grupo}</TableCell>
                <TableCell>{alumno.email}</TableCell>
                <TableCell>{alumno.visual}</TableCell>
                <TableCell>{alumno.auditivo}</TableCell>
                <TableCell>{alumno.kinestesico}</TableCell>
                <TableCell>{alumno.estilo_aprendizaje}</TableCell>
                <TableCell>{alumno.generacion}</TableCell>
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
