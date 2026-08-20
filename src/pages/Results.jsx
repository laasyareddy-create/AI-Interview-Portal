import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { getMyAttempts } from "../services/attemptService";

import {
  FaLayerGroup,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaQuoteLeft,
  FaRedo,
} from "react-icons/fa";

function Results() {
  const user =
  JSON.parse(localStorage.getItem("user")) || {};

const [history, setHistory] = useState([]);

const [latestStudentResult, setLatestStudentResult] =
  useState(null);

useEffect(() => {
  const loadResults = async () => {
    try {
      const data = await getMyAttempts();

      setHistory(data);

      if (data.length > 0) {
        setLatestStudentResult(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user.id) {
    loadResults();
  }
}, [user.id]);

  if (!latestStudentResult) {
    return (
      <MainLayout>
        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h1 className="text-3xl font-bold mb-4">
            No Assessment Attempts Yet
          </h1>

          <p className="text-gray-500 mb-6">
            Start an assessment to view your
            performance and history.
          </p>

          <Link
            to="/assessment"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Take Assessment
          </Link>

        </div>
      </MainLayout>
    );
  }

  let performance = "";
  let feedback = "";

  if (
    latestStudentResult.percentage >=
    80
  ) {
    performance =
      "Excellent Performance";

    feedback =
      "Strong understanding of concepts and good problem-solving ability. Focus on advanced questions to further improve interview readiness.";
  } else if (
    latestStudentResult.percentage >=
    50
  ) {
    performance =
      "Good Performance";

    feedback =
      "Good foundation and understanding of core concepts. Practice more assessments to improve consistency and accuracy.";
  } else {
    performance =
      "Needs Improvement";

    feedback =
      "Additional practice is recommended. Focus on strengthening fundamentals before moving to advanced topics.";
  }

  return (
  <MainLayout>
    <div
      className="min-h-screen -m-8 p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="max-w-5xl mx-auto">

        

        {/* Top Card */}

<div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6 text-center">

  <h1 className="text-4xl font-bold mb-4">
    Assessment Completed
  </h1>

  <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    {latestStudentResult.percentage}%
  </div>

  <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
    {feedback}
  </p>

</div>

        {/* Summary */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <h2 className="text-2xl font-bold mb-6">
            Assessment Summary
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <FaLayerGroup className="mx-auto text-blue-600 text-xl mb-3" />

              <p className="text-gray-500 text-sm">
                Category
              </p>

              <p className="font-bold capitalize">
                {latestStudentResult.category}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <FaChartBar className="mx-auto text-purple-600 text-xl mb-3" />

              <p className="text-gray-500 text-sm">
                Difficulty
              </p>

              <p className="font-bold capitalize">
                {latestStudentResult.difficulty}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4 text-center">

              <p className="text-2xl font-bold text-green-600 mb-2">
                {latestStudentResult.totalQuestions}
              </p>

              <p className="text-gray-600">
                Questions
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <FaCheckCircle className="mx-auto text-green-600 text-xl mb-3" />

              <p className="text-gray-500 text-sm">
                Correct
              </p>

              <p className="font-bold text-green-600">
                {latestStudentResult.correctAnswers}
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <FaTimesCircle className="mx-auto text-red-500 text-xl mb-3" />

              <p className="text-gray-500 text-sm">
                Wrong
              </p>

              <p className="font-bold text-red-500">
                {latestStudentResult.wrongAnswers}
              </p>
            </div>

          </div>

        </div>

        

        {/* Retake */}

        <div className="mb-6">

          <Link
            to="/assessment"
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            <FaRedo />
            Retake Assessment
          </Link>

        </div>


       {/* History */}

<div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

  <h2 className="text-2xl font-bold mb-6">
    Assessment History
  </h2>

  {history.length === 0 ? (
    <p>No attempts found</p>
  ) : (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-gray-50">

            <th className="text-left p-4">
              Category
            </th>

            <th className="text-left p-4">
              Difficulty
            </th>

            <th className="text-left p-4">
              Score
            </th>

            <th className="text-left p-4">
              Percentage
            </th>

          </tr>

        </thead>

        <tbody>

          {history
            .slice()
            .reverse()
            .map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-100"
              >

                <td className="p-4 capitalize font-medium">
                  {item.category}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      item.difficulty?.toLowerCase() === "easy"
                        ? "bg-blue-100 text-blue-600"
                        : item.difficulty?.toLowerCase() === "medium"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.difficulty}
                  </span>

                </td>

                <td className="p-4">
                  {item.score}/{item.totalQuestions}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      item.percentage >= 80
                        ? "bg-green-100 text-green-600"
                        : item.percentage >= 50
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.percentage}%
                  </span>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  )}

</div>

      </div>
    </div>
  </MainLayout>
);
}

export default Results;