import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../utils/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadUser() {
    setLoading(true);
    const u = await getCurrentUser();
    setUser(u);

    if (!u) {
      localStorage.removeItem("role");
    }

    setLoading(false);
  }
  loadUser();
}, []);

  const login = (token, userData) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", userData.role);
  setUser(userData);
};


  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
