import { useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

import {
  FaLock,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function ChangePassword() {
  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showCurrent, setShowCurrent] =
  useState(false);

const [showNew, setShowNew] =
  useState(false);

const [showConfirm, setShowConfirm] =
  useState(false);

  const handleUpdatePassword = () => {

    if (
      currentPassword !==
      currentUser.password
    ) {
      toast.error(
        "Current password is incorrect"
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    const updatedUser = {
      ...currentUser,
      password: newPassword,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const updatedUsers = users.map(
      (user) =>
        user.id === currentUser.id
          ? updatedUser
          : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    toast.success(
      "Password Updated Successfully"
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
  <MainLayout>
    <div
      className="min-h-screen -m-6 p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-start mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Change Password
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Update your password to keep your account secure.
            </p>
          </div>

          <div className="hidden md:block">
            <FaShieldAlt className="text-8xl text-indigo-400 opacity-80" />
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-10">

          <div className="space-y-8">

            {/* Current Password */}

            <div>
              <label className="font-semibold block mb-3">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={
                    showCurrent
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-4 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrent(
                      !showCurrent
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCurrent ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
            </div>

            {/* New Password */}

            <div>
              <label className="font-semibold block mb-3">
                New Password
              </label>

              <div className="relative">

                <input
                  type={
                    showNew
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-4 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNew(
                      !showNew
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNew ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label className="font-semibold block mb-3">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-4 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(
                      !showConfirm
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
            </div>

            <button
              onClick={
                handleUpdatePassword
              }
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Update Password
            </button>

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-blue-100 mt-8 p-6">

          <div className="flex items-center gap-4">

            <FaShieldAlt className="text-blue-500 text-2xl" />

            <div>
              <h3 className="font-bold">
                Security Tips
              </h3>

              <p className="text-gray-500">
                Use a strong password with a mix of letters,
                numbers, and special characters.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  </MainLayout>
);
}

export default ChangePassword;