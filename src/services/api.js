import axios from "axios";
import { getToken } from "./authService";

const API_BASE_URL = "https://estilos-aprendizaje-backend.onrender.com/api";

// Función para obtener todos los alumnos
export const getAllAlumnos = async () => {
  try {
    const token = getToken();
    const config = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
    const response = await axios.get(`${API_BASE_URL}/alumnos/all`, {
      headers: config,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los alumnos:", error);
    return null;
  }
};

// Función para obtener un alumno por su CURP
export const getAlumnoByCurp = async (curp) => {
  try {
    const token = getToken();
    const config = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
    const response = await axios.get(`${API_BASE_URL}/alumnos/${curp}`, {
      headers: config,
    });
    return response.data[0];
  } catch (error) {
    console.error("Error al obtener el alumno por CURP:", error);
    return null;
  }
};

// Función pública para obtener un alumno por su CURP
export const getAlumnoByCurpPublic = async (curp) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/public/${curp}`);
    return response.data[0];
  } catch (error) {
    console.error("Error al obtener el alumno por CURP:", error);
    return null;
  }
};
