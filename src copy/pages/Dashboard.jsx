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

import {
  recentActivities,
  upcomingInterviews,
} from "../mock/dashboardData";

function Dashboard() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};
  return (
    <MainLayout>
      <div>

        {/* Welcome Section */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-3xl font-bold">
            Welcome Back, {user.name} 👋
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
      3
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
      8
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
      85%
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
      12 Days
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
        Today's Goal
      </h2>

      <ul className="space-y-2">

        <li>
          ✅ Complete 1 React Assessment
        </li>

        <li>
          ⏳ Attend Mock Interview
        </li>

        <li>
          ⏳ Practice JavaScript Questions
        </li>

      </ul>

    </div>

  </div>

</div>



        {/* Activities + Interviews */}



<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
  <FaHistory className="text-purple-600 text-sm" />
</div>
      Recent Activities
    </h2>

    <div className="space-y-5">

      {recentActivities.map((item) => (
        <div
          key={item.id}
          className="flex gap-4"
        >

          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="w-px h-12 bg-gray-200"></div>
          </div>

          <div className="flex-1 border-b pb-4">
            <p className="font-medium">
              {item.activity}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {item.date}
            </p>
          </div>

        </div>
      ))}

    </div>

  </div>

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
  <FaCalendarAlt className="text-blue-600 text-sm" />
</div>
      Upcoming Interviews
    </h2>

    <div className="space-y-5">

      {upcomingInterviews.map((item) => (
        <div
          key={item.id}
          className="border-b pb-4 last:border-b-0"
        >
          <p className="font-medium">
            {item.title}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {item.date}
          </p>
        </div>
      ))}

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

    <div>
      <div className="flex justify-between mb-2">
        <span>React Practice</span>
        <span>80%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: "80%" }}
        />
      </div>
    </div>

    <div>
      <div className="flex justify-between mb-2">
        <span>JavaScript</span>
        <span>65%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-600 h-3 rounded-full"
          style={{ width: "65%" }}
        />
      </div>
    </div>

    <div>
      <div className="flex justify-between mb-2">
        <span>Aptitude</span>
        <span>50%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-purple-600 h-3 rounded-full"
          style={{ width: "50%" }}
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

    <div className="border border-gray-200 rounded-xl px-5 py-3 bg-white shadow-sm">
      ⚡ React Hooks
    </div>

    <div className="border border-gray-200 rounded-xl px-5 py-3 bg-white shadow-sm">
      ⚡ JavaScript Closures
    </div>

    <div className="border border-gray-200 rounded-xl px-5 py-3 bg-white shadow-sm">
      ⚡ Data Structures
    </div>

    <div className="border border-gray-200 rounded-xl px-5 py-3 bg-white shadow-sm">
      ⚡ Communication Skills
    </div>

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

                <tr className="border-b">

                  <td className="p-3">
                    React Assessment
                  </td>

                  <td className="p-3">
                    90%
                  </td>

                  <td className="p-3">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
    Passed
  </span>
</td>

                </tr>

                <tr className="border-b">

                  <td className="p-3">
                    JavaScript Assessment
                  </td>

                  <td className="p-3">
                    82%
                  </td>

                  <td className="p-3">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
    Passed
  </span>
</td>

                </tr>

                <tr>

                  <td className="p-3">
                    Aptitude Test
                  </td>

                  <td className="p-3">
                    76%
                  </td>

                  <td className="p-3">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
    Passed
  </span>
</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;