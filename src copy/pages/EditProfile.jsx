import { useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaLink,
  FaBriefcase,
  FaSave,
  FaCamera,
} from "react-icons/fa";

import {
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi";

import {
  BsFilePerson,
} from "react-icons/bs";

function EditProfile() {
  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] =
    useState(currentUser.name || "");

  const [email, setEmail] =
    useState(currentUser.email || "");

  const [contactNumber, setContactNumber] =
    useState(
      currentUser.contactNumber || ""
    );

  const [about, setAbout] =
    useState(currentUser.about || "");

  const [skills, setSkills] =
    useState(currentUser.skills || "");

  const [resumeLink, setResumeLink] =
    useState(
      currentUser.resumeLink || ""
    );

  const [profileImage, setProfileImage] =
    useState(
      currentUser.profileImage || ""
    );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      name,
      email,
      contactNumber,
      about,
      skills,
      resumeLink,
      profileImage,
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
      "Profile Updated Successfully"
    );
  };

  return (
  <MainLayout>
    <div
  className="min-h-screen -m-8 p-8 bg-cover bg-center"
  style={{
    backgroundImage: `url(${loginBg})`,
  }}
>
      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Edit Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Update your personal information and preferences.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center w-32 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
            <HiOutlineUserCircle className="text-5xl text-indigo-400" />
          </div>

        </div>

        {/* Main Card */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

          {/* Profile Photo */}

          <div className="flex items-center gap-6">

            <div className="relative">

              <div className="w-28 h-28 rounded-full bg-indigo-50 overflow-hidden flex items-center justify-center">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-5xl text-indigo-300" />
                )}

              </div>

              <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer">
                <FaCamera className="text-blue-600 text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

            </div>

            <div>

              <h2 className="text-xl font-semibold mb-1">
                Profile Photo
              </h2>

              <p className="text-gray-500 text-sm mb-3">
                Upload a profile photo to personalize your account.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border rounded-lg p-2 text-sm"
              />

              <p className="text-gray-400 text-xs mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>

            </div>

          </div>

          <div className="border-t my-8"></div>

          {/* Personal Information */}

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <FaUser className="text-blue-600 text-sm" />
              </div>

              <h2 className="text-xl font-semibold">
                Personal Information
              </h2>
            </div>

            <div className="space-y-4">

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-xl py-3 pl-11 pr-4"
                  placeholder="Name"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-xl py-3 pl-11 pr-4"
                  placeholder="Email"
                />
              </div>

              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) =>
                    setContactNumber(e.target.value)
                  }
                  className="w-full border rounded-xl py-3 pl-11 pr-4"
                  placeholder="Contact Number"
                />
              </div>

            </div>

          </div>

          <div className="border-t my-8"></div>

          {/* About */}

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <BsFilePerson className="text-blue-600 text-sm" />
              </div>

              <h2 className="text-xl font-semibold">
                About
              </h2>
            </div>

            <textarea
              rows="5"
              value={about}
              onChange={(e) =>
                setAbout(e.target.value)
              }
              placeholder="Tell us about yourself..."
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div className="border-t my-8"></div>

          {/* Skills */}

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <HiOutlineSparkles className="text-blue-600 text-sm" />
              </div>

              <h2 className="text-xl font-semibold">
                Skills
              </h2>
            </div>

            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="React, JavaScript, SQL"
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div className="border-t my-8"></div>

          {/* Resume */}

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <FaBriefcase className="text-blue-600 text-sm" />
              </div>

              <h2 className="text-xl font-semibold">
                Resume
              </h2>
            </div>

            <div className="relative">

              <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                type="text"
                value={resumeLink}
                onChange={(e) =>
                  setResumeLink(e.target.value)
                }
                placeholder="Resume Link"
                className="w-full border rounded-xl py-3 pl-11 pr-4"
              />

            </div>

          </div>

          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <FaSave />
            Save Changes
          </button>

        </div>

      </div>
    </div>
  </MainLayout>
);
}

export default EditProfile;