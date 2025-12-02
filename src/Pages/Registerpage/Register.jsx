import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Registerpage/Register.css";
import logonoword from "../../assets/logonoword.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setSuccess("");

    if (!formData.agree) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (!formData.full_name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://hello-node-render.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Sign up successful! Redirecting to login...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
            <h2>Create Account</h2>
            <p>Enter your details to register.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                placeholder="Nguyen Van A"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="090 123 4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye/> : <FaEyeSlash />}
                </span>
              </div>
            </div>


            <div className="checkbox-group full-width">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree">I agree to the terms and conditions</label>
            </div>

            {error && <p className="error full-width">{error}</p>}
            {success && <p className="success full-width">{success}</p>}

            <button className="primary-btn full-width" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up Now"}
            </button>

            <p className="bottom-text full-width">
              Already have an account? <Link to="/login">Log in</Link>
            </p>

            <p className="back-link full-width">
              <Link to="/">← Back to HappyHome</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
