import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { verifyOtp } from "../services/authService";
import loginBg from "../assets/login-bg.png";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email information is missing.");
      navigate("/register");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp({
        email,
        otp,
      });

      toast.success("Email verified successfully. Please login.");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
  style={{
    backgroundImage: `url(${loginBg})`,
  }}
>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-900">
          Verify Your Email
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Enter the 6-digit OTP sent to:
        </p>

        <p className="text-blue-600 font-semibold text-center mt-2 mb-6">
          {email}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default VerifyOtp;