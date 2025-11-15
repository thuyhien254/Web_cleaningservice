import "../Login/Loginpage.css";
import companyImage from "../../assets/company-banner.png";  

const Loginpage = () => {
  return (
   <div className="login-wrapper">

  {/* Left side – Company image */}
  <div className="login-left">
    <img src={companyImage} alt="Company" />
  </div>

  {/* Right side – Form */}
  <div className="login-right">
    <div className="login-box">
      <h2 className="login-title">Log in</h2>

      <div className="login-field">
        <label>User name</label>
        <input type="text" placeholder="Enter your user name" />
      </div>

      <div className="login-field">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>

      <div className="remember-row">
        <input type="checkbox" />
        <span>Remember me</span>
      </div>

      <button className="login-btn">Login</button>

      <p className="signup-text">
        Don’t have an account? <a href="/signup" className="signup-link">Sign up</a>
      </p>

      <a href="/" className="back-home">← Back to Happy Home</a>
    </div>
  </div>

</div>

  );
};

export default Loginpage;
