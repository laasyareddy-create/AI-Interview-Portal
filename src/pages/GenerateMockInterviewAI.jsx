import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { FaMagic, FaArrowLeft } from "react-icons/fa";
import { generateMockInterviewWithAI } from "../services/MockInterviewService";

function GenerateMockInterviewAI() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: "",
  category: "",
  duration: 30,
  numberOfQuestions: 10,
  questionTypes: [],
    questionCounts: {
      MCQ: 0,
      CODING: 0,
      DESCRIPTIVE: 0,
    },
  });

  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleQuestionTypeChange = (type) => {
    setFormData((current) => {
      const isSelected = current.questionTypes.includes(type);

      return {
        ...current,
        questionTypes: isSelected
          ? current.questionTypes.filter((item) => item !== type)
          : [...current.questionTypes, type],
        questionCounts: {
          ...current.questionCounts,
          [type]: isSelected
            ? 0
            : current.questionCounts[type],
        },
      };
    });
  };

  const handleQuestionCountChange = (type, value) => {
    setFormData((current) => ({
      ...current,
      questionCounts: {
        ...current.questionCounts,
        [type]: Number(value),
      },
    }));
  };

  const selectedQuestionTotal =
    formData.questionTypes.reduce(
      (total, type) =>
        total + (formData.questionCounts[type] || 0),
      0
    );

  const totalQuestions = Number(formData.numberOfQuestions);

  const distributionIsValid =
    formData.questionTypes.length > 0 &&
    selectedQuestionTotal === totalQuestions;

  const handleGenerate = async (e) => {
  e.preventDefault();

  if (!distributionIsValid) {
    return;
  }

  try {
    setGenerating(true);

    const data = {
      name: formData.name,
      category: formData.category,
      numberOfQuestions: Number(formData.numberOfQuestions),
      questionTypes: formData.questionTypes,
      questionCounts: formData.questionTypes.reduce(
        (counts, type) => {
          counts[type] = Number(formData.questionCounts[type] || 0);
          return counts;
        },
        {}
      ),
      duration: Number(formData.duration),
    };

    const response = await generateMockInterviewWithAI(data);

    console.log("AI Mock Interview Generated:", response);

    navigate(
      `/mock-interview-management/${response.id}/questions`
    );

  } catch (error) {
    console.error(
      "AI Mock Interview Generation Failed:",
      error
    );

    alert(
      error?.response?.data?.message ||
        "Failed to generate mock interview with AI."
    );

  } finally {
    setGenerating(false);
  }
};

  const isCommunicationCategory =
  formData.category === "Communication Skills" ||
  formData.category === "HR Interview";

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
            onClick={() =>
              navigate("/mock-interview-management")
            }
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium text-base mb-8 transition"
          >
            <FaArrowLeft />
            Back to Mock Interview Management
          </button>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <FaMagic className="text-white text-2xl" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-slate-900">
                  Generate Mock Interview with AI
                </h1>

                <p className="text-gray-500 mt-3 text-xl">
                  Configure your mock interview and let AI generate the questions.
                </p>
              </div>

            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

            <form onSubmit={handleGenerate}>

              {/* Interview Name */}
              <div className="mb-8">
                <label className="block text-base font-semibold text-slate-700 mb-3">
                  Interview Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: React Technical Mock Interview"
                  required
                  className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
<div className="mb-8">

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

      <option value="React.js">
        React.js
      </option>

      <option value="JavaScript">
        JavaScript
      </option>

      <option value="Node.js">
        Node.js
      </option>

      <option value="Aptitude">
        Aptitude
      </option>

      <option value="Communication Skills">
        Communication Skills
      </option>

      <option value="HR Interview">
        HR Interview
      </option>
    </select>
  </div>

</div>

{/* Duration */}
<div className="mb-8">

  <label className="block text-base font-semibold text-slate-700 mb-3">
    Duration (minutes)
  </label>

  <input
    type="number"
    name="duration"
    value={formData.duration}
    onChange={handleChange}
    min="1"
    required
    className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />

