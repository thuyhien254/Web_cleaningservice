import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();

  // ⭐ 1. Khi đang loading, luôn block giao diện – KHÔNG CHO CHECK user
  if (loading) {
    return <div>Loading...</div>;
  }

  // ⭐ 2. Nếu hết loading mà vẫn chưa có user → token sai → trả login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⭐ 3. Nếu user tồn tại nhưng role không phải admin → đẩy về trang chủ
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
