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
      <div className="left-sections">
        <div className="logo-wrapper">
          <img src={logonoword} className="logo-img" alt="logo" />
          <h1 className="brands">HappyHome</h1>
        </div>
      </div>

      <div className="right-section">
        <div className="login-box">
          <h2>Login</h2>

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
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <Link className="link" to="/forgot-password">
            Forgot account?
          </Link>

          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <Link className="back-home" to="/">
            ← Back to HappyHome
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
