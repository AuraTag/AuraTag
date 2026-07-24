import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
});

// Automatically attach JWT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Register Bottle
export const registerBottle = async (bottleData) => {
    const response = await API.post("/bottles/register", bottleData);
    return response.data;
};

// Get All Bottles
export const getAllBottles = async () => {
    const response = await API.get("/bottles/all");
    return response.data;
};

// Alias for older components
export const getBottles = getAllBottles;

// Get Bottle by ID
export const getBottleById = async (id) => {
    const response = await API.get(`/bottles/${id}`);
    return response.data;
};