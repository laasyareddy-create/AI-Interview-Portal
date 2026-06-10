import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { interviewQuestions } from "../mock/interviewQuestions";
import loginBg from "../assets/login-bg.png";

import {
  FaRobot,
  FaCode,
  FaClock,
  FaPlayCircle,
  FaInfoCircle,
} from "react-icons/fa";

function MockInterview() {
  const [category, setCategory] =
    useState("react");

  const [started, setStarted] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(900);

  const [result, setResult] =
    useState(null);

  const questions =
    interviewQuestions[category];

  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitInterview();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed]);

  const formatTime = () => {
    const minutes = Math.floor(
      timeLeft / 60
    );

    const seconds = timeLeft % 60;

    return `${minutes}:${
      seconds < 10
        ? `0${seconds}`
        : seconds
    }`;
  };

  const handleStartInterview = () => {
    setStarted(true);
  };

  const handleAnswerChange = (
    value
  ) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]:
        value,
    });
  };

  const handleSubmitInterview = () => {
    let score = 0;

    questions.forEach((question) => {
      if (
        question.type === "mcq" &&
        answers[question.id] ===
          question.answer
      ) {
        score++;
      }
    });

    const attempted =
      Object.keys(answers).length;

    const percentage = Math.round(
      (score / questions.length) *
        100
    );

    const user =
      JSON.parse(
        localStorage.getItem("user")
      ) || {};

    const interviewResult = {
      studentId: user.id,
      studentName: user.name,
      category,
      attempted,
      totalQuestions:
        questions.length,
      score,
      percentage,
      completedAt:
        new Date().toLocaleString(),
    };

    const history =
      JSON.parse(
        localStorage.getItem(
          "mockInterviewHistory"
        )
      ) || [];

    history.push(
      interviewResult
    );

    localStorage.setItem(
      "mockInterviewHistory",
      JSON.stringify(history)
    );

    setResult(interviewResult);
    setCompleted(true);
  };

  if (!started) {
  return (
    <MainLayout>
      <div
        className="min-h-screen -m-8 p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-[28px] shadow-md border border-gray-100 p-8">

            {/* Header */}
            <div className="flex items-center gap-5 mb-8">

              <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center">
                <FaRobot className="text-[#4F6EF7] text-3xl" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-slate-900">
                  Mock Interview
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                  Start a mock interview to practice and improve your skills.
                </p>
              </div>

            </div>

            <div className="border-t border-gray-200 pt-8">

              {/* Category */}
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
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="w-full h-14 border border-gray-300 rounded-2xl pl-16 pr-5 text-base bg-white outline-none focus:border-blue-500"
                  >
                    <option value="react">React.js</option>
                    <option value="javascript">JavaScript</option>
                    <option value="node">Node.js</option>
                    <option value="aptitude">Aptitude</option>
                    <option value="hr">HR Interview</option>
                    <option value="communication">
                      Communication Skills
                    </option>
                  </select>

                </div>

              </div>

              {/* Duration */}
              <div className="mb-7">

                <label className="block text-lg font-semibold mb-3">
                  Duration
                </label>

                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <FaClock className="text-[#4F6EF7] text-base" />
                  </div>

                  <input
                    value="15 Minutes"
                    readOnly
                    className="w-full h-14 border border-gray-300 rounded-2xl pl-16 pr-5 text-base bg-white"
                  />

                </div>

              </div>

              {/* Start Button */}
              <button
                onClick={handleStartInterview}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold hover:opacity-95 transition"
              >
                <div className="flex items-center justify-center gap-2">
                  <FaPlayCircle className="text-lg" />
                  <span>Start Interview</span>
                </div>
              </button>

              {/* Tip Box */}
              <div className="mt-7 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <FaInfoCircle className="text-white text-base" />
                </div>

                <div>

                  <h3 className="font-semibold text-base">
                    Tip
                  </h3>

                  <p className="text-gray-600 text-sm">
                    Choose a category and duration that matches your comfort level. Good luck!
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

  if (completed) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-xl shadow p-8 mb-8">

            <h1 className="text-3xl font-bold mb-6">
              Interview Results
            </h1>

            <div className="space-y-4">

              <p>
                <strong>
                  Category:
                </strong>{" "}
                {result.category}
              </p>

              <p>
                <strong>
                  Questions Attempted:
                </strong>{" "}
                {result.attempted} /{" "}
                {
                  result.totalQuestions
                }
              </p>

              <p>
                <strong>
                  Score:
                </strong>{" "}
                {result.score}
              </p>

              <p>
                <strong>
                  Percentage:
                </strong>{" "}
                {result.percentage}%
              </p>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              AI Feedback
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-bold mb-2">
                  Confidence Score
                </h3>

                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg inline-block">
                  75%
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">
                  Strengths
                </h3>

                <ul className="list-disc ml-6">
                  <li>
                    Good technical
                    understanding
                  </li>
                  <li>
                    Strong problem
                    solving
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">
                  Weaknesses
                </h3>

                <ul className="list-disc ml-6">
                  <li>
                    Communication
                    needs improvement
                  </li>
                  <li>
                    Coding speed can
                    be improved
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">
                  Suggestions
                </h3>

                <ul className="list-disc ml-6">
                  <li>
                    Practice more mock
                    interviews
                  </li>
                  <li>
                    Improve answer
                    explanations
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </MainLayout>
    );
  }

  const question =
    questions[currentQuestion];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex justify-between mb-6">

            <div>
              <h1 className="text-3xl font-bold capitalize">
                {category} Interview
              </h1>

              <p className="text-gray-500">
                Question{" "}
                {currentQuestion + 1}
                {" / "}
                {questions.length}
              </p>
            </div>

            <div className="text-red-600 text-2xl font-bold">
              {formatTime()}
            </div>

          </div>

          <div className="mb-6">

            <div className="mb-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                {question.type === "mcq"
                  ? "MCQ Round"
                  : question.type === "text"
                  ? "Theory Round"
                  : "Coding Challenge"}

              </span>
            </div>

            <h2 className="text-xl font-semibold">
              {question.question}
            </h2>

          </div>

          {question.type ===
            "mcq" &&
            question.options.map(
              (option) => (
                <label
                  key={option}
                  className="block mb-3"
                >
                  <input
                    type="radio"
                    value={option}
                    checked={
                      answers[
                        question.id
                      ] === option
                    }
                    onChange={() =>
                      handleAnswerChange(
                        option
                      )
                    }
                    className="mr-2"
                  />

                  {option}
                </label>
              )
            )}

          {question.type ===
            "text" && (
            <textarea
              rows="6"
              className="w-full border rounded-lg p-3"
              placeholder="Type your answer..."
              value={
                answers[
                  question.id
                ] || ""
              }
              onChange={(e) =>
                handleAnswerChange(
                  e.target.value
                )
              }
            />
          )}

          {question.type ===
            "coding" && (
            <textarea
              rows="10"
              className="w-full border rounded-lg p-3 font-mono"
              placeholder="Write your code here..."
              value={
                answers[
                  question.id
                ] || ""
              }
              onChange={(e) =>
                handleAnswerChange(
                  e.target.value
                )
              }
            />
          )}

          <div className="flex justify-between mt-8">

            <button
              disabled={
                currentQuestion === 0
              }
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion - 1
                )
              }
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>

            <button
              disabled={
                currentQuestion ===
                questions.length - 1
              }
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion + 1
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>

          </div>

          <button
            onClick={
              handleSubmitInterview
            }
            className="mt-8 w-full bg-green-600 text-white py-3 rounded"
          >
            Submit Interview
          </button>

        </div>

      </div>
    </MainLayout>
  );
}

export default MockInterview;