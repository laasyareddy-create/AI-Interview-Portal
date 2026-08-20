import api from "./api";

const BASE_URL = "/assessments";

export const getAllAssessments = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const getAssessmentById = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

// ⭐ NEW
export const filterAssessments = async (
  category,
  difficulty
) => {
  const response = await api.get(
    `${BASE_URL}/filter`,
    {
      params: {
        category,
        difficulty,
      },
    }
  );

  return response.data;
};

export const createAssessment = async (assessment) => {
  const response = await api.post(BASE_URL, assessment);
  return response.data;
};

export const updateAssessment = async (id, assessment) => {
  const response = await api.put(
    `${BASE_URL}/${id}`,
    assessment
  );
  return response.data;
};

export const deleteAssessment = async (id) => {
  const response = await api.delete(
    `${BASE_URL}/${id}`
  );
  return response.data;
};