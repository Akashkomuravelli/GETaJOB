import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        GETaJOB<span>✦</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links">
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${menuOpen ? "mobile-nav-open" : ""}`}>
        <NavLink to="/jobs" onClick={closeMenu}>
          Jobs
        </NavLink>

        <NavLink to="/companies" onClick={closeMenu}>
          Companies
        </NavLink>

        <NavLink to="/categories" onClick={closeMenu}>
          Categories
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;