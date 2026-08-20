import api from "./api";

const QUESTION_URL = "/questions";

export const getAllQuestions = async () => {
  const response = await api.get(QUESTION_URL);
  return response.data;
};

export const getQuestionsByAssessment = async (assessmentId) => {
  const response = await api.get(
    `${QUESTION_URL}/assessment/${assessmentId}`
  );
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await api.post(QUESTION_URL, question);
  return response.data;
};

export const updateQuestion = async (id, question) => {
  const response = await api.put(
    `${QUESTION_URL}/${id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(
    `${QUESTION_URL}/${id}`
  );
  return response.data;
};