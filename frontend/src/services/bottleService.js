import axios from "axios";

const API = "http://127.0.0.1:5000/api/bottles";

export const registerBottle = async (bottleData) => {
    const response = await axios.post(`${API}/register`, bottleData);
    return response.data;
};

export const getBottles = async () => {
    const response = await axios.get(`${API}/all`);
    return response.data;
};
export const getBottleById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};