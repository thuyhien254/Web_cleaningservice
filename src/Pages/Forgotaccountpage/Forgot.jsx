import { useState } from "react";
import { Link } from "react-router-dom";
import "../Forgotaccountpage/Forgot.css";
import logonoword from "../../assets/logonoword.png";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "If your email exists, a reset link has been sent!");
        setFormData({ email: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="left-sections">
        <div className="logo-wrapper">
          <img src={logonoword} alt="logo" className="logo-img" />
          <h1 className="brands">HappyHome</h1>
        </div>
      </div>

      <div className="right-section">
        <div className="forgot-box">
          <h2>Forgot Password</h2>
          <p className="info-text">Enter your email address to reset your password.</p>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="back-login">
            Remembered your password? <Link to="/login">Log in</Link>
          </p>

          <Link className="back-home" to="/">← Back to HappyHome</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
