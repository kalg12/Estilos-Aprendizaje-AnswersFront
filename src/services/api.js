require("dotenv").config();
import axios from "axios";

const API_BASE_URL = "https://estilos-aprendijzae-backend-p58u-dev.fl0.io/api";

// Función para obtener todos los alumnos
export const getAllAlumnos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alumnos/all`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los alumnos:", error);
    return null;
  }
};

// Función para obtener un alumno por su CURP
export const getAlumnoByCurp = async (curp) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alumnos/${curp}`);
    return response.data[0];
  } catch (error) {
    console.error("Error al obtener el alumno por CURP:", error);
    return null;
  }
};
