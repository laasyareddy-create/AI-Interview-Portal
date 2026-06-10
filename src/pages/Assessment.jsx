import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

import {
  FaClipboardList,
  FaPlayCircle,
} from "react-icons/fa";

function Assessment() {
  const navigate = useNavigate();

  const [category, setCategory] =
    useState("react");

  const [difficulty, setDifficulty] =
    useState("easy");

  const handleStartAssessment = () => {
    navigate(
      `/assessment-exam?category=${category}&difficulty=${difficulty}`
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
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-[30px] shadow-md border border-gray-100 p-8">

          {/* Header */}
          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center">
              <FaClipboardList className="text-[#4F6EF7] text-3xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Assessment Setup
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Configure your assessment preferences to get started.
              </p>
            </div>

          </div>

          <div className="border-t border-gray-200 pt-8">

            {/* Category */}
            <div className="mb-6">

              <label className="block text-lg font-semibold mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full h-14 border border-gray-300 rounded-2xl px-4 text-base"
              >
                <option value="react">
                  React
                </option>

                <option value="javascript">
                  JavaScript
                </option>

                <option value="sql">
                  SQL
                </option>

                <option value="dsa">
                  DSA
                </option>

                <option value="aptitude">
                  Aptitude
                </option>
              </select>

            </div>

            {/* Difficulty */}
            <div className="mb-6">

              <label className="block text-lg font-semibold mb-2">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="w-full h-14 border border-gray-300 rounded-2xl px-4 text-base"
              >
                <option value="easy">
                  Easy
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="hard">
                  Hard
                </option>
              </select>

            </div>

            {/* Duration */}
            <div className="mb-6">

              <label className="block text-lg font-semibold mb-2">
                Duration
              </label>

              <input
                type="text"
                value="30 Minutes"
                readOnly
                className="w-full h-14 border border-gray-300 rounded-2xl px-4 bg-white"
              />

            </div>

            {/* Questions */}
            <div className="mb-8">

              <label className="block text-lg font-semibold mb-2">
                Total Questions
              </label>

              <input
                type="text"
                value="5 Questions"
                readOnly
                className="w-full h-14 border border-gray-300 rounded-2xl px-4 bg-white"
              />

            </div>

            {/* Button */}
            <button
              onClick={handleStartAssessment}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold"
            >
              <div className="flex items-center justify-center gap-3">
                <FaPlayCircle />
                <span>Start Assessment</span>
              </div>
            </button>

          </div>

        </div>

      </div>
    </div>
  </MainLayout>
);
}

export default Assessment;