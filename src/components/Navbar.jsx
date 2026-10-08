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

        <Link to="/companies">Companies</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;