import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
