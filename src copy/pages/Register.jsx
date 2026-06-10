import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerSchema } from "../utils/validation";
import { registerUser } from "../services/authService";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";

import loginBg from "../assets/login-bg.png";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
  try {
    registerUser(data);

    toast.success(
      "Registration Successful"
    );

    setTimeout(() => {
      navigate("/");
    }, 2000);

  } catch (error) {
    toast.error(error.message);
  }
};

  return (
  <div
    className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
    style={{
      backgroundImage: `url(${loginBg})`,
    }}
  >
    <div className="bg-white w-full max-w-sm rounded-[24px] shadow-xl p-6">

      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
          <FaUserPlus className="text-2xl text-indigo-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-slate-900">
        Create Account
      </h1>

      <p className="text-center text-gray-500 mt-1 mb-5 text-sm">
        Register to continue
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
      >

        <div>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <select
            {...register("role")}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">
              Student
            </option>

            <option value="trainer">
              Trainer
            </option>

            <option value="admin">
              Admin
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md"
        >
          Register
        </button>
      </form>

      <div className="flex items-center my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="text-center text-sm">
        Already have an account?
        <Link
          to="/"
          className="text-blue-600 ml-2 font-semibold"
        >
          Login
        </Link>
      </div>

    </div>
  </div>
);
}

export default Register;