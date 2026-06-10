import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import PerformanceChart from "../components/PerformanceChart";
import loginBg from "../assets/login-bg.png";
import { FaChartLine } from "react-icons/fa";

function Analytics() {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    const user =
      JSON.parse(
        localStorage.getItem("user")
      ) || {};

    const assessmentHistory =
      JSON.parse(
        localStorage.getItem(
          "assessmentHistory"
        )
      ) || [];

    const mockInterviewHistory =
      JSON.parse(
        localStorage.getItem(
          "mockInterviewHistory"
        )
      ) || [];

    const studentAssessments =
      assessmentHistory.filter(
        (item) =>
          item.studentId === user.id
      );

    const studentMocks =
      mockInterviewHistory.filter(
        (item) =>
          item.studentId === user.id
      );

    const highestScore =
      studentAssessments.length
        ? Math.max(
            ...studentAssessments.map(
              (item) =>
                item.percentage
            )
          )
        : 0;

    const averageScore =
      studentAssessments.length
        ? Math.round(
            studentAssessments.reduce(
              (sum, item) =>
                sum +
                item.percentage,
              0
            ) /
              studentAssessments.length
          )
        : 0;

    const scoreTrend =
      studentAssessments.map(
        (item, index) => ({
          week: `Attempt ${
            index + 1
          }`,
          score:
            item.percentage,
        })
      );

    const categoryMap = {};

    studentAssessments.forEach(
      (item) => {
        if (
          !categoryMap[
            item.category
          ]
        ) {
          categoryMap[
            item.category
          ] = [];
        }

        categoryMap[
          item.category
        ].push(
          item.percentage
        );
      }
    );

    const skills =
      Object.keys(
        categoryMap
      ).map((category) => ({
        category,
        score: Math.round(
          categoryMap[
            category
          ].reduce(
            (a, b) => a + b,
            0
          ) /
            categoryMap[
              category
            ].length
        ),
      }));

    const technicalCategories =
      [
        "react",
        "javascript",
        "node",
        "aptitude",
      ];

    const technicalResults =
      studentMocks.filter(
        (item) =>
          technicalCategories.includes(
            item.category
          )
      );

    const technicalScore =
      technicalResults.length
        ? Math.round(
            technicalResults.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.percentage,
              0
            ) /
              technicalResults.length
          )
        : 0;

    const hrResults =
      studentMocks.filter(
        (item) =>
          item.category ===
          "hr"
      );

    const hrScore =
      hrResults.length
        ? Math.round(
            hrResults.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.percentage,
              0
            ) /
              hrResults.length
          )
        : 0;

    const communicationResults =
      studentMocks.filter(
        (item) =>
          item.category ===
          "communication"
      );

    const communicationScore =
      communicationResults.length
        ? Math.round(
            communicationResults.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.percentage,
              0
            ) /
              communicationResults.length
          )
        : 0;

        const mockCategoryMap = {};

studentMocks.forEach((item) => {
  if (!mockCategoryMap[item.category]) {
    mockCategoryMap[item.category] = [];
  }

  mockCategoryMap[item.category].push(
    item.percentage
  );
});

const mockCategoryAnalytics =
  Object.keys(mockCategoryMap).map(
    (category) => ({
      category,

      attempts:
        mockCategoryMap[category]
          .length,

      bestScore: Math.max(
        ...mockCategoryMap[category]
      ),

      avgScore: Math.round(
        mockCategoryMap[
          category
        ].reduce(
          (a, b) => a + b,
          0
        ) /
          mockCategoryMap[
            category
          ].length
      ),
    })
  );

    setAnalytics({
      highestScore,
      averageScore,
      assessments:
        studentAssessments.length,
      mockInterviews:
        studentMocks.length,
      scoreTrend,
      skills,
      technicalScore,
      hrScore,
      communicationScore,
      mockCategoryAnalytics,
    });
  }, []);

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