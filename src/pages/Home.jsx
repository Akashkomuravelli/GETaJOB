import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const value = search.trim();

    if (value) {
      navigate(`/jobs?search=${encodeURIComponent(value)}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">
          JobNest<span>✦</span>
        </Link>

        <div className="nav-links">
          <Link to="/jobs">Jobs</Link>
          <a href="#">Companies</a>
          <a href="#">Categories</a>
          <a href="#">About</a>
        </div>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-badge">
            ✦ Discover better opportunities
          </div>

          <h1>
            Find your next
            <span> opportunity.</span>
          </h1>

          <p>
            Discover curated job opportunities from companies and apply
            directly through their official websites.
          </p>

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search jobs, companies, or skills..."
            />

            <button onClick={handleSearch}>
              Search
            </button>
          </div>

          {search.trim() && (
            <div className="home-search-results">
              {jobs
                .filter((job) => {
                  const value = search.toLowerCase().trim();

                  return (
                    job.role.toLowerCase().includes(value) ||
                    job.company.toLowerCase().includes(value) ||
                    job.category.toLowerCase().includes(value) ||
                    job.skills.some((skill) =>
                      skill.toLowerCase().includes(value)
                    )
                  );
                })
                .slice(0, 5)
                .map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="home-search-result"
                  >
                    <div className="search-result-logo">
                      {job.logo}
                    </div>

                    <div className="search-result-info">
                      <strong>{job.role}</strong>
                      <span>
                        {job.company} · {job.location}
                      </span>
                    </div>

                    <span className="search-result-arrow">
                      →
                    </span>
                  </Link>
                ))}
            </div>
          )}

          <div className="popular">
            <span>Popular:</span>

            <button
              onClick={() =>
                navigate("/jobs?search=Python")
              }
            >
              Python
            </button>

            <button
              onClick={() =>
                navigate("/jobs?search=Java")
              }
            >
              Java
            </button>

            <button
              onClick={() =>
                navigate("/jobs?search=AI")
              }
            >
              AI / ML
            </button>

            <button
              onClick={() =>
                navigate("/jobs?search=Cybersecurity")
              }
            >
              Cybersecurity
            </button>
          </div>
        </section>

        <section className="jobs-section">
          <div className="sec-head">
            <div>
              <p className="eyebrow">
                EXPLORE
              </p>

              <h2>
                Latest opportunities
              </h2>
            </div>

            <Link
              to="/jobs"
              className="view-all"
            >
              View all →
            </Link>
          </div>

          <div className="job-grid">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;