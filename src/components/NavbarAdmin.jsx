import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import logonoword from "../assets/logonoword.png";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";


const NavbarAdmin = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();


 useEffect(() => {
  if (user?.full_name) {
    const parts = user.full_name.trim().split(" ");
    const lastTwo = parts.slice(-2).join(" ");
    setUserName(lastTwo);
  }
}, [user]);

 const handleLogout = () => {
  logout();
  navigate("/login");
};

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logonoword} alt="HappyHome Logo" />
        <span className="brand-name">HappyHome</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link
            to="/admin"
            className={isActive("/admin") ? "active-link" : ""}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/booking"
            className={isActive("/admin/booking") ? "active-link" : ""}
          >
            Booking
          </Link>
        </li>

        <li>
          <Link
            to="/admin/employees"
            className={isActive("/admin/employees") ? "active-link" : ""}
          >
            Employees
          </Link>
        </li>

        <li>
          <Link
            to="/admin/services"
            className={isActive("/admin/services") ? "active-link" : ""}
          >
            Service
          </Link>
        </li>

      </ul>

      <div className="nav-right">
        <div className="dropdown user-dropdown-wrapper">
          <div
            className="user-display"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <FaUserCircle className="admin-user-icon" />
            {userName && <span className="user-short-name">{userName}</span>}
          </div>

          {isUserDropdownOpen && (
            <ul className="dropdown-menu user-dropdown-menu">
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
