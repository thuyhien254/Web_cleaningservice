export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch("http://localhost:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (response.ok) return data.data.user;

    return null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}
