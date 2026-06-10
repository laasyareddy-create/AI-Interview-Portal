import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { questionBank } from "../mock/questions/questionBank";

function AssessmentExam() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category =
    searchParams.get("category");

  const difficulty =
    searchParams.get("difficulty");

  const questions =
    questionBank[category]?.[difficulty] || [];

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(1800);

  const submitAssessment = () => {
    let correctAnswers = 0;

    questions.forEach((question) => {
      if (
        answers[question.id] ===
        question.answer
      ) {
        correctAnswers++;
      }
    });

    const totalQuestions =
      questions.length;

    const wrongAnswers =
      totalQuestions - correctAnswers;

    const percentage = Math.round(
      (correctAnswers /
        totalQuestions) *
        100
    );

    const user =
      JSON.parse(
        localStorage.getItem("user")
      ) || {};

    const result = {
      studentId: user.id,

      studentName:
        user.name || "Unknown",

      studentEmail:
        user.email || "Unknown",

      category,

      difficulty,

      score: correctAnswers,

      totalQuestions,

      percentage,

      correctAnswers,

      wrongAnswers,

      attemptedAt:
        new Date().toLocaleString(),
    };

    localStorage.setItem(
      "latestResult",
      JSON.stringify(result)
    );

    const history =
      JSON.parse(
        localStorage.getItem(
          "assessmentHistory"
        )
      ) || [];

    history.push(result);

    localStorage.setItem(
      "assessmentHistory",
      JSON.stringify(history)
    );

    navigate("/results");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          submitAssessment();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

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

  const handleAnswerChange = (
    value
  ) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]:
        value,
    });
  };

  if (!questions.length) {
    return (
      <MainLayout>
        <h1 className="text-2xl font-bold">
          No Questions Found
        </h1>
      </MainLayout>
    );
  }

  const question =
    questions[currentQuestion];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between mb-6">

            <div>
              <h1 className="text-3xl font-bold capitalize">
                {category} Assessment
              </h1>

              <p className="capitalize text-gray-500">
                {difficulty}
              </p>
            </div>

            <div className="text-red-600 font-bold text-xl">
              {formatTime()}
            </div>

          </div>

          <div className="mb-4">
            Question {currentQuestion + 1}
            {" / "}
            {questions.length}
          </div>

          <h2 className="text-xl font-semibold mb-6">
            {question.question}
          </h2>

          {question.options.map(
            (option) => (
              <label
                key={option}
                className="block mb-3"
              >
                <input
                  type="radio"
                  name="answer"
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
              submitAssessment
            }
            className="mt-8 w-full bg-green-600 text-white py-3 rounded"
          >
            Submit Assessment
          </button>

        </div>
      </div>
    </MainLayout>
  );
}

export default AssessmentExam;