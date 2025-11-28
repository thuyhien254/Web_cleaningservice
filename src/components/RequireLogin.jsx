import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireLogin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // 🚫 Nếu chưa login → đẩy về login
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ❗🚫 Chặn ADMIN truy cập các trang USER
  if (user.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
