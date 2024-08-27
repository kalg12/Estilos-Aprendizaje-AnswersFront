import React, { useState } from "react";
import LayoutPublic from "./resultados/LayoutPublic";
import { Input, Button, Text } from "@nextui-org/react";
import { getAlumnoByCurpPublic } from "@/services/api";

const Resultados = () => {
  const [curp, setCurp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validarCurp = (curp) => {
    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;
    return regex.test(curp);
  };

  const handleSubmit = async () => {
    if (!validarCurp(curp)) {
      setError("CURP no válida. Por favor, verifica y vuelve a intentar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const alumnoData = await getAlumnoByCurpPublic(curp);
      if (alumnoData) {
        window.location.href = `https://estilos-aprendizaje-front.vercel.app//resultados/${curp}`;
      } else {
        setError(
          "CURP no encontrada. Por favor, verifica y vuelve a intentar."
        );
      }
    } catch (err) {
      setError("Error en la consulta. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPublic>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "20px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h1 className="mb-4 text-lg">Consulta tu Estilo de Aprendizaje</h1>
        <p>Ingresa tu CURP</p>
        <Input
          type="text"
          variant="underlined"
          label="CURP"
          value={curp}
          onChange={(e) => setCurp(e.target.value.toUpperCase())}
          fullWidth
          style={{ marginBottom: "10px" }}
          status={error ? "error" : "default"}
        />
        <Button
          color={error ? "error" : "primary"}
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          {error
            ? "CURP no válida"
            : loading
            ? "Verificando..."
            : "Ver Resultados"}
        </Button>
        {error && <h1>Error, la CURP ingresada no ha sido registrada</h1>}
      </div>
    </LayoutPublic>
  );
};

export default Resultados;
