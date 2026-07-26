import api from "./api";

export const getBatches = async () => {
  const response = await api.get("/batches/");
  return response.data;
};

export const createBatch = async (batch) => {
  const response = await api.post("/batches/generate", batch);
  return response.data;
};

export const getBatch = async (id) => {
  const response = await api.get(`/batches/${id}`);
  return response.data;
};

export const updateBatch = async (id, batch) => {
  const response = await api.put(`/batches/${id}`, batch);
  return response.data;
};

export const deleteBatch = async (id) => {
  const response = await api.delete(`/batches/${id}`);
  return response.data;
};