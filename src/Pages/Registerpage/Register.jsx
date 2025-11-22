import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Registerpage/Register.css";
import logonoword from "../../assets/logonoword.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  
  // Chỉ giữ lại 4 trường theo yêu cầu + checkbox
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

    // Validation cơ bản
    if (!formData.agree) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Sign up successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-pages">
      <div className="signup-container">
        
        {/* Bên trái: Brand */}
        <div className="brand-section">
          <div className="logo-wrapper">
            <img src={logonoword} className="logo-img" alt="logo" />
          </div>
          <h1>HappyHome</h1>
          <p>Dịch vụ vệ sinh & Chăm sóc nhà cửa hàng đầu.</p>
        </div>

        {/* Bên phải: Form */}
        <div className="form-section">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Enter your details to register.</p>
          </div>

          <form className="signup-form-grid" onSubmit={handleSubmit}>
            
            {/* Hàng 1: Name & Phone nằm cạnh nhau */}
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Nguyen Van A"
                value={formData.name}
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

            {/* Hàng 2: Email (Full width) */}
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

            {/* Hàng 3: Password (Full width) */}
            <div className="input-group full-width">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Checkbox */}
            <div className="full-width checkbox-group">
              <input
                type="checkbox"
                name="agree"
                id="agree-terms"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree-terms">I agree to the terms and conditions</label>
            </div>

            {error && <p className="error full-width">{error}</p>}
            {success && <p className="success full-width">{success}</p>}

            <button className="signup-btn full-width" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up Now"}
            </button>

            <div className="login-link full-width">
               Already have an account? <Link to="/login">Log in</Link>
            </div>

            <div className="back-link full-width">
              <Link to="/">← Back to HappyHome</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;