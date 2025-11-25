import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Loginpage.css";
import logonoword from "../../assets/logonoword.png";

const Loginpage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // 👉 KIỂM TRA ROLE ĐỂ ĐIỀU HƯỚNG
      if (data.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
  }
};


  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="brand-section">
          <div className="logo-wrapper">
            <img src={logonoword} className="logo-img" alt="logo" />
          </div>
          <h1>HappyHome</h1>
          <p>Dịch vụ vệ sinh & chăm sóc nhà cửa hàng đầu.</p>
        </div>

        <div className="form-section">
          <div className="form-header">
            <h2>Login</h2>
            <p>Welcome back! Please login to your account.</p>
          </div>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="primary-btn">
              Login
            </button>

            <p className="bottom-text">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

            <p className="bottom-text">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>

            <p className="back-link">
              <Link to="/">← Back to HappyHome</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Loginpage;
