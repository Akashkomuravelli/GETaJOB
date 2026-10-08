import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        GETaJOB<span>✦</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/jobs">
          Jobs
        </NavLink>

        <a href="#companies">
          Companies
        </a>

        <a href="#categories">
          Categories
        </a>

        <a href="#about">
          About
        </a>
      </div>
    </nav>
  );
}

export default Navbar;