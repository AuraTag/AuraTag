import api from "./api";

export const getBottles = async () => {
  const response = await api.get("/bottles/all");
  return response.data;
};

export const getBottle = async (id) => {
  const response = await api.get(`/bottles/${id}`);
  return response.data;
};

// Alias so both names work
export const getBottleById = getBottle;

export const registerBottle = async (data) => {
  const response = await api.post("/bottles/register", data);
  return response.data;
};