import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logoImg} alt="HappyHome Logo" />
        <span className="brand-name">HappyHome</span>
      </div>

      <ul className="nav-links">
        {/* 🏠 Về trang chủ */}
        <li>
          <Link to="/">About Us</Link>
        </li>

        {/* 📂 Dropdown Services */}
        <li
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="dropdown-toggle">
            Services ▾
          </span>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/house-cleaning">House Cleaning</Link>
              </li>
              <li>
                <Link to="/house-moving">House Moving</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      <button className="book-btn">Book Schedule</button>
    </nav>
  );
};

export default Navbar;
