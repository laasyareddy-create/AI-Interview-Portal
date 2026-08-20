import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";

import {
  getMockInterviewTemplateById,
  getStudentMockInterviewQuestions,
  submitMockInterviewResult,
} from "../services/StudentMockInterviewService";

import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaCode,
  FaCheckCircle,
  FaRobot,
  FaComments,
} from "react-icons/fa";

import loginBg from "../assets/login-bg.png";

const MockInterviewExam = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);

  // answers format:
  // [
  //   {
  //     questionId: 1,
  //     studentAnswer: "..."
  //   }
  // ]
  const [answers, setAnswers] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  // =========================
  // LOAD INTERVIEW
  // =========================

  useEffect(() => {
    loadInterview();
  }, [interviewId]);

  const loadInterview = async () => {
    try {
      setLoading(true);

      const [interviewResponse, questionsResponse] =
        await Promise.all([
          getMockInterviewTemplateById(interviewId),
          getStudentMockInterviewQuestions(interviewId),
        ]);

      const interviewData = interviewResponse.data;
      const questionData = questionsResponse.data || [];

      setInterview(interviewData);
      setQuestions(questionData);

      setTimeLeft(Number(interviewData.duration || 0) * 60);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load mock interview"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (
      loading ||
      !interview ||
      questions.length === 0 ||
      timeLeft <= 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);

          setTimeout(() => {
            handleSubmitInterview(true);
          }, 0);

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    loading,
    interview,
    questions.length,
    timeLeft,
  ]);

  // =========================
  // TIME FORMAT
  // =========================

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // =========================
  // ANSWER HELPERS
  // =========================

  const getAnswer = (questionId) => {
    return (
      answers.find(
        (item) => item.questionId === questionId
      )?.studentAnswer || ""
    );
  };

  const handleAnswerChange = (value) => {
    if (!questions[currentQuestion]) return;

    const questionId = questions[currentQuestion].id;

    setAnswers((previous) => {
      const existing = previous.find(
        (item) => item.questionId === questionId
      );

      if (existing) {
        return previous.map((item) =>
          item.questionId === questionId
            ? {
                ...item,
                studentAnswer: value,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          questionId,
          studentAnswer: value,
        },
      ];
    });
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmitInterview = async (
    autoSubmit = false
  ) => {
    if (submitting) return;

    if (!autoSubmit) {
      const confirmed = window.confirm(
        "Are you sure you want to submit this mock interview?"
      );

      if (!confirmed) {
        return;
      }
    }

    try {
      setSubmitting(true);

      let mcqCorrect = 0;
      let mcqTotal = 0;

      questions.forEach((question) => {
        if (
          question.type?.toUpperCase() === "MCQ"
        ) {
          mcqTotal++;

          const studentAnswer = getAnswer(
            question.id
          );

          if (
            studentAnswer &&
            studentAnswer.toUpperCase() ===
              question.correctAnswer?.toUpperCase()
          ) {
            mcqCorrect++;
          }
        }
      });

      const attempted = questions.filter(
        (question) => {
          return getAnswer(question.id).trim() !== "";
        }
      ).length;

      const percentage =
        mcqTotal > 0
          ? Math.round(
              (mcqCorrect / mcqTotal) * 100
            )
          : 0;

      const response =
        await submitMockInterviewResult({
          interviewId: Number(interviewId),

          answers,

          category: interview.category,

          attempted,

          totalQuestions: questions.length,

          score: mcqCorrect,

          percentage,
        });

      const savedInterviewId =
        response.data.id ??
        response.data.interviewId;

      navigate(
        `/mock-interview-result/${savedInterviewId}`,
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to submit mock interview"
      );

      setSubmitting(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <MainLayout>
        <div
          className="min-h-screen -m-8 p-8 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        >
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

            <p className="text-gray-500">
              Loading mock interview...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // =========================
  // NO INTERVIEW
  // =========================

  if (!interview) {
    return (
      <MainLayout>
        <div
          className="min-h-screen -m-8 p-8 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        >
          <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold mb-3">
              Interview not found
            </h2>

            <button
              onClick={() =>
                navigate("/mock-interview")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Back to Mock Interviews
            </button>

          </div>
        </div>
      </MainLayout>
    );
  }

  // =========================
  // NO QUESTIONS
  // =========================

  if (questions.length === 0) {
    return (
      <MainLayout>
        <div
          className="min-h-screen -m-8 p-8 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        >
          <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-10 text-center">

            <FaRobot className="text-5xl text-gray-300 mx-auto mb-4" />

            <h2 className="text-2xl font-bold">
              No Questions Available
            </h2>

            <p className="text-gray-500 mt-2">
              Questions have not been added to
              this interview yet.
            </p>

            <button
              onClick={() =>
                navigate("/mock-interview")
              }
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Back
            </button>

          </div>
        </div>
      </MainLayout>
    );
  }

  const question =
    questions[currentQuestion];

  const questionType =
    question.type?.toUpperCase();

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return (
    <MainLayout>

      {/* FULL PAGE BACKGROUND */}

      <div
        className="min-h-screen -m-8 p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >

        <div className="max-w-7xl mx-auto">

          {/* ================================= */}
          {/* INTERVIEW HEADER */}
          {/* ================================= */}

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-7 mb-7">

            <div className="flex items-start justify-between gap-6">

              {/* LEFT */}

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">

                  <FaRobot className="text-blue-600 text-3xl" />

                </div>

                <div>

                  <h1 className="text-3xl font-bold text-slate-900">
                    {interview.name}
                  </h1>

                  <div className="flex items-center gap-4 mt-2 text-gray-500">

                    <span>
                      Category:
                      <span className="text-blue-600 font-semibold ml-1">
                        {interview.category}
                      </span>
                    </span>

                    <span className="text-gray-300">
                      •
                    </span>

                    <span>
                      Duration:
                      <span className="text-blue-600 font-semibold ml-1">
                        {interview.duration} minutes
                      </span>
                    </span>

                  </div>

                </div>

              </div>

              {/* ORANGE TIMER */}

              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-600 shrink-0">

                <FaClock className="text-xl" />

                <span className="text-2xl font-bold">
                  {formatTime()}
                </span>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="mt-8">

              <div className="flex justify-between items-center mb-3">

                <span className="text-sm font-semibold text-gray-600">
                  Question {currentQuestion + 1} of{" "}
                  {questions.length}
                </span>

                <span className="text-sm font-semibold text-gray-500">
                  {Math.round(progress)}%
                </span>

              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* QUESTION CARD */}
          {/* ================================= */}

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

            {/* QUESTION TYPE */}

            <div className="mb-6">

              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                  questionType === "CODING"
                    ? "bg-purple-50 text-purple-700"
                    : questionType === "MCQ"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-green-50 text-green-700"
                }`}
              >

                {questionType === "CODING" ? (
                  <FaCode />
                ) : questionType === "MCQ" ? (
                  <FaCheckCircle />
                ) : (
                  <FaComments />
                )}

                {questionType === "CODING"
                  ? "Coding Question"
                  : questionType === "MCQ"
                  ? "MCQ Question"
                  : "Descriptive Question"}

              </span>

            </div>

            {/* QUESTION */}

            <h2 className="text-2xl font-bold text-slate-900 leading-relaxed mb-8">
              {question.question}
            </h2>

            {/* ================================= */}
            {/* MCQ */}
            {/* ================================= */}

            {questionType === "MCQ" && (

              <div className="space-y-4">

                {[
                  {
                    key: "A",
                    text: question.optionA,
                  },
                  {
                    key: "B",
                    text: question.optionB,
                  },
                  {
                    key: "C",
                    text: question.optionC,
                  },
                  {
                    key: "D",
                    text: question.optionD,
                  },
                ]
                  .filter(
                    (option) => option.text
                  )
                  .map((option) => (

                    <label
                      key={option.key}
                      className={`flex items-center gap-4 w-full border rounded-xl px-5 py-5 cursor-pointer transition ${
                        getAnswer(
                          question.id
                        ) === option.key
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >

                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.key}
                        checked={
                          getAnswer(
                            question.id
                          ) === option.key
                        }
                        onChange={() =>
                          handleAnswerChange(
                            option.key
                          )
                        }
                        className="w-5 h-5 accent-blue-600"
                      />

                      <span className="text-lg text-gray-900">
                        {option.text}
                      </span>

                    </label>

                  ))}

              </div>

            )}

            {/* ================================= */}
            {/* DESCRIPTIVE */}
            {/* ================================= */}

            {questionType === "DESCRIPTIVE" && (

              <div>

                <label className="block text-lg font-semibold text-gray-600 mb-3">
                  Your Answer
                </label>

                <textarea
                  rows="10"
                  value={getAnswer(
                    question.id
                  )}
                  onChange={(e) =>
                    handleAnswerChange(
                      e.target.value
                    )
                  }
                  placeholder="Type your answer here..."
                  className="w-full border border-gray-300 rounded-2xl p-5 text-gray-900 resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            )}

            {/* ================================= */}
            {/* CODING */}
            {/* ================================= */}

            {questionType === "CODING" && (

              <div>

                {(question.sampleInput ||
                  question.sampleOutput) && (

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                    {question.sampleInput && (

                      <div className="bg-slate-950 text-gray-100 rounded-2xl p-5">

                        <p className="text-sm text-gray-400 font-semibold mb-3">
                          Sample Input
                        </p>

                        <pre className="whitespace-pre-wrap font-mono text-sm">
                          {question.sampleInput}
                        </pre>

                      </div>

                    )}

                    {question.sampleOutput && (

                      <div className="bg-slate-950 text-gray-100 rounded-2xl p-5">

                        <p className="text-sm text-gray-400 font-semibold mb-3">
                          Sample Output
                        </p>

                        <pre className="whitespace-pre-wrap font-mono text-sm">
                          {question.sampleOutput}
                        </pre>

                      </div>

                    )}

                  </div>

                )}

                <label className="block text-lg font-semibold text-gray-600 mb-3">
                  Your Code
                </label>

                <textarea
                  rows="16"
                  value={getAnswer(
                    question.id
                  )}
                  onChange={(e) =>
                    handleAnswerChange(
                      e.target.value
                    )
                  }
                  placeholder="Write or paste your code here..."
                  spellCheck="false"
                  className="w-full bg-slate-950 text-gray-100 border border-slate-800 rounded-2xl p-5 font-mono text-sm resize-y outline-none focus:border-blue-500"
                />

              </div>

            )}

            {/* ================================= */}
            {/* NAVIGATION */}
            {/* ================================= */}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">

              {/* PREVIOUS */}

              <button
                type="button"
                disabled={
                  currentQuestion === 0
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
                className="flex items-center gap-3 border border-gray-300 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >

                <FaArrowLeft />

                Previous

              </button>

              {/* NEXT / SUBMIT */}

              {currentQuestion <
              questions.length - 1 ? (

                <button
                  type="button"
                  onClick={() =>
                    setCurrentQuestion(
                      currentQuestion + 1
                    )
                  }
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
                >

                  Next

                  <FaArrowRight />

                </button>

              ) : (

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    handleSubmitInterview(false)
                  }
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition disabled:opacity-60"
                >

                  {submitting
                    ? "Submitting..."
                    : "Submit Interview"}

                  <FaArrowRight />

                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default MockInterviewExam;