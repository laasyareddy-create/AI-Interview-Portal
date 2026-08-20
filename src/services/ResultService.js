import api from "./api";

export const saveResult = async (resultData) => {
  const response = await api.post("/results", resultData);
  return response.data;
};

export const getStudentResults = async (studentId) => {
  const response = await api.get(`/results/student/${studentId}`);
  return response.data;
};

export const getAllResults = async () => {
  const response = await api.get("/results");
  return response.data;
};

export const getResult = async (id) => {
  const response = await api.get(`/results/${id}`);
  return response.data;
};