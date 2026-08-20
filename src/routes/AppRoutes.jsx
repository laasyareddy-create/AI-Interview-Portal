import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const ForgotPasswordOtp = lazy(() => import("../pages/ForgotPasswordOtp"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MockInterview = lazy(() => import("../pages/MockInterview"));
const Assessment = lazy(() => import("../pages/Assessment"));
const AssessmentManagement = lazy(() => import("../pages/AssessmentManagement"));
const AssessmentList = lazy(() => import("../pages/AssessmentList"));
const Results = lazy(() => import("../pages/Results"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Profile = lazy(() => import("../pages/Profile"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const Settings = lazy(() => import("../pages/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const AssessmentExam = lazy(() => import("../pages/AssessmentExam"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const AdminAnalytics = lazy(() => import("../pages/AdminAnalytics"));
const CreateAssessment = lazy(() => import("../pages/CreateAssessment"));
const ManageQuestions = lazy(() => import("../pages/ManageQuestions"));
const StudentResults = lazy(() => import("../pages/StudentResults"));
const PerformanceReports = lazy(() => import("../pages/PerformanceReports"));
const MockInterviewManagement = lazy(() => import("../pages/MockInterviewManagement"));
const CreateMockInterview = lazy(() => import("../pages/CreateMockInterview"));
const ManageMockInterviewQuestions = lazy(() => import("../pages/ManageMockInterviewQuestions"));
const MockInterviewExam = lazy(() => import("../pages/MockInterviewExam"));
const MockInterviewResult = lazy(() => import("../pages/MockInterviewResult"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/verify-otp"
            element={<VerifyOtp />}
          />

          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/mock-interview"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <MockInterview />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/mock-interview-exam/:interviewId"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <MockInterviewExam />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/mock-interview-result/:interviewId"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <MockInterviewResult />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/assessment"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <Assessment />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/assessment-list"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <AssessmentList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/assessment-exam/:assessmentId"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <AssessmentExam />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <Results />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
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
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/admin-analytics"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminAnalytics />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/assessment-management"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AssessmentManagement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/create-assessment"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CreateAssessment />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/assessment-management/:assessmentId/questions"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <ManageQuestions />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/assessment-management/edit/:assessmentId"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CreateAssessment />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/student-results"
            element={
              <RoleProtectedRoute allowedRoles={["trainer"]}>
                <StudentResults />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/performance-reports"
            element={
              <RoleProtectedRoute allowedRoles={["trainer"]}>
                <PerformanceReports />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/mock-interview-management"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <MockInterviewManagement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/create-mock-interview"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CreateMockInterview />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/mock-interview-management/:interviewId/questions"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <ManageMockInterviewQuestions />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/forgot-password-otp"
            element={<ForgotPasswordOtp />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;