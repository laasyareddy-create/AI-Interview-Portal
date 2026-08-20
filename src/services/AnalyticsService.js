import api from "./api";

// ===============================
// Student Analytics
// ===============================

export const getAnalytics = () => {
  return api.get("/analytics");
};

// ===============================
// Admin Analytics
// ===============================

export const getAdminAnalytics = async () => {
  const response = await api.get("/analytics/admin");
  return response.data;
};