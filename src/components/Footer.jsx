import "./Footer.css";
import logoImg from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* --- Company Info --- */}
        <div className="footer-col company">
          <div className="footer-logo">
            <img src={logoImg} alt="HappyHome Logo" />
            <span className="brand-name">HappyHome</span>
          </div>
          <p className="footer-desc">
            Our cleaning service company is dedicated to providing
            high-quality cleaning services to our customers. We offer a range
            of services, from residential to commercial cleaning, all at an
            affordable price.
          </p>
          <p className="footer-contact">
            123 Lê Thánh Tôn, Phường Bến Thành, Hồ Chí Minh <br />
            Hotline: <strong>123456</strong>
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div className="footer-col">
          <h4>Quick links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* --- Opening Hours --- */}
        <div className="footer-col">
          <h4>Opening Hours</h4>
          <p>Monday - Friday</p>
          <p>9am - 8pm</p>
          <p>Sat-Sun: <span className="closed">CLOSED</span></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HappyHome. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
