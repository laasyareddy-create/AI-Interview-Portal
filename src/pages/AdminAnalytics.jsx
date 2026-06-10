import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

import {
  FaUsers,
  FaUserGraduate,
  FaUserTie,
  FaShieldAlt,
  FaClipboardList,
  FaChartLine,
  FaClock,
  FaStar,
} from "react-icons/fa";

function AdminAnalytics() {
  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const history =
    JSON.parse(
      localStorage.getItem(
        "assessmentHistory"
      )
    ) || [];

  const students =
    users.filter(
      (user) =>
        user.role === "student"
    );

  const trainers =
    users.filter(
      (user) =>
        user.role === "trainer"
    );

  const admins =
    users.filter(
      (user) =>
        user.role === "admin"
    );

  const totalAttempts =
    history.length;

  const averageScore =
    totalAttempts > 0
      ? Math.round(
          history.reduce(
            (sum, item) =>
              sum + item.percentage,
            0
          ) / totalAttempts
        )
      : 0;

  const highestScore =
    totalAttempts > 0
      ? Math.max(
          ...history.map(
            (item) =>
              item.percentage
          )
        )
      : 0;

  const lowestScore =
    totalAttempts > 0
      ? Math.min(
          ...history.map(
            (item) =>
              item.percentage
          )
        )
      : 0;

  const passedAttempts =
    history.filter(
      (item) =>
        item.percentage >= 50
    ).length;

  const passRate =
    totalAttempts > 0
      ? Math.round(
          (passedAttempts /
            totalAttempts) *
            100
        )
      : 0;

  const categoryCount = {};

  history.forEach((item) => {
    categoryCount[item.category] =
      (categoryCount[item.category] || 0) + 1;
  });

  const mostAttempted =
    Object.keys(categoryCount)
      .length > 0
      ? Object.keys(
          categoryCount
        ).reduce((a, b) =>
          categoryCount[a] >
          categoryCount[b]
            ? a
            : b
        )
      : "N/A";

  return (
  <MainLayout>
    <div
      className="min-h-screen -m-8 p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Admin Analytics
        </h1>

        <p className="text-gray-500 mb-8">
          Monitor platform statistics and assessment performance.
        </p>

        {/* Top Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-lg p-7 min-h-[190px] flex flex-col">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-5">
              <FaUsers className="text-blue-600 text-xl" />
            </div>

            <p className="text-gray-500 text-sm">
              Total Users
            </p>

            <h3 className="text-4xl font-bold text-slate-900 mt-2">
              {users.length}
            </h3>

            <p className="text-gray-400 text-sm mt-auto">
              Registered platform users
            </p>
          </div>

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-lg p-7 min-h-[190px] flex flex-col">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
              <FaUserGraduate className="text-indigo-600 text-xl" />
            </div>

            <p className="text-gray-500 text-sm">
              Students
            </p>

            <h3 className="text-4xl font-bold text-slate-900 mt-2">
              {students.length}
            </h3>

            <p className="text-gray-400 text-sm mt-auto">
              Active student accounts
            </p>
          </div>

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-lg p-7 min-h-[190px] flex flex-col">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
              <FaUserTie className="text-green-600 text-xl" />
            </div>

            <p className="text-gray-500 text-sm">
              Trainers
            </p>

            <h3 className="text-4xl font-bold text-slate-900 mt-2">
              {trainers.length}
            </h3>

            <p className="text-gray-400 text-sm mt-auto">
              Available trainers
            </p>
          </div>

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-lg p-7 min-h-[190px] flex flex-col">
            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-5">
              <FaShieldAlt className="text-purple-600 text-xl" />
            </div>

            <p className="text-gray-500 text-sm">
              Admins
            </p>

            <h3 className="text-4xl font-bold text-slate-900 mt-2">
              {admins.length}
            </h3>

            <p className="text-gray-400 text-sm mt-auto">
              Platform administrators
            </p>
          </div>

        </div>

        {/* Assessment Statistics */}

        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">

          <h2 className="text-2xl font-bold mb-6">
            Assessment Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-gray-50 rounded-[24px] p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FaClipboardList className="text-blue-600" />
              </div>

              <p className="text-gray-500 text-sm">
                Total Attempts
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {totalAttempts}
              </h3>
            </div>

            <div className="bg-gray-50 rounded-[24px] p-6">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <FaChartLine className="text-indigo-600" />
              </div>

              <p className="text-gray-500 text-sm">
                Average Score
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {averageScore}%
              </h3>
            </div>

            <div className="bg-gray-50 rounded-[24px] p-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">
                  ↑
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                Highest Score
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {highestScore}%
              </h3>
            </div>

            <div className="bg-gray-50 rounded-[24px] p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <span className="text-red-600 font-bold">
                  ↓
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                Lowest Score
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {lowestScore}%
              </h3>
            </div>

            <div className="bg-gray-50 rounded-[24px] p-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <FaClock className="text-orange-600" />
              </div>

              <p className="text-gray-500 text-sm">
                Pass Rate
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {passRate}%
              </h3>
            </div>

            <div className="bg-gray-50 rounded-[24px] p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <FaStar className="text-purple-600" />
              </div>

              <p className="text-gray-500 text-sm">
                Most Attempted Category
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-2 capitalize">
                {mostAttempted}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  </MainLayout>
);
}

export default AdminAnalytics;