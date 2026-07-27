import axios from "axios";
import api from "./api";

const API = "http://127.0.0.1:5000/api/verify";

export const verifyBottle = async (uid) => {

    const response = await axios.get(`${API}/${uid}`);

    return response.data;

};


