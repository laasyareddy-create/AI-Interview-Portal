import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loginSchema } from "../utils/validation";
import { loginUser } from "../services/authService";
import { login } from "../redux/authSlice";

import {
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import loginBg from "../assets/login-bg.png";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
  try {
    const user = loginUser(data);

    dispatch(login(user));

    toast.success(
      "Login Successful"
    );

    navigate("/dashboard");

  } catch (error) {
    toast.error(error.message);
  }
  };

  return (
  <div
  className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-cover bg-center"
  style={{
    backgroundImage: `url(${loginBg})`,
  }}
>

   

    {/* Login Card */}
    <div className="relative bg-white w-full max-w-sm rounded-[28px] shadow-xl p-6">

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center shadow-md">
          <FaGraduationCap className="text-3xl text-indigo-600" />
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center text-slate-900">
        Welcome Back
      </h1>

      <p className="text-center text-gray-500 mt-2 mb-6 text-lg">
        Login to continue
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Enter Password"
    {...register("password")}
    className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </button>
</div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-md hover:scale-[1.01] transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-center text-gray-700">
        Don't have an account?
        <Link
          to="/register"
          className="text-blue-600 font-semibold ml-2"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;