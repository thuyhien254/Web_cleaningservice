import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/Navbar.css";
import logoImg from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); 

  const isActive = (path) => location.pathname === path;

  const serviceActive =
    location.pathname.startsWith("/house-cleaning") ||
    location.pathname.startsWith("/house-moving");

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logoImg} alt="HappyHome Logo" />
        <span className="brand-name">HappyHome</span>
      </div>

      <ul className="nav-links">

        <li>
          <Link
            to="/"
            className={isActive("/") ? "active-link" : ""}
          >
            About Us
          </Link>
        </li>

        {/* Services Dropdown */}
        <li className="dropdown">
          <span
            className={`dropdown-toggle ${serviceActive ? "active-link" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Services ▾
          </span>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/house-cleaning"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  House Cleaning
                </Link>
              </li>

              <li>
                <Link
                  to="/house-moving"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  House Moving
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to="/contact"
            className={isActive("/contact") ? "active-link" : ""}
          >
            Contact Us
          </Link>
        </li>

      </ul>

      <div className="nav-right">
        <button className="book-btn">Book Schedule</button>

        <Link to="/login" className="user-icon">
          <FaUserCircle size={30} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
