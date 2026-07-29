import api from "./api";

export const getVerificationLogs = async () => {
    const response = await api.get("/verify/logs");
    return response.data;
};