import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import logonoword from "../assets/logonoword.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [userName, setUserName] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ===== LOAD USER NAME =====
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.full_name) {
          const nameParts = parsed.full_name.trim().split(" ");
          const lastTwo = nameParts.slice(-2).join(" ");
          setUserName(lastTwo);
        }
      } catch {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  // ===== LOGOUT =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    setIsUserDropdownOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const serviceActive =
    location.pathname.startsWith("/house-cleaning") ||
    location.pathname.startsWith("/house-moving");

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsServiceDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      {/* LEFT LOGO */}
      <div className="nav-logo">
        <img src={logonoword} alt="HappyHome Logo" />
        <span className="brand-name">HappyHome</span>
      </div>

      {/* CENTER LINKS */}
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

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <Link to="/booking">
          <button className="book-btn">Book Schedule</button>
        </Link>

        {/* USER DROPDOWN */}
        <div className="dropdown user-dropdown-wrapper">
          <div className="user-display" onClick={toggleUserDropdown}>
            <FaUserCircle size={26} />
            {userName && <span className="user-short-name">{userName}</span>}
          </div>

          {/* When logged in */}
          {isUserDropdownOpen && userName && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}

          {/* When NOT logged in */}
          {isUserDropdownOpen && !userName && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <Link to="/login" onClick={() => setIsUserDropdownOpen(false)}>
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
