import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getQuestionsByAssessment } from "../services/questionService";
import { saveResult } from "../services/resultService";
import { submitAttempt } from "../services/attemptService";
import { FiClock, FiArrowLeft, FiArrowRight, FiSend } from "react-icons/fi";
import loginBg from "../assets/login-bg.png";

function AssessmentExam() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const assessment = state?.assessment;

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(1800);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await getQuestionsByAssessment(assessmentId);
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadQuestions();
  }, [assessmentId]);

  const submitAssessment = async () => {
    let correctAnswers = 0;

    questions.forEach((question) => {
      console.log("Question:", question.question);
      console.log("Selected:", answers[question.id]);
      console.log("Correct:", question.correctAnswer);

      if (answers[question.id] === question.correctAnswer) {
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
      studentName: user.name || "Unknown",
      studentEmail: user.email || "Unknown",

      assessmentId: Number(assessmentId),

      assessmentName: assessment?.name,

      category: assessment?.category,

      difficulty: assessment?.difficulty,

      score: correctAnswers,

      totalQuestions,

      percentage,

      correctAnswers,

      wrongAnswers,
    };

    try {

      // Save for Results page
      await saveResult(result);

      // Save for Analytics
      await submitAttempt({
        category: result.category,
        difficulty: result.difficulty,
        score: result.score,
        totalQuestions: result.totalQuestions,
        correctAnswers: result.correctAnswers,
        wrongAnswers: result.wrongAnswers,
        percentage: result.percentage,
      });

      navigate("/results");

    } catch (error) {

      console.error(error);

      alert("Failed to save assessment result.");

    }
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

        <div
          className="min-h-screen -m-8 p-8 bg-cover bg-center"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        >

          <h1 className="text-2xl font-bold text-slate-900">
            No Questions Found
          </h1>

        </div>

      </MainLayout>
    );
  }

  const question =
    questions[currentQuestion];

  return (
    <MainLayout>

      <div
        className="min-h-screen -m-8 p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >

        <div className="max-w-7xl mx-auto">

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

            {/* Header */}

            <div className="flex justify-between items-start mb-7">

              <div>

                <h1 className="text-4xl font-bold text-slate-900">
                  Assessment
                </h1>

                <p className="text-gray-500 text-lg mt-2">
                  Assessment ID : {assessmentId}
                </p>

              </div>

              {/* Timer */}

              <div className="flex items-center gap-3 border border-orange-200 bg-orange-50 text-orange-500 px-4 py-2 rounded-xl font-bold text-xl">

                <FiClock size={24} />

                <span>
                  {formatTime()}
                </span>

              </div>

            </div>

            {/* Divider */}

            <div className="border-t border-gray-200 mb-7" />

            {/* Question Number */}

            <div className="mb-4">

              <p className="text-xl font-semibold text-slate-900">
                Question {currentQuestion + 1}
                {" / "}
                {questions.length}
              </p>

            </div>

            {/* Question */}

            <h2 className="text-2xl font-bold text-slate-900 mb-7">
              {question.question}
            </h2>

            {/* Options */}

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
              ].map((option) => (

                <label
                  key={option.key}
                  className="flex items-center gap-4 w-full border border-gray-300 rounded-xl px-5 py-5 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition"
                >

                  <input
                    type="radio"
                    name="answer"
                    value={option.key}
                    checked={
                      answers[question.id] ===
                      option.key
                    }
                    onChange={() =>
                      handleAnswerChange(
                        option.key
                      )
                    }
                    className="w-5 h-5 accent-blue-600"
                  />

                  <span className="text-lg text-slate-900">
                    {option.text}
                  </span>

                </label>

              ))}

            </div>

            {/* Navigation */}

            <div className="flex justify-between items-center mt-8">

              <button
                disabled={
                  currentQuestion === 0
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
                className="flex items-center gap-2 border border-gray-400 bg-white text-slate-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                <FiArrowLeft size={20} />

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
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                Next

                <FiArrowRight size={20} />

              </button>

            </div>

            {/* Submit */}

            <button
              onClick={
                submitAssessment
              }
              className="mt-5 w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition"
            >

              <FiSend size={22} />

              Submit Assessment

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default AssessmentExam;