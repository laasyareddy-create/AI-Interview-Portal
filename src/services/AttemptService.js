import api from "./api";

export const submitAttempt = async (attemptData) => {
  const response = await api.post("/attempts", attemptData);
  return response.data;
};

export const getMyAttempts = async () => {
  const response = await api.get("/attempts");
  return response.data;
};

export const getAllAttempts = async () => {
  const response = await api.get("/attempts/all");
  return response.data;
};