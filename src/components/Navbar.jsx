import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import logonoword from "../assets/logonoword.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [services, setServices] = useState([]);

  const serviceRef = useRef(null);
  const userRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data?.data?.services || []))
      .catch(() => {});
  }, []);

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
      } catch {}
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) {
        setIsServiceDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    setIsUserDropdownOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const serviceActive = location.pathname.startsWith("/services/");

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

        <li className="dropdown" ref={serviceRef}>
          <span
            className={`dropdown-toggle ${serviceActive ? "active-link" : ""}`}
            onClick={() => {
              setIsServiceDropdownOpen(!isServiceDropdownOpen);
              setIsUserDropdownOpen(false);
            }}
          >
            Services ▾
          </span>

          {isServiceDropdownOpen && (
            <ul className="dropdown-menu">
              {services.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={`/services/${svc.id}`}
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

        <div className="dropdown user-dropdown-wrapper" ref={userRef}>
          <div
            className="user-display"
            onClick={() => {
              setIsUserDropdownOpen(!isUserDropdownOpen);
              setIsServiceDropdownOpen(false);
            }}
          >
            <FaUserCircle size={26} />
            {userName && <span className="user-short-name">{userName}</span>}
          </div>

          {isUserDropdownOpen && userName && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}

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
