import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaChartLine,
  FaFire,
  FaBullseye,
  FaHistory,
  FaLightbulb,
  FaClipboardList,
} from "react-icons/fa";

import { getDashboard } from "../services/DashboardService";
import loginBg from "../assets/login-bg.png";

function Dashboard() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadDashboard();
}, []);

if (!dashboard) {
  return (
    <MainLayout>
      <div className="p-8">Loading...</div>
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

        {/* Welcome Section */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-3xl font-bold">
            Welcome Back, {dashboard.welcomeName} 👋
          </h2>

          <p className="text-gray-600 mt-3">
            Track your interview preparation,
            monitor assessment progress, and stay
            ready for upcoming opportunities.
          </p>

        </div>

        {/* Progress Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-white rounded-2xl shadow p-6">
    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
      <FaCalendarAlt className="text-purple-600" />
    </div>

    <h3 className="text-gray-600">
      Upcoming Interviews
    </h3>

    <p className="text-5xl font-bold mt-4">
      {dashboard.upcomingInterviews}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
      <FaClipboardCheck className="text-green-600" />
    </div>

    <h3 className="text-gray-600">
      Completed Assessments
    </h3>

    <p className="text-5xl font-bold mt-4">
      {dashboard.completedAssessments}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
      <FaChartLine className="text-blue-600" />
    </div>

    <h3 className="text-gray-600">
      Overall Score
    </h3>

    <p className="text-5xl font-bold mt-4">
      {dashboard.overallScore}%
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
      <FaFire className="text-orange-500" />
    </div>

    <h3 className="text-gray-600">
      Practice Streak
    </h3>

    <p className="text-5xl font-bold mt-4">
      {dashboard.practiceStreakDays} Days
    </p>
  </div>

</div>

                {/* Today's Goal */}

        <div className="bg-white rounded-2xl shadow p-6 mt-8">

          <div className="flex gap-5">

            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <FaBullseye className="text-purple-600 text-2xl" />
            </div>

            <div>

              <h2 className="text-xl font-bold mb-4">
                Today's Progress
              </h2>

              <ul className="space-y-2">

  <li>
    {dashboard.assessmentToday
      ? "✅ Assessment completed today"
      : "⏳ No assessment completed today"}
  </li>

  <li>
    {dashboard.mockInterviewToday
      ? "✅ Mock interview completed today"
      : "⏳ No mock interview completed today"}
  </li>

  <li>
    {dashboard.assessmentToday || dashboard.mockInterviewToday
      ? "🔥 Practice activity recorded today"
      : "⏳ No activity recorded today"}
  </li>

</ul>

            </div>

          </div>

        </div>


          {/* Recent Activities + Mock Interviews */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* Recent Assessment Attempts */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <FaHistory className="text-purple-600 text-sm" />
              </div>
              Recent Assessment Attempts
            </h2>

            <div className="space-y-5">

              {dashboard.recentAttempts?.length > 0 ? (
                dashboard.recentAttempts.map((item) => (
                  <div
                    key={item.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <p className="font-medium">
                      {item.category} Assessment
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Score: {item.percentage}%
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No assessment attempts yet.
                </p>
              )}

            </div>

          </div>

          {/* Recent Mock Interviews */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FaCalendarAlt className="text-blue-600 text-sm" />
              </div>
              Recent Mock Interviews
            </h2>

            <div className="space-y-5">

              {dashboard.recentMockInterviews?.length > 0 ? (
                dashboard.recentMockInterviews.map((item) => (
                  <div
                    key={item.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <p className="font-medium">
                      {item.category} Mock Interview
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Score: {item.percentage}%
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No mock interviews completed yet.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Daily Preparation Tracker */}

<div className="bg-white rounded-2xl shadow p-6 mt-8">

  <div className="flex items-center gap-3 mb-6">

    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
      <FaBullseye className="text-purple-600" />
    </div>

    <h2 className="text-xl font-bold">
      Daily Preparation Tracker
    </h2>

  </div>

  <div className="space-y-6">

    {/* Assessment */}

    <div>

      <div className="flex justify-between mb-2">
        <span>Assessment Practice</span>

        <span>
          {dashboard.assessmentToday ? "100%" : "0%"}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{
            width: dashboard.assessmentToday ? "100%" : "0%",
          }}
        />

      </div>

    </div>

    {/* Mock Interview */}

    <div>

      <div className="flex justify-between mb-2">
        <span>Mock Interview Practice</span>

        <span>
          {dashboard.mockInterviewToday ? "100%" : "0%"}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-green-600 h-3 rounded-full"
          style={{
            width: dashboard.mockInterviewToday ? "100%" : "0%",
          }}
        />

      </div>

    </div>

    {/* Overall Daily Activity */}

    <div>

      <div className="flex justify-between mb-2">
        <span>Today's Overall Practice</span>

        <span>
          {dashboard.assessmentToday && dashboard.mockInterviewToday
            ? "100%"
            : dashboard.assessmentToday || dashboard.mockInterviewToday
            ? "50%"
            : "0%"}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-purple-600 h-3 rounded-full"
          style={{
            width:
              dashboard.assessmentToday && dashboard.mockInterviewToday
                ? "100%"
                : dashboard.assessmentToday || dashboard.mockInterviewToday
                ? "50%"
                : "0%",
          }}
        />

      </div>

    </div>

  </div>

</div>

        {/* Recommended Practice Areas */}

<div className="bg-white rounded-xl shadow p-6 mt-8">

  <div className="flex items-center gap-3 mb-5">

    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
      <FaLightbulb className="text-yellow-600" />
    </div>

    <h2 className="text-xl font-bold">
      Recommended Practice Areas
    </h2>

  </div>

  <div className="flex flex-wrap gap-4">

    {dashboard.recommendedPracticeAreas?.map(
      (area, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl px-5 py-3 bg-white shadow-sm"
        >
          ⚡ {area}
        </div>
      )
    )}

  </div>

</div>
                {/* Assessment Summary */}

        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <FaClipboardList className="text-purple-600" />
            </div>

            <h2 className="text-xl font-bold">
              Assessment Summary
            </h2>

          </div>

          <div className="overflow-x-auto">

            {dashboard.recentAttempts?.length > 0 ? (

              <table className="w-full">

                <thead>

                  <tr className="bg-purple-50">

                    <th className="p-3 text-left">
                      Assessment
                    </th>

                    <th className="p-3 text-left">
                      Score
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard.recentAttempts.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {item.category} Assessment
                      </td>

                      <td className="p-3">
                        {item.percentage}%
                      </td>

                      <td className="p-3">

                        <span
                          className={
                            item.percentage >= 50
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium"
                              : "bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium"
                          }
                        >
                          {item.percentage >= 50
                            ? "Passed"
                            : "Needs Improvement"}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            ) : (

              <p className="text-gray-500">
                No assessment attempts yet.
              </p>

            )}

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;