import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

import {
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

function Settings() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen -m-6 p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >
        <div className="max-w-4xl mx-auto pl-16">

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Settings
          </h1>

          <p className="text-gray-500 mb-8">
            Manage your account settings and security.
          </p>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <Link
              to="/profile/edit"
              className="flex items-center justify-between px-8 py-6 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaUser className="text-xl text-purple-600" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Edit Profile
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Manage your personal information
                  </p>
                </div>

              </div>

              <FaChevronRight className="text-lg text-gray-400" />
            </Link>

            <div className="border-t"></div>

            <Link
              to="/profile/password"
              className="flex items-center justify-between px-8 py-6 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaLock className="text-xl text-blue-600" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Change Password
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Update account security
                  </p>
                </div>

              </div>

              <FaChevronRight className="text-lg text-gray-400" />
            </Link>

          </div>

          <div className="bg-white rounded-3xl shadow-sm mt-8 p-8">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                  <FaSignOutAlt className="text-xl text-red-500" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Logout
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Sign out of your account securely
                  </p>
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-3 rounded-xl font-semibold transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;