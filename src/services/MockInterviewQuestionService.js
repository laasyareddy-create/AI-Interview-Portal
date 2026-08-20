import api from "./api";

// Get all questions
export const getQuestions = (interviewId) => {
  return api.get(`/admin/mock-interviews/${interviewId}/questions`);
};

// Add question
export const createQuestion = (interviewId, data) => {
  return api.post(`/admin/mock-interviews/${interviewId}/questions`, data);
};

// Update question
export const updateQuestion = (questionId, data) =>
  api.put(`/admin/mock-interviews/questions/${questionId}`, data);

// Delete question
export const deleteQuestion = (questionId) =>
  api.delete(`/admin/mock-interviews/questions/${questionId}`);