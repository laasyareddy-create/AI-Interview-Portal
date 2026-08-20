import { useEffect, useState } from "react";
import { getAnalytics } from "../services/AnalyticsService";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import PerformanceChart from "../components/PerformanceChart";
import loginBg from "../assets/login-bg.png";
import { FaChartLine } from "react-icons/fa";

function Analytics() {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

  loadAnalytics();

}, []);

const loadAnalytics = async () => {

  try {

    const response = await getAnalytics();

    setAnalytics(response.data);

  } catch (error) {

    console.error(error);

  }

};

  if (!analytics) {
    return (
      <MainLayout>
        <div className="p-8">
          Loading...
        </div>
      </MainLayout>
    );
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

      {/* Header */}

      <h1 className="text-4xl font-bold mb-2">
        Analytics
      </h1>

      <p className="text-gray-600 mb-8">
        Track performance trends, skill progress, mock interview results, and completion statistics.
      </p>

      {/* Top Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <DashboardCard
          title="Highest Score"
          value={`${analytics.highestScore}%`}
        />

        <DashboardCard
          title="Average Score"
          value={`${analytics.averageScore}%`}
        />

        <DashboardCard
          title="Assessments"
          value={analytics.assessments}
        />

        <DashboardCard
          title="Mock Interviews"
          value={analytics.mockInterviews}
        />

      </div>

      {/* Chart */}

      <div className="mt-6">
        <PerformanceChart
          data={analytics.scoreTrend}
        />
      </div>

      {/* Skill Performance */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5">
          Skill-wise Performance
        </h2>

        <div className="space-y-5">

          {analytics.skills.map(
            (skill, index) => (
              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="capitalize font-medium">
                    {skill.category}
                  </span>

                  <span className="font-medium">
                    {skill.score}%
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${skill.score}%`,
                    }}
                  />

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* Mock Interview Table */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5">
          Mock Interview Performance
        </h2>

        {analytics.mockCategoryAnalytics?.length === 0 ? (
          <p className="text-gray-500">
            No mock interviews completed yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">

            <table className="w-full">

              <thead>

                <tr className="bg-gray-50 border-b">

                  <th className="text-left py-4 px-4">
                    Category
                  </th>

                  <th className="text-center py-4">
                    Attempts
                  </th>

                  <th className="text-center py-4">
                    Best Score
                  </th>

                  <th className="text-center py-4">
                    Average Score
                  </th>

                </tr>

              </thead>

              <tbody>

                {analytics.mockCategoryAnalytics.map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-4 px-4 capitalize font-medium">
                        {item.category}
                      </td>

                      <td className="text-center">
                        {item.attempts}
                      </td>

                      <td className="text-center text-green-600 font-semibold">
                        {item.bestScore}%
                      </td>

                      <td className="text-center text-blue-600 font-semibold">
                        {item.avgScore}%
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

            {/* AI Performance Summary */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5">
          🤖 AI Performance Summary
        </h2>

        <div className="space-y-6">

          <div>

            <h3 className="font-semibold text-lg mb-2">
              Overall Feedback
            </h3>

            <p className="text-gray-700 leading-7">
              {analytics.overallFeedback}
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-lg mb-3 text-green-700">
              ✅ Top Strengths
            </h3>

            <ul className="list-disc pl-6 space-y-2">

              {analytics.strengths?.map((strength, index) => (

                <li key={index}>
                  {strength}
                </li>

              ))}

            </ul>

          </div>

          <div>

            <h3 className="font-semibold text-lg mb-3 text-orange-600">
              📈 Areas to Improve
            </h3>

            <ul className="list-disc pl-6 space-y-2">

              {analytics.improvements?.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

          </div>

        </div>

      </div>

      {/* Topic Improvement */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5">
          Topic-wise Improvement
        </h2>

        <div className="space-y-3">

          {analytics.skills.map(
            (skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded-xl px-4 py-3"
              >

                <div className="flex items-center gap-3">

  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
    <FaChartLine className="text-purple-600 text-xs" />
  </div>

  <span className="capitalize">
    {skill.category} average score
  </span>

</div>

                <span className="font-semibold text-blue-600">
                  {skill.score}%
                </span>

              </div>
            )
          )}

        </div>

      </div>

      {/* Completion Stats */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5">
          Completion Statistics
        </h2>

        <div className="grid grid-cols-3 divide-x">

          <div className="text-center">

            <p className="text-3xl font-bold">
              {analytics.assessments}
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Assessments Completed
            </p>

          </div>

          <div className="text-center">

            <p className="text-3xl font-bold">
              {analytics.mockInterviews}
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Mock Interviews
            </p>

          </div>

          <div className="text-center">

            <p className="text-3xl font-bold">
              {analytics.averageScore}%
            </p>

            <p className="text-gray-500 mt-2 text-sm">
              Average Score
            </p>

          </div>

        </div>

      </div>

    </div>
    </div>
  </MainLayout>
);
}

export default Analytics;