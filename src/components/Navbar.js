import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    console.log("Logged out!");
    // Add logout functionality here
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo and Title */}
      <div className="navbar-title">
        <a href="/" className="navbar-logo-link">
          <img src="/favicon.ico" alt="Logo" className="navbar-logo" />
          GeoGuessrBosnia
        </a>
      </div>

      {/* Center Section: Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/" className="full-box-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="full-box-link">About Us</Link>
        </li>
        <li>
          <Link to="/" className="full-box-link">Main Menu</Link> 
        </li> 
      </ul>

      {/* Right Section: Profile Dropdown */}
      <div className="navbar-profile" onClick={toggleMenu}>
        <img
          src="/profilepicture.png"
          alt="Profile"
          className="profile-icon"
        />
        {menuOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <img
                src="/profilepicture.png"
                alt="User"
                className="dropdown-profile-picture"
              />
              <div className="dropdown-username">Otorina</div>
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link to="/profile ">Account</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              
              <hr />
              <li onClick={handleLogout}>
                <a href="#">Log Out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
