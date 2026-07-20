import axios from "axios";

const API = "http://127.0.0.1:5000/api/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
};