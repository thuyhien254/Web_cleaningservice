import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/Navbar.css";
import logonoword from "../assets/logonoword.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const serviceActive =
    location.pathname.startsWith("/house-cleaning") ||
    location.pathname.startsWith("/house-moving");

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
    if (!isServiceDropdownOpen) setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (!isUserDropdownOpen) setIsServiceDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logonoword} alt="HappyHome Logo" />
        <span className="brand-name">HappyHome</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive("/") ? "active-link" : ""}>
            About Us
          </Link>
        </li>

        <li className="dropdown">
          <span
            className={`dropdown-toggle ${serviceActive ? "active-link" : ""}`}
            onClick={toggleServiceDropdown}
          >
            Services ▾
          </span>
          {isServiceDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/house-cleaning"
                  onClick={() => setIsServiceDropdownOpen(false)}
                >
                  House Cleaning
                </Link>
              </li>
              <li>
                <Link
                  to="/house-moving"
                  onClick={() => setIsServiceDropdownOpen(false)}
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
          <Link to="/booking">
          <button className="book-btn">Book Schedule</button>
          </Link>

        <div className="dropdown user-dropdown-wrapper">
          <FaUserCircle
            size={30}
            className="user-icon"
            onClick={toggleUserDropdown}
          />
          {isUserDropdownOpen && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
