import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { FaMagic, FaArrowLeft } from "react-icons/fa";
import { generateAssessmentWithAI } from "../services/AssessmentService";

function GenerateAssessmentAI() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
    duration: 30,
    numberOfQuestions: 25,
  });
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleGenerate = async (e) => {
  e.preventDefault();

  try {
    setGenerating(true);

    const data = {
      name: formData.name,
      category: formData.category,
      difficulty: formData.difficulty,
      duration: Number(formData.duration),
      numberOfQuestions: Number(formData.numberOfQuestions),
    };

    const response = await generateAssessmentWithAI(data);

    console.log("AI Assessment Generated:", response);

    navigate(`/assessment-management/${response.id}/questions`);

  } catch (error) {
    console.error("AI Assessment Generation Failed:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to generate assessment with AI."
    );

  } finally {
    setGenerating(false);
  }
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

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/assessment-management")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium text-base mb-8 transition"
          >
            <FaArrowLeft />
            Back to Assessment Management
          </button>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <FaMagic className="text-white text-2xl" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-slate-900">
                  Generate Assessment with AI
                </h1>

                <p className="text-gray-500 mt-3 text-xl">
                  Configure your assessment and let AI generate the questions.
                </p>
              </div>

            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

            <form onSubmit={handleGenerate}>

              {/* Assessment Name */}
              <div className="mb-8">
                <label className="block text-base font-semibold text-slate-700 mb-3">
                  Assessment Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: React Fundamentals Assessment"
                  required
                  className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category + Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">

                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Java">
                        Java
                    </option>

                    <option value="React">
                      React
                    </option>

                    <option value="JavaScript">
                      JavaScript
                    </option>

                    <option value="SQL">
                      SQL
                    </option>

                    <option value="Aptitude">
                      Aptitude
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    Difficulty
                  </label>

                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">
                      Select Difficulty
                    </option>

                    <option value="Easy">
                      Easy
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Hard">
                      Hard
                    </option>
                  </select>
                </div>

              </div>

              {/* Duration + Number of Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">

                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    Duration
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      required
                      className="w-full px-5 py-4 pr-28 text-base rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                      minutes
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    Number of Questions
                  </label>

                  <input
                    type="number"
                    name="numberOfQuestions"
                    value={formData.numberOfQuestions}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    required
                    className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/assessment-management")
                  }
                  className="px-7 py-4 rounded-xl border border-gray-200 text-gray-600 text-base font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
  type="submit"
  disabled={generating}
  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-base font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
>
  <FaMagic />
  {generating ? "Generating Questions..." : "Generate Questions"}
</button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default GenerateAssessmentAI;