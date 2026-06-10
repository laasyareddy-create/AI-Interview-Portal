import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({
  children,
  allowedRoles,
}) {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
  if (user.role === "admin") {
    return (
      <Navigate
        to="/user-management"
        replace
      />
    );
  }

  if (user.role === "trainer") {
    return (
      <Navigate
        to="/student-results"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/dashboard"
      replace
    />
  );
}
  return children;
}

export default RoleProtectedRoute;