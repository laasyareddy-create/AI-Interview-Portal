import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiCode,
} from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "../services/MockInterviewQuestionService";
import loginBg from "../assets/login-bg.png";

const initialForm = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "",
  expectedAnswer: "",
  sampleInput: "",
  sampleOutput: "",
};

const ManageMockInterviewQuestions = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [questionType, setQuestionType] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadQuestions();
  }, [interviewId]);

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const response = await getQuestions(interviewId);

      setQuestions(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setQuestionType("");
    setFormData(initialForm);
  };

  const saveQuestion = async () => {
    if (!formData.question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const payload = {
      type: questionType,
      ...formData,
    };

    try {
      if (editingId) {
        await updateQuestion(editingId, payload);

        toast.success("Question updated successfully");
      } else {
        await createQuestion(interviewId, payload);

        toast.success("Question added successfully");
      }

      resetForm();

      loadQuestions();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to save question"
      );
    }
  };

  const handleEdit = (question) => {
    setEditingId(question.id);

    setQuestionType(question.type);

    setFormData({
      question: question.question || "",
      optionA: question.optionA || "",
      optionB: question.optionB || "",
      optionC: question.optionC || "",
      optionD: question.optionD || "",
      correctAnswer: question.correctAnswer || "",
      expectedAnswer: question.expectedAnswer || "",
      sampleInput: question.sampleInput || "",
      sampleOutput: question.sampleOutput || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) {
      return;
    }

    try {
      await deleteQuestion(id);

      toast.success("Question deleted");

      loadQuestions();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete question");
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
        <div className="max-w-7xl mx-auto bg-white rounded-[30px] shadow-lg border border-gray-100 p-9">

          {/* Header */}

          <div className="flex justify-between items-start mb-8">

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Manage Mock Interview Questions
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Interview ID: {interviewId}
              </p>
            </div>

            <button
              onClick={() => navigate("/mock-interview-management")}
              className="flex items-center gap-2 border border-gray-400 bg-white text-slate-800 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              <FiArrowLeft size={18} />
              Back to Interviews
            </button>

          </div>

          {/* Question Type Buttons */}

          <div className="flex gap-4 mb-6">

            {/* MCQ */}

            <button
              onClick={() => {
                resetForm();
                setQuestionType("MCQ");
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition ${
                questionType === "MCQ"
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-50"
              }`}
            >
              <FiPlus size={20} />
              Add MCQ
            </button>

            {/* Descriptive */}

            <button
              onClick={() => {
                resetForm();
                setQuestionType("DESCRIPTIVE");
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition ${
                questionType === "DESCRIPTIVE"
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-50"
              }`}
            >
              <FiPlus size={20} />
              Add Descriptive
            </button>

            {/* Coding */}

            <button
              onClick={() => {
                resetForm();
                setQuestionType("CODING");
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition ${
                questionType === "CODING"
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-50"
              }`}
            >
              <FiCode size={19} />
              Add Coding
            </button>

          </div>

          {/* Divider */}

          <div className="border-t border-gray-200 mb-5" />

          {/* Question Form */}

          {(questionType === "MCQ" ||
            questionType === "DESCRIPTIVE" ||
            questionType === "CODING") && (

            <div className="border border-gray-200 rounded-xl p-5 mb-6">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                {editingId ? "Edit" : "Add"}{" "}
                {questionType === "MCQ"
                  ? "MCQ"
                  : questionType === "DESCRIPTIVE"
                  ? "Descriptive"
                  : "Coding"}{" "}
                Question
              </h2>

              {/* Question */}

              <textarea
                rows="4"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter question"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              />

              {/* MCQ */}

              {questionType === "MCQ" && (
                <div className="space-y-3">

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-medium">
                      A
                    </div>

                    <input
                      name="optionA"
                      value={formData.optionA}
                      onChange={handleChange}
                      placeholder="Option A"
                      className="flex-1 h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-medium">
                      B
                    </div>

                    <input
                      name="optionB"
                      value={formData.optionB}
                      onChange={handleChange}
                      placeholder="Option B"
                      className="flex-1 h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-medium">
                      C
                    </div>

                    <input
                      name="optionC"
                      value={formData.optionC}
                      onChange={handleChange}
                      placeholder="Option C"
                      className="flex-1 h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-medium">
                      D
                    </div>

                    <input
                      name="optionD"
                      value={formData.optionD}
                      onChange={handleChange}
                      placeholder="Option D"
                      className="flex-1 h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <select
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-blue-500"
                  >
                    <option value="">
                      Select correct answer
                    </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>

                </div>
              )}

              

              {/* Coding */}

              {questionType === "CODING" && (
  <div className="space-y-4">

    <textarea
      rows="3"
      name="sampleInput"
      value={formData.sampleInput}
      onChange={handleChange}
      placeholder="Sample input"
      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
    />

    <textarea
      rows="3"
      name="sampleOutput"
      value={formData.sampleOutput}
      onChange={handleChange}
      placeholder="Sample output"
      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
    />

  </div>
)}

              {/* Form Buttons */}

              <div className="flex gap-3 mt-4">

                <button
                  onClick={saveQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
                >
                  {editingId
                    ? "Update Question"
                    : "Save Question"}
                </button>

                <button
                  onClick={resetForm}
                  className="border border-gray-400 bg-white px-6 py-2.5 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

          {/* Questions Table */}

          <div className="border border-gray-200 rounded-xl overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr className="border-b border-gray-200">

                  <th className="p-4 text-left font-semibold text-gray-900">
                    Question
                  </th>

                  <th className="p-4 text-center font-semibold text-gray-900">
                    Type
                  </th>

                  <th className="p-4 text-center font-semibold text-gray-900">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-12 text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>

                ) : questions.length === 0 ? (

                  /* EMPTY STATE */

                  <tr>

                    <td colSpan="3">

                      <div className="min-h-[475px] flex flex-col items-center justify-center text-center">

                        {/* Illustration */}

                        <div className="relative w-52 h-40 mb-4">

                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-20 bg-blue-50 rounded-full" />

                          <div className="absolute left-1/2 -translate-x-1/2 top-4 w-28 h-36 border-[7px] border-blue-200 rounded-xl bg-white">

                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-8 rounded-lg bg-blue-300" />

                            <div className="absolute top-10 left-5 w-16 h-2 rounded-full bg-blue-100" />
                            <div className="absolute top-18 left-5 w-20 h-2 rounded-full bg-blue-100" />
                            <div className="absolute top-26 left-5 w-16 h-2 rounded-full bg-blue-100" />
                            <div className="absolute top-34 left-5 w-20 h-2 rounded-full bg-blue-100" />

                          </div>

                          <div className="absolute right-10 top-12 w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center text-white text-3xl font-bold">
                            ?
                          </div>

                          <FiPenTool
                            className="absolute right-1 bottom-7 text-blue-400 rotate-[-35deg]"
                            size={46}
                          />

                          <span className="absolute top-1 right-14 text-blue-500 text-2xl">
                            /
                          </span>

                          <span className="absolute top-0 right-5 text-blue-400 text-xl">
                            /
                          </span>

                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">
                          No questions added yet.
                        </h2>

                        <p className="text-gray-500 text-lg mt-3 leading-7">
                          Start building your mock interview by adding MCQ,
                          <br />
                          descriptive, or coding questions.
                        </p>

                        <button
                          onClick={() => {
                            resetForm();
                            setQuestionType("MCQ");
                          }}
                          className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition"
                        >
                          <FiPlus size={21} />
                          Add Your First Question
                        </button>

                      </div>

                    </td>

                  </tr>

                ) : (

                  /* QUESTIONS EXIST */

                  questions.map((question) => (

                    <tr
                      key={question.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >

                      <td className="p-4 text-gray-900">
                        {question.question}
                      </td>

                      <td className="p-4 text-center">

                        <span className="inline-flex px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
                          {question.type}
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              handleEdit(question)
                            }
                            className="flex items-center gap-2 border border-blue-400 text-blue-600 bg-white hover:bg-blue-50 px-4 py-2 rounded-lg transition"
                          >
                            <FiEdit2 size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(question.id)
                            }
                            className="flex items-center gap-2 border border-red-400 text-red-600 bg-white hover:bg-red-50 px-4 py-2 rounded-lg transition"
                          >
                            <FiTrash2 size={16} />
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ManageMockInterviewQuestions;