import axios from "axios";

const API_BASE_URL = "https://estilos-aprendizaje-backend.onrender.com/api";
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.data.token;
    } else {
      throw new Error("Error de autenticación");
    }
  } catch (error) {
    throw error;
  }
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  } else {
    return null; // Handle the case when running on the server
  }
};

export { login, getToken, removeToken };
