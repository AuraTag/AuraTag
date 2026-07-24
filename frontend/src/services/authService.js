import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
});

export const login = async (email, password) => {
    const response = await API.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};