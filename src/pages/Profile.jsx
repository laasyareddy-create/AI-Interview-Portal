import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

import {
  FaUser,
  FaFileAlt,
  FaCode,
  FaPen,
  FaPlus,
} from "react-icons/fa";

import { FiChevronRight } from "react-icons/fi";

function Profile() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const skills = user.skills
    ? user.skills
        .split(",")
        .map((skill) => skill.trim())
    : [];

  return (
  <MainLayout>
    <div
      className="min-h-screen -m-8 p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}

        <div className="flex flex-col items-center text-center mb-10">

          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-[6px] border-white shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border-[6px] border-white shadow-md">
              <FaUser className="text-4xl text-indigo-500" />
            </div>
          )}

          <h1 className="text-3xl font-bold mt-4">
            {user.name || "Student"}
          </h1>

          <p className="text-gray-600 mt-2 max-w-xl leading-7">
            {user.about ||
              "Passionate learner preparing for technical interviews and continuously improving problem-solving skills."}
          </p>

        </div>

        {/* Personal Information */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-5">

          <div className="flex justify-between items-start">

            <div className="flex gap-4 flex-1">

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <FaUser className="text-purple-600" />
              </div>

              <div className="flex-1">

                <h2 className="text-xl font-semibold mb-5">
                  Personal Information
                </h2>

                <div className="grid grid-cols-2">

                  <div>
                    <p className="text-gray-500 text-sm mb-2">
                      Email
                    </p>

                    <p className="font-semibold break-all">
                      {user.email || "Not Added"}
                    </p>
                  </div>

                  <div className="border-l border-gray-200 pl-8">
                    <p className="text-gray-500 text-sm mb-2">
                      Contact Number
                    </p>

                    <p className="font-semibold">
                      {user.contactNumber || "Not Added"}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <Link
              to="/profile/edit"
              className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center"
            >
              <FaPen className="text-purple-600 text-sm" />
            </Link>

          </div>

        </div>

        {/* Resume */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-5">

          <div className="flex items-center">

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <FaFileAlt className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Resume
                </h2>

                <p className="text-gray-500 mt-1">
                  {user.resumeLink
                    ? "Resume Available"
                    : "No Resume Added"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Skills */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-5">

          <div className="flex items-center">

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <FaCode className="text-green-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Skills
                </h2>

                <p className="text-gray-500 mt-1">
                  {skills.length > 0
                    ? skills.join(", ")
                    : "No Skills Added"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Edit Profile */}

        <Link
          to="/profile/edit"
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition"
        >

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <FaPen className="text-orange-500" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Edit Profile
              </h2>

              <p className="text-gray-500 mt-1">
                Update your personal information and preferences
              </p>
            </div>

          </div>

          <FiChevronRight className="text-2xl text-gray-400" />

        </Link>

      </div>
    </div>
  </MainLayout>
);
}

export default Profile;