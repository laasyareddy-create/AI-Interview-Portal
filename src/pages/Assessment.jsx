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

  const [category, setCategory] = useState("React");
  const [difficulty, setDifficulty] = useState("Easy");

  const handleStartAssessment = () => {
    navigate("/assessment-list", {
      state: {
        category,
        difficulty,
      },
    });
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
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-14 border border-gray-300 rounded-2xl px-4 text-base"
                >
                  <option value="React">React</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="SQL">SQL</option>
                  <option value="Aptitude">Aptitude</option>
                </select>

              </div>

              {/* Difficulty */}
              <div className="mb-6">

                <label className="block text-lg font-semibold mb-2">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full h-14 border border-gray-300 rounded-2xl px-4 text-base"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">

                  <p className="text-gray-500">
                    Duration
                  </p>

                  <h2 className="text-3xl font-bold text-blue-600 mt-2">
                    30 Minutes
                  </h2>

                </div>

                <div className="bg-green-50 border border-green-100 rounded-2xl p-6">

                  <p className="text-gray-500">
                    Total Questions
                  </p>

                  <h2 className="text-3xl font-bold text-green-600 mt-2">
                    25 Questions
                  </h2>

                </div>

              </div>

              {/* Button */}
              <button
                onClick={handleStartAssessment}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold hover:opacity-95 transition"
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