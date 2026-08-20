import api from "./api";

export const getAllMockInterviews = () =>
    api.get("/admin/mock-interviews");

export const getMockInterviewById = (id) =>
    api.get(`/admin/mock-interviews/${id}`);

export const createMockInterview = (data) =>
    api.post("/admin/mock-interviews", data);

export const updateMockInterview = (id, data) =>
    api.put(`/admin/mock-interviews/${id}`, data);

export const deleteMockInterview = (id) =>
    api.delete(`/admin/mock-interviews/${id}`);

export const getAllMockInterviewResults = async () => {
  const response = await api.get("/mock-interviews/all");
  return response.data;
};