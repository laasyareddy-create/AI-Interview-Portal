import api from "./api";

// ===============================
// Student Mock Interviews
// ===============================

// Get interviews by category
export const getMockInterviewsByCategory = (category) => {
  return api.get(
    `/mock-interview-templates/category/${encodeURIComponent(category)}`
  );
};

// Get one interview template
export const getMockInterviewTemplateById = (interviewId) => {
  return api.get(`/mock-interview-templates/${interviewId}`);
};

// Get interview questions
export const getStudentMockInterviewQuestions = (interviewId) => {
  return api.get(
    `/admin/mock-interviews/${interviewId}/questions`
  );
};

// Submit interview
export const submitMockInterviewResult = (data) => {
  return api.post("/mock-interviews", data);
};

// ===============================
// NEW
// Get complete AI interview result
// ===============================
export const getMockInterviewResult = (interviewId) => {
  return api.get(`/mock-interviews/${interviewId}`);
};