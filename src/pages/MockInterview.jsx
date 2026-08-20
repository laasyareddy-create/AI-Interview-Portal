import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

import {
  getMockInterviewsByCategory,
} from "../services/StudentMockInterviewService";

import {
  FaRobot,
  FaCode,
  FaClock,
  FaPlayCircle,
  FaInfoCircle,
  FaQuestionCircle,
  FaArrowLeft,
} from "react-icons/fa";

const categories = [
  "React.js",
  "Node.js",
  "JavaScript",
  "Aptitude",
  "HR Interview",
  "Communication Skills",
];

function MockInterview() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searched, setSearched] = useState(false);

  const handleFindInterviews = async () => {
    if (!category) {
      toast.error("Please select an interview category");
      return;
    }

    try {
      setLoading(true);
      setSearched(false);

      const response =
        await getMockInterviewsByCategory(category);

      setInterviews(response.data || []);
      setSearched(true);
    } catch (error) {
      console.error(error);

      setInterviews([]);
      setSearched(true);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load mock interviews"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

    // Clear previous category results
    setInterviews([]);
    setSearched(false);
  };

  const handleStartInterview = (interviewId) => {
    navigate(
      `/mock-interview-exam/${interviewId}`
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
        <div className="max-w-6xl mx-auto">

          {/* ================= HEADER CARD ================= */}

          <div className="bg-white rounded-[28px] shadow-md border border-gray-100 p-8 mb-8">

            <div className="flex items-center gap-5 mb-8">

              <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center">

                <FaRobot className="text-[#4F6EF7] text-3xl" />

              </div>

              <div>

                <h1 className="text-4xl font-bold text-slate-900">
                  Mock Interview
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                  Choose an interview category and practice
                  with available mock interviews.
                </p>

              </div>

            </div>

            <div className="border-t border-gray-200 pt-8">

              {/* CATEGORY */}

              <div className="mb-7">

                <label className="block text-lg font-semibold mb-3">
                  Interview Category
                </label>

                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">

                    <FaCode className="text-[#4F6EF7] text-base" />

                  </div>

                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full h-14 border border-gray-300 rounded-2xl pl-16 pr-5 text-base bg-white outline-none focus:border-blue-500"
                  >
                    <option value="">
                      Select Interview Category
                    </option>

                    {categories.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* FIND BUTTON */}

              <button
                type="button"
                onClick={handleFindInterviews}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold hover:opacity-95 transition disabled:opacity-60"
              >
                <div className="flex items-center justify-center gap-2">

                  <FaPlayCircle className="text-lg" />

                  <span>
                    {loading
                      ? "Loading Interviews..."
                      : "View Available Interviews"}
                  </span>

                </div>
              </button>

              {/* TIP */}

              <div className="mt-7 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">

                  <FaInfoCircle className="text-white text-base" />

                </div>

                <div>

                  <h3 className="font-semibold text-base">
                    Tip
                  </h3>

                  <p className="text-gray-600 text-sm">
                    Select the category you want to practice.
                    All available interviews created for that
                    category will appear below.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= INTERVIEW LIST ================= */}

          {searched && (

            <div className="bg-white rounded-[28px] shadow-md border border-gray-100 p-8">

              <div className="flex items-center justify-between mb-7">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {category} Mock Interviews
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Choose an interview to begin.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCategory("");
                    setInterviews([]);
                    setSearched(false);
                  }}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-50"
                >
                  <FaArrowLeft />

                  Change Category
                </button>

              </div>

              {/* EMPTY STATE */}

              {interviews.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-2xl py-16 text-center">

                  <FaQuestionCircle className="mx-auto text-4xl text-gray-300 mb-4" />

                  <h3 className="text-xl font-semibold text-gray-700">
                    No interviews available
                  </h3>

                  <p className="text-gray-500 mt-2">
                    No {category} mock interviews have been
                    created yet.
                  </p>

                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {interviews.map((interview) => (

                    <div
                      key={interview.id}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition bg-white"
                    >

                      {/* NAME */}

                      <div className="flex items-start justify-between gap-4 mb-5">

                        <div>

                          <h3 className="text-xl font-bold text-slate-900">
                            {interview.name}
                          </h3>

                          <span className="inline-block mt-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {interview.category}
                          </span>

                        </div>

                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">

                          <FaRobot className="text-indigo-600 text-xl" />

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="space-y-3 mb-6">

                        <div className="flex items-center gap-3 text-gray-600">

                          <FaClock className="text-indigo-500" />

                          <span>
                            Duration:{" "}
                            <strong>
                              {interview.duration} minutes
                            </strong>
                          </span>

                        </div>

                        <div className="flex items-center gap-3 text-gray-600">

                          <FaQuestionCircle className="text-indigo-500" />

                          <span>
                            Questions:{" "}
                            <strong>
                              {interview.totalQuestions ?? 0}
                            </strong>
                          </span>

                        </div>

                      </div>

                      {/* START */}

                      <button
                        type="button"
                        onClick={() =>
                          handleStartInterview(interview.id)
                        }
                        disabled={
                          !interview.totalQuestions ||
                          interview.totalQuestions === 0
                        }
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-95 transition disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center gap-2">

                          <FaPlayCircle />

                          {interview.totalQuestions > 0
                            ? "Start Interview"
                            : "No Questions Available"}

                        </div>
                      </button>

                    </div>

                  ))}

                </div>

              )}

            </div>

          )}

        </div>
      </div>
    </MainLayout>
  );
}

export default MockInterview;