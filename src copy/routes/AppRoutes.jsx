import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MockInterview from "../pages/MockInterview";
import Assessment from "../pages/Assessment";
import Results from "../pages/Results";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import AssessmentExam from "../pages/AssessmentExam";
import UserManagement from "../pages/UserManagement";
import AdminAnalytics from "../pages/AdminAnalytics";
import AssessmentManagement from "../pages/AssessmentManagement";
import StudentResults from "../pages/StudentResults";
import PerformanceReports from "../pages/PerformanceReports";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
  path="/dashboard"
  element={
    <RoleProtectedRoute
      allowedRoles={["student"]}
    >
      <Dashboard />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/mock-interview"
  element={
    <RoleProtectedRoute
      allowedRoles={["student"]}
    >
      <MockInterview />
    </RoleProtectedRoute>
  }
/>

        <Route
  path="/assessment"
  element={
    <RoleProtectedRoute
      allowedRoles={["student"]}
    >
      <Assessment />
    </RoleProtectedRoute>
  }
/>

        <Route
  path="/assessment-exam"
  element={
    <RoleProtectedRoute
      allowedRoles={["student"]}
    >
      <AssessmentExam />
    </RoleProtectedRoute>
  }
/>

        <Route
  path="/results"
  element={
    <RoleProtectedRoute
      allowedRoles={["student"]}
    >
      <Results />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <RoleProtectedRoute
      allowedRoles={["student"]}
    >
      <Analytics />
    </RoleProtectedRoute>
  }
/>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <RoleProtectedRoute
              allowedRoles={[
              "student",
              "trainer",
              "admin",
           ]}
            >
              <Settings />
            </RoleProtectedRoute>
          }
        />

        <Route
  path="/user-management"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin",
      ]}
    >
      <UserManagement />
    </RoleProtectedRoute>
  }
/>

  <Route
  path="/admin-analytics"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin",
      ]}
    >
      <AdminAnalytics />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/assessment-management"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin",
      ]}
    >
      <AssessmentManagement />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/student-results"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "trainer",
      ]}
    >
      <StudentResults />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/performance-reports"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "trainer",
      ]}
    >
      <PerformanceReports />
    </RoleProtectedRoute>
  }
/>

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;