import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const forgotPassword = async (emailData) => {
  const response = await api.post("/auth/forgot-password", emailData);
  return response.data;
};

export const verifyForgotPasswordOtp = async (otpData) => {
  const response = await api.post(
    "/auth/verify-forgot-password-otp",
    otpData
  );

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const verifyOtp = async (otpData) => {
  const response = await api.post(
    "/auth/verify-otp",
    otpData
  );

  return response.data;
};

export const resetPassword = async (passwordData) => {
  const response = await api.post(
    "/auth/reset-password",
    passwordData
  );

  return response.data;
};