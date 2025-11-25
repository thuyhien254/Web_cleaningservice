import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import logonoword from "../assets/logonoword.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [userName, setUserName] = useState(null);
  const [services, setServices] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // ===== FETCH SERVICES FOR NAVBAR =====
  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data?.data?.services || []);
      })
      .catch(() => console.error("Failed to load services"));
  }, []);

  // ===== LOAD USER NAME FROM LOCALSTORAGE =====
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.full_name) {
          const parts = parsed.full_name.trim().split(" ");
          const lastTwo = parts.slice(-2).join(" ");
          setUserName(lastTwo);
        }
      } catch {
        console.error("Invalid user JSON");
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

  // ===== ACTIVE LINK HELPERS =====
  const isActive = (path) => location.pathname === path;
  const serviceActive = location.pathname.startsWith("/services/");

  // ===== DROPDOWN HANDLERS =====
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

      {/* CENTER NAV LINKS */}
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive("/") ? "active-link" : ""}>
            About Us
          </Link>
        </li>

        {/* SERVICES DROPDOWN */}
        <li className="dropdown">
          <span
            className={`dropdown-toggle ${serviceActive ? "active-link" : ""}`}
            onClick={toggleServiceDropdown}
          >
            Services ▾
          </span>

          {isServiceDropdownOpen && (
            <ul className="dropdown-menu">
              {services.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={`/services/${svc.id}`}  // BE only has id
                    onClick={() => setIsServiceDropdownOpen(false)}
                  >
                    {svc.name}
                  </Link>
                </li>
              ))}
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
          <div className="user-display" onClick={toggleUserDropdown}>
            <FaUserCircle size={26} />
            {userName && <span className="user-short-name">{userName}</span>}
          </div>

          {/* If logged in */}
          {isUserDropdownOpen && userName && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}

          {/* If NOT logged in */}
          {isUserDropdownOpen && !userName && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
