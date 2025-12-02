export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch("https://hello-node-render.onrender.com/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Nếu token hết hạn hoặc không hợp lệ → BE sẽ trả 401
    if (response.status === 401 || response.status === 403) {
      clearAuthStorage();
      return null;
    }

    const data = await response.json();

    // Nếu có user thì trả về
   if (data?.data?.user) {
  const user = data.data.user;
  return user;
}
    return null;

  } catch (error) {
    return null;
  }
}

export function logoutUser() {
  clearAuthStorage();
}

function clearAuthStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

}
