import "../Contact/Contact.css";
import ContactImage from "../../assets/company-banner.png";

import { FiMapPin, FiPhoneCall, FiMail, FiClock } from "react-icons/fi";

export default function Contact() {
  return (
    <div className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Your trusted home cleaning partner in Ho Chi Minh City.</p>
      </div>

      <div className="contact-content">

        {/* LEFT INFO BOX */}
        <div className="contact-info-box">
          <h2>Get in Touch</h2>
          <p className="info-sub">
            We’re here to support you. Reach out anytime.
          </p>

        <div className="info-item">
        <FiMapPin size={16} className="info-icon" />
        <div>
            <h3>Address</h3>
            <p>123 Lê Thánh Tôn, Phường Bến Thành, Quận 1, Hồ Chí Minh</p>
        </div>
        </div>

        <div className="info-item">
        <FiPhoneCall size={16} className="info-icon" />
        <div>
            <h3>Hotline</h3>
            <p>123456</p>
        </div>
        </div>

        <div className="info-item">
        <FiMail size={16} className="info-icon" />
        <div>
            <h3>Email</h3>
            <p>support@happyhome.vn</p>
        </div>
        </div>

        <div className="info-item">
        <FiClock size={16} className="info-icon" />
        <div>
            <h3>Working Hours</h3>
            <p>Mon – Sun: 7:00 AM – 7:00 PM</p>
        </div>
        </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="contact-image">
          <img src={ContactImage} alt="HappyHome Contact" />
        </div>

      </div>
    </div>
  );
}