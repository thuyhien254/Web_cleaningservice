import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Loginpage.css";
import logonoword from "../../assets/logonoword.png";

const Loginpage = () => {
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Container chính tạo hiệu ứng khung Card bo tròn */}
      <div className="login-container">
        
        {/* Phần bên trái: Thương hiệu (Màu xanh) */}
        <div className="brand-section">
          <div className="logo-wrapper">
            <img src={logonoword} className="logo-img" alt="logo" />
          </div>
          <h1>HappyHome</h1>
          <p>Dịch vụ vệ sinh & Chăm sóc nhà cửa hàng đầu.</p>
        </div>

        {/* Phần bên phải: Form đăng nhập (Màu trắng) */}
        <div className="form-section">
          <div className="form-header">
            <h2>Login</h2>
            <p>Welcome back! Please login to your account.</p>
          </div>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>User name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your user name"
                value={formData.username}
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

            <div className="remember-row">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="login-link">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <div className="login-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
            
            <div className="back-link">
               <Link to="/">← Back to HappyHome</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;