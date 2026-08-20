import { NavLink } from "react-router-dom";

import {
  FaChartLine,
  FaClipboardCheck,
  FaUserGraduate,
  FaUserCog,
  FaCog,
  FaFileAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaRobot,
} from "react-icons/fa";

const Sidebar = () => {
  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-medium ${
    isActive
      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
      : "text-gray-700 hover:bg-gray-100"
  }`;

  return (
    <aside className="w-72 bg-white shadow-md h-screen overflow-y-auto">

      {/* Logo */}

      <div className="p-6">

  <NavLink
  to={
    user.role === "student"
      ? "/dashboard"
      : user.role === "trainer"
      ? "/student-results"
      : "/user-management"
  }
  className="block"
>

    <h1 className="text-2xl font-bold text-blue-600">
      AI Interview Portal
    </h1>

    <p className="text-sm text-gray-500 mt-1">

      Preparation & Assessment

    </p>

  </NavLink>

</div>

      {/* Navigation */}

      <nav className="flex flex-col h-[calc(100vh-120px)] px-4">

  {/* Main Navigation */}
  <div className="space-y-1">

    {user.role === "student" && (
      <>
        <NavLink to="/dashboard" className={navClass}>
          <FaChartLine />
          Dashboard
        </NavLink>

        <NavLink to="/mock-interview" className={navClass}>
          <FaRobot />
          Mock Interview
        </NavLink>

        <NavLink to="/assessment" className={navClass}>
          <FaClipboardCheck />
          Assessment
        </NavLink>

        <NavLink to="/results" className={navClass}>
          <FaFileAlt />
          Results
        </NavLink>

        <NavLink to="/analytics" className={navClass}>
          <FaChartLine />
          Analytics
        </NavLink>
      </>
    )}

    {user.role === "trainer" && (
      <>
        <NavLink
          to="/student-results"
          className={navClass}
        >
          <FaUserGraduate />
          Student Results
        </NavLink>

        <NavLink
          to="/performance-reports"
          className={navClass}
        >
          <FaChalkboardTeacher />
          Performance Reports
        </NavLink>
      </>
    )}

    {user.role === "admin" && (
      <>
        <NavLink
          to="/user-management"
          className={navClass}
        >
          <FaUsers />
          User Management
        </NavLink>

        <NavLink
          to="/assessment-management"
          className={navClass}
        >
          <FaClipboardCheck />
          Assessment Management
        </NavLink>

        <NavLink
  to="/mock-interview-management"
  className={navClass}
>
  <FaRobot />
  Mock Interview Management
</NavLink>

        <NavLink
          to="/admin-analytics"
          className={navClass}
        >
          <FaChartLine />
          Admin Analytics
        </NavLink>
      </>
    )}
  </div>

  {/* Profile & Settings */}
  <div className="border-t border-gray-200 mt-2 pt-2 space-y-1">

  <NavLink
    to="/profile"
    className={navClass}
  >
    <FaUserCog />
    Profile
  </NavLink>

  <NavLink
    to="/settings"
    className={navClass}
  >
    <FaCog />
    Settings
  </NavLink>

</div>

</nav>

    </aside>
  );
};

export default Sidebar;