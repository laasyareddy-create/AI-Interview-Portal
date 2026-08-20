import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import { FaEnvelope } from "react-icons/fa";
import loginBg from "../assets/login-bg.png";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

function ForgotPassword() {

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  try {
    await forgotPassword({
      email: data.email,
    });

    toast.success(
      "OTP sent successfully to your email."
    );

    navigate("/forgot-password-otp", {
      state: {
        email: data.email,
      },
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to send OTP."
    );
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
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
          <FaEnvelope className="text-2xl text-indigo-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-slate-900">
        Forgot Password
      </h1>

      <p className="text-center text-gray-500 mt-1 mb-5 text-base">
        Enter your email address
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md"
        >
          Send OTP
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="text-blue-600 text-sm font-semibold hover:text-blue-700"
        >
          Back to Login
        </Link>
      </div>

    </div>
  </div>
);
}

export default ForgotPassword;