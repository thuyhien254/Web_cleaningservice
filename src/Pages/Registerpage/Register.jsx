import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Registerpage/Register.css";
import logonoword from "../../assets/logonoword.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    personalId: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
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

    if (!formData.agree) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (!formData.name || !formData.username || !formData.password) {
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

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      await response.json();
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
      <div className="left-sections">
        <div className="logo-wrappers">
          <img src={logonoword} className="logo-imgs" alt="logo" />
          <h1 className="brands">HappyHome</h1>
        </div>
      </div>

      <div className="right-sections">
        <form className="signup-boxs" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          
          <div className="input-groups">
            <label>Customer Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Personal ID</label>
            <input
              type="text"
              name="personalId"
              placeholder="Enter your personal ID"
              value={formData.personalId}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-groups">
            <label>Home Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your home address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="remember-rows">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>I agree to the terms and conditions</span>
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button className="signup-btns" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <Link className="back-home" to="/">
            ← Back to HappyHome
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
