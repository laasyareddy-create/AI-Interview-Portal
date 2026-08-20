import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiClipboard,
} from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import {
  createQuestion,
  getQuestionsByAssessment,
  updateQuestion,
  deleteQuestion,
} from "../services/questionService";
import loginBg from "../assets/login-bg.png";

const initialForm = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "A",
  marks: 1,
};

const ManageQuestions = () => {
  const { assessmentId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState(initialForm);

  const [editingQuestionId, setEditingQuestionId] =
    useState(null);

  useEffect(() => {
    if (assessmentId) {
      loadQuestions();
    }
  }, [assessmentId]);

  const loadQuestions = async () => {
    try {
      const data =
        await getQuestionsByAssessment(
          assessmentId
        );

      setQuestions(data);
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to load questions"
      );
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "marks"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingQuestionId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const questionData = {
        ...formData,
        assessmentId: Number(assessmentId),

        // Kept internally because the backend
        // currently requires marks.
        marks: 1,
      };

      if (editingQuestionId) {
        await updateQuestion(
          editingQuestionId,
          questionData
        );

        toast.success(
          "Question updated successfully"
        );
      } else {
        await createQuestion(questionData);

        toast.success(
          "Question added successfully"
        );
      }

      resetForm();
      await loadQuestions();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        (
          editingQuestionId
            ? "Failed to update question"
            : "Failed to add question"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestionId(question.id);

    setFormData({
      question: question.question || "",
      optionA: question.optionA || "",
      optionB: question.optionB || "",
      optionC: question.optionC || "",
      optionD: question.optionD || "",
      correctAnswer:
        question.correctAnswer || "A",

      // Keep internally, but don't show it
      // anywhere in the UI.
      marks: question.marks || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this question?"
      )
    ) {
      return;
    }

    try {
      await deleteQuestion(id);

      toast.success(
        "Question deleted successfully"
      );

      if (editingQuestionId === id) {
        resetForm();
      }

      await loadQuestions();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete question"
      );
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

        <div className="max-w-7xl mx-auto">

          {/* Page Header */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-slate-900">
              Manage Questions
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              Add, edit and delete questions for this assessment.
            </p>

          </div>

          {/* Main Content */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

            {/* LEFT - ADD QUESTION */}

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingQuestionId
                  ? "Edit Question"
                  : "Add Question"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Question */}

                <div>

                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Question
                  </label>

                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Enter question"
                    rows={4}
                    className="w-full border border-gray-400 rounded-lg p-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 resize-none"
                    required
                  />

                </div>

                {/* Option A */}

                <div>

                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Option A
                  </label>

                  <input
                    name="optionA"
                    value={formData.optionA}
                    onChange={handleChange}
                    placeholder="Enter option A"
                    className="w-full h-11 border border-gray-400 rounded-lg px-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
                    required
                  />

                </div>

                {/* Option B */}

                <div>

                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Option B
                  </label>

                  <input
                    name="optionB"
                    value={formData.optionB}
                    onChange={handleChange}
                    placeholder="Enter option B"
                    className="w-full h-11 border border-gray-400 rounded-lg px-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
                    required
                  />

                </div>

                {/* Option C */}

                <div>

                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Option C
                  </label>

                  <input
                    name="optionC"
                    value={formData.optionC}
                    onChange={handleChange}
                    placeholder="Enter option C"
                    className="w-full h-11 border border-gray-400 rounded-lg px-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
                    required
                  />

                </div>

                {/* Option D */}

                <div>

                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Option D
                  </label>

                  <input
                    name="optionD"
                    value={formData.optionD}
                    onChange={handleChange}
                    placeholder="Enter option D"
                    className="w-full h-11 border border-gray-400 rounded-lg px-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
                    required
                  />

                </div>

                {/* Correct Answer */}

                <div>

                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Correct Answer
                  </label>

                  <select
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    className="w-full h-11 border border-gray-400 rounded-lg px-3 text-gray-600 bg-white outline-none focus:border-blue-500"
                  >

                    <option value="A">
                      Select correct answer
                    </option>

                    <option value="A">
                      Option A
                    </option>

                    <option value="B">
                      Option B
                    </option>

                    <option value="C">
                      Option C
                    </option>

                    <option value="D">
                      Option D
                    </option>

                  </select>

                </div>

                <div>
  <label className="block text-sm font-medium text-gray-900 mb-2">
    Marks
  </label>

  <input
    type="number"
    name="marks"
    min="1"
    value={formData.marks}
    onChange={handleChange}
    placeholder="Enter marks"
    className="w-full h-11 border border-gray-400 rounded-lg px-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
    required
  />
</div>


                {/* Buttons */}

                <div className="flex gap-3 pt-1">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
                  >

                    <FiPlus size={19} />

                    {loading
                      ? editingQuestionId
                        ? "Updating..."
                        : "Adding..."
                      : editingQuestionId
                      ? "Update Question"
                      : "Add Question"}

                  </button>

                  {editingQuestionId && (

                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-400 rounded-lg bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

            {/* RIGHT - QUESTIONS */}

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">

              {/* Questions Header */}

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Questions
                </h2>

                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
                  {questions.length}
                </span>

              </div>

              {questions.length === 0 ? (

                /* EMPTY STATE */

                <div className="min-h-[610px] flex flex-col items-center justify-center text-center">

                  {/* Illustration */}

                  <div className="relative w-52 h-40 mb-6">

                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-20 bg-indigo-50 rounded-full" />

                    <div className="absolute left-1/2 -translate-x-1/2 top-3 w-28 h-36 rounded-xl border-[7px] border-indigo-200 bg-white">

                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-8 rounded-md bg-indigo-300" />

                      <div className="absolute top-12 left-5 w-16 h-2 rounded-full bg-indigo-100" />

                      <div className="absolute top-20 left-5 w-20 h-2 rounded-full bg-indigo-100" />

                      <div className="absolute top-28 left-5 w-16 h-2 rounded-full bg-indigo-100" />

                      <div className="absolute top-36 left-5 w-20 h-2 rounded-full bg-indigo-100" />

                    </div>

                    <div className="absolute right-8 top-10 w-14 h-14 rounded-full bg-indigo-300 flex items-center justify-center text-white text-3xl font-bold">
                      ?
                    </div>

                    <div className="absolute right-1 bottom-7 text-indigo-300 text-5xl rotate-[-35deg]">
                      /
                    </div>

                    <span className="absolute top-0 right-14 text-indigo-500 text-2xl">
                      /
                    </span>

                    <span className="absolute top-0 right-5 text-indigo-400 text-xl">
                      /
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    No questions added yet
                  </h3>

                  <p className="text-gray-500 text-lg mt-3 leading-7 max-w-md">
                    Start building your assessment by adding
                    <br />
                    your first question.
                  </p>

                  <button
                    onClick={() => {
                      document
                        .querySelector(
                          'textarea[name="question"]'
                        )
                        ?.focus();
                    }}
                    className="mt-6 flex items-center gap-2 border-2 border-indigo-500 text-indigo-600 bg-white hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition"
                  >

                    <FiPlus size={20} />

                    Add Your First Question

                  </button>

                </div>

              ) : (

                /* QUESTIONS EXIST */

                <div className="space-y-5">

                  {questions.map(
                    (question, index) => (

                      <div
                        key={question.id}
                        className="border border-gray-400 rounded-lg p-5"
                      >

                        {/* Question Header */}

                        <div className="flex justify-between items-center">

                          <h3 className="font-bold text-gray-900">
                            Question {index + 1}
                          </h3>

                          <div className="flex gap-4">

                            <button
                              onClick={() =>
                                handleEdit(question)
                              }
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                            >

                              <FiEdit2 size={17} />

                              Edit

                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  question.id
                                )
                              }
                              className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                            >

                              <FiTrash2 size={17} />

                              Delete

                            </button>

                          </div>

                        </div>

                        {/* Question Text */}

                        <p className="mt-5 text-gray-900">
                          {question.question}
                        </p>

                        {/* Options */}

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6 text-gray-900">

                          <div>
                            A. {question.optionA}
                          </div>

                          <div>
                            B. {question.optionB}
                          </div>

                          <div>
                            C. {question.optionC}
                          </div>

                          <div>
                            D. {question.optionD}
                          </div>

                        </div>

                        {/* Correct Answer */}

                        <p className="mt-6 text-green-600 font-medium">
                          Correct Answer:{" "}
                          {question.correctAnswer}
                        </p>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default ManageQuestions;