</div>

              {/* Number of Questions */}
              <div className="mb-8">

                <label className="block text-base font-semibold text-slate-700 mb-3">
                  Number of Questions
                </label>

                <input
                  type="number"
                  name="numberOfQuestions"
                  value={formData.numberOfQuestions}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  required
                  className="w-full px-5 py-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              {/* Question Types */}
              <div className="mb-8">

                <label className="block text-base font-semibold text-slate-700 mb-4">
                  Question Types
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* MCQ */}
                  {!isCommunicationCategory && (
                    <button
                      type="button"
                      onClick={() =>
                        handleQuestionTypeChange("MCQ")
                      }
                      className={`p-5 rounded-2xl border text-left transition ${
                        formData.questionTypes.includes("MCQ")
                          ? "border-purple-500 bg-purple-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50"
                      }`}
                    >
                      <p className="font-bold text-slate-900 text-lg">
                        MCQ
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Multiple choice questions
                      </p>
                    </button>
                  )}

                  {/* Coding */}
                  {!isCommunicationCategory && (
                    <button
                      type="button"
                      onClick={() =>
                        handleQuestionTypeChange("CODING")
                      }
                      className={`p-5 rounded-2xl border text-left transition ${
                        formData.questionTypes.includes("CODING")
                          ? "border-purple-500 bg-purple-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50"
                      }`}
                    >
                      <p className="font-bold text-slate-900 text-lg">
                        Coding
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Programming problems
                      </p>
                    </button>
                  )}

                  {/* Descriptive */}
                  <button
                    type="button"
                    onClick={() =>
                      handleQuestionTypeChange("DESCRIPTIVE")
                    }
                    className={`p-5 rounded-2xl border text-left transition ${
                      formData.questionTypes.includes("DESCRIPTIVE")
                        ? "border-purple-500 bg-purple-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-lg">
                      Descriptive
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Interview-style questions
                    </p>
                  </button>

                </div>

              </div>

              {/* Question Distribution */}
              {formData.questionTypes.length > 0 && (
                <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 mb-8">

                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Question Distribution
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Choose how many questions AI should generate for each selected type.
                      </p>
                    </div>

                    <div
                      className={`text-sm font-semibold ${
                        distributionIsValid
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {selectedQuestionTotal} / {totalQuestions}
                    </div>

                  </div>

                  <div className="space-y-4">

                    {formData.questionTypes.map((type) => (

                      <div
                        key={type}
                        className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4"
                      >

                        <div>
                          <p className="font-semibold text-slate-900">
                            {type === "CODING"
                              ? "Coding"
                              : type === "DESCRIPTIVE"
                              ? "Descriptive"
                              : "MCQ"}
                          </p>
                        </div>

                        <input
                          type="number"
                          min="0"
                          max={totalQuestions}
                          value={formData.questionCounts[type]}
                          onChange={(e) =>
                            handleQuestionCountChange(
                              type,
                              e.target.value
                            )
                          }
                          className="w-28 px-4 py-3 text-center rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                      </div>

                    ))}

                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between">

                    <span className="font-semibold text-slate-700">
                      Total Questions
                    </span>

                    <span
                      className={`font-bold ${
                        distributionIsValid
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {selectedQuestionTotal} / {totalQuestions}
                    </span>

                  </div>

                  {!distributionIsValid && (
                    <p className="text-sm text-red-500 mt-3">
                      The question distribution must equal the total number of questions.
                    </p>
                  )}

                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-4">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/mock-interview-management")
                  }
                  className="px-7 py-4 rounded-xl border border-gray-200 text-gray-600 text-base font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!distributionIsValid || generating}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white text-base font-semibold shadow-md transition ${
                    distributionIsValid
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {generating ? (
  <>
    <span className="animate-spin">⟳</span>
    Generating...
  </>
) : (
  <>
    <FaMagic />
    Generate Questions
  </>
)}
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default GenerateMockInterviewAI;