import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useUserStore } from "./../store/store";

// function ProtectedRoute({ children, role = "student", redirectTo }) {
//   const user = useUserStore((state) => state.user);x`

//   return user && (user.role === role || user.role === "instructor") ? (
//     children
//   ) : (
//     <Navigate to={redirectTo} />
//   );
// }

const ProtectedRoute = ({ children, role, isLoggedIn, redirectTo = '/login' }) => {
  const userRole = 'student'

  if (!isLoggedIn || userRole !== role) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default ProtectedRoute;
