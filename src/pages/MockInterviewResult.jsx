import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getMockInterviewResult } from "../services/StudentMockInterviewService";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaRobot,
  FaHome,
  FaLightbulb,
  FaCode,
} from "react-icons/fa";

const MockInterviewResult = () => {

  const navigate = useNavigate();

  const { interviewId } = useParams();

  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState(null);

  useEffect(() => {

    loadResult();

  }, [interviewId]);

  const loadResult = async () => {

    try {

      const response =
        await getMockInterviewResult(interviewId);

      setResult(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const getBadgeColor = (correctness) => {

  const value = (correctness || "").toLowerCase().trim();

  if (value === "correct") {
    return "bg-green-50 text-green-700";
  }

  if (value.includes("partial")) {
    return "bg-yellow-50 text-yellow-700";
  }

  return "bg-red-50 text-red-700";
};

  const renderStudentAnswer = (answer) => {

    if (!answer.studentAnswer || answer.studentAnswer.trim() === "") {
      return "Not Answered";
    }

    if (answer.questionType?.toUpperCase() === "MCQ") {

      const optionMap = {
        A: answer.optionA,
        B: answer.optionB,
        C: answer.optionC,
        D: answer.optionD,
      };

      return `${answer.studentAnswer}. ${
        optionMap[answer.studentAnswer] || ""
      }`;
    }

    return answer.studentAnswer;
  };
    if (loading) {

    return (

      <MainLayout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <div className="text-center">

            <FaRobot className="text-5xl text-indigo-600 mx-auto mb-5 animate-pulse" />

            <h2 className="text-2xl font-bold">

              Loading Interview Result...

            </h2>

          </div>

        </div>

      </MainLayout>

    );

  }

  if (!result) {

    return (

      <MainLayout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10 max-w-xl w-full text-center">

            <FaRobot className="text-5xl text-gray-300 mx-auto mb-5" />

            <h1 className="text-2xl font-bold text-slate-900">

              Result Not Found

            </h1>

            <p className="text-gray-500 mt-3">

              Unable to load this interview result.

            </p>

            <button
              onClick={() => navigate("/analytics")}
              className="mt-7 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              View Analytics
            </button>

          </div>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="min-h-screen bg-gray-100 -m-8 p-8">

        <div className="max-w-5xl mx-auto">

          {/* RESULT SUMMARY */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-7">

            <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-6">

              <div>

                <div className="flex items-center gap-3 mb-2">

                  <FaCheckCircle className="text-green-600 text-3xl" />

                  <h1 className="text-3xl font-bold text-slate-900">

                    Interview Completed

                  </h1>

                </div>

                <h2 className="text-xl font-semibold text-gray-700 mt-4">

                  {result.interviewName}

                </h2>

                <p className="text-gray-500 mt-1">

                  {result.category}

                </p>

              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-3xl px-8 py-8 min-w-[320px] flex flex-col justify-center">
  <h3 className="text-lg font-bold text-indigo-700 mb-5">

    Overall Score

  </h3>

  <div className="space-y-4">

    <div className="flex justify-between items-center">

      <span className="font-medium text-gray-700">

        MCQ

      </span>

      <span className="font-bold text-indigo-700">

        {result.mcqCorrect} / {result.mcqTotal}

      </span>

    </div>

    <div className="flex justify-between items-center">

      <span className="font-medium text-gray-700">

        Descriptive

      </span>

      <span className="font-bold text-indigo-700">

        {result.descriptiveScore != null
          ? `${result.descriptiveScore} / 10`
          : "—"}

      </span>

    </div>

    <div className="flex justify-between items-center">

      <span className="font-medium text-gray-700">

        Coding

      </span>

      <span className="font-bold text-indigo-700">

        {result.codingScore != null
          ? `${result.codingScore} / 10`
          : "—"}

      </span>

    </div>

  </div>

</div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">

                  Total Questions

                </p>

                <p className="text-2xl font-bold mt-1">

                  {result.totalQuestions}

                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">

                  Attempted

                </p>

                <p className="text-2xl font-bold mt-1">

                  {result.attempted}

                </p>

              </div>

            </div>

          </div>

          {/* AI FEEDBACK */}

          <div className="flex items-center gap-3 mb-5">

            <FaRobot className="text-indigo-600 text-2xl" />

            <div>

              <h2 className="text-2xl font-bold">

                AI Interview Evaluation

              </h2>

              <p className="text-gray-500">

                Review your answer evaluation for every question.

              </p>

            </div>

          </div>

          <div className="space-y-6">
            {result.answers.map((answer, index) => {

  const type =
    answer.questionType?.toUpperCase();

    const isMcq = type === "MCQ";

const status = (answer.correctness || "").toLowerCase().trim();

const isCorrect = status === "correct";

const isPartial = status.includes("partial");

const isIncorrect = !isCorrect && !isPartial;

const isCorrectMcq =
  isMcq &&
  answer.studentAnswer &&
  answer.correctAnswer &&
  answer.studentAnswer === answer.correctAnswer;

if (isCorrectMcq) {

  return null;

}

  return (

    <div
      key={answer.questionId}
      className="bg-white rounded-3xl shadow-sm border border-gray-200 p-7"
    >

      <div className="flex items-start justify-between gap-4 mb-5">

        <div>

          <p className="text-sm font-semibold text-indigo-600 mb-2">

            Question {index + 1}

          </p>

          <h3 className="text-lg font-semibold text-slate-900 whitespace-pre-wrap">

            {answer.question}

          </h3>

        </div>

        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${getBadgeColor(
            answer.correctness
          )}`}
        >

{isCorrect ? (
    <FaCheckCircle />
) : (
    <FaTimesCircle />
)}

          {answer.correctness}

        </div>

      </div>

      {/* STUDENT ANSWER */}

<div className="mb-5">

  <p className="font-semibold text-gray-700 mb-2">

    {isMcq ? "Your Answer" : "Student Answer"}

  </p>

  <div
    className={`rounded-2xl p-4 whitespace-pre-wrap ${
      type === "CODING"
        ? "bg-slate-950 text-gray-100 font-mono text-sm overflow-x-auto"
        : "bg-gray-50 text-gray-700"
    }`}
  >

    {renderStudentAnswer(answer)}

  </div>

</div>

{/* CORRECT ANSWER (MCQ ONLY) */}

{isMcq && (

<div className="mb-5">

  <p className="font-semibold text-green-700 mb-2">

    Correct Answer

  </p>

  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">

    <strong>{answer.correctAnswer}</strong>.{" "}

    {{
      A: answer.optionA,
      B: answer.optionB,
      C: answer.optionC,
      D: answer.optionD,
    }[answer.correctAnswer]}

  </div>

</div>

)}

      {/* SAMPLE INPUT */}

      {type === "CODING" &&
        answer.sampleInput && (

        <div className="mb-5">

          <p className="font-semibold text-gray-700 mb-2">

            Sample Input

          </p>

          <div className="bg-slate-900 text-gray-100 rounded-2xl p-4 font-mono text-sm whitespace-pre-wrap">

            {answer.sampleInput}

          </div>

        </div>

      )}

      {/* SAMPLE OUTPUT */}

      {type === "CODING" &&
        answer.sampleOutput && (

        <div className="mb-5">

          <p className="font-semibold text-gray-700 mb-2">

            Sample Output

          </p>

          <div className="bg-slate-900 text-gray-100 rounded-2xl p-4 font-mono text-sm whitespace-pre-wrap">

            {answer.sampleOutput}

          </div>

        </div>

      )}

      {/* AI SCORE */}

      {!isMcq && (

<div className="mb-5">

  <p className="font-semibold text-gray-700 mb-2">

    AI Score

  </p>

  <div className="bg-indigo-50 rounded-2xl p-4 text-indigo-700 font-bold text-xl">

    {answer.aiScore}/10

  </div>

</div>

)}

      {/* FEEDBACK */}

      {!isMcq && (

<div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">

        <div className="flex gap-3">

          <FaLightbulb className="text-amber-500 mt-1 flex-shrink-0" />

          <div>

            <p className="font-semibold text-gray-800">

              AI Feedback

            </p>

            <p className="text-gray-600 mt-1 whitespace-pre-wrap">

              {answer.feedback}

            </p>

          </div>

        </div>

      </div>
      )}

      {/* STRENGTHS */}

      {!isMcq && answer.strengths && (

        <div className="mb-5">

          <p className="font-semibold text-green-700 mb-2">

            Strengths

          </p>

          <div className="bg-green-50 rounded-2xl p-4 whitespace-pre-wrap">

            {answer.strengths}

          </div>

        </div>

      )}

      {/* IMPROVEMENTS */}

      {!isMcq && answer.improvements && (

        <div>

          <p className="font-semibold text-red-700 mb-2">

            Improvements

          </p>

          <div className="bg-red-50 rounded-2xl p-4 whitespace-pre-wrap">

            {answer.improvements}

          </div>

        </div>

      )}

    </div>

  );

})}
          </div>

          {/* IMPORTANT MESSAGE */}

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mt-7">

            <p className="text-blue-800 font-medium">

              This AI evaluation has been permanently saved.
              You can revisit this interview anytime from your
              Analytics page.

            </p>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-7">

            <button
              type="button"
              onClick={() =>
                navigate("/analytics", {
                  replace: true,
                })
              }
              className="border border-gray-300 bg-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-50"
            >
              View Analytics
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard", {
                  replace: true,
                })
              }
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <FaHome />

              Back to Dashboard

            </button>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default MockInterviewResult;