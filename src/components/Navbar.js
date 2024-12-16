import React, { useState } from "react";
import { getLocations } from "../utils/randomLocation"; // Import locations
import "../Navbar.css"; 

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter locations based on the search term
    if (value) {
      const filtered = getLocations().filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo and Title (Clickable) */}
      <div className="navbar-title">
        <a href="/" className="navbar-logo-link">
          <img
            src="/favicon.ico"  // Logo from public folder
            alt="GeoGuessrBosnia Logo"
            className="navbar-logo"
          />
          GeoGuessrBosnia
        </a>
      </div>

      {/* Center Section: Links */}
      <ul className="navbar-links">
        <li>
        <a href="/about" style={{ color: "#fff", textDecoration: "none" }}> About Us </a>
        </li>
        <li><a href="#leaderboard" className="unused">Gallery</a></li>
        <li><a href="#locations"   className="unused">Choose City</a></li>
      </ul>

      {/* Right Section: Search Box */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search Locations..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredLocations.length > 0 && (
          <ul className="search-results">
            {filteredLocations.map((location) => (
              <li key={location.name}>
                <a
                  href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="search-result-box" // Added a new class for styling
                >
                  {location.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
