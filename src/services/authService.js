import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

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

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export { login, getToken };
