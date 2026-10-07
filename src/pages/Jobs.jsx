import { useState } from "react";
import { Link } from "react-router-dom";

import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

function Jobs() {
  const searchParams = new URLSearchParams(
    window.location.search
  );

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");

  const updateSearchUrl = (value) => {
    const params = new URLSearchParams(
      window.location.search
    );

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    const query = params.toString();

    window.history.replaceState(
      {},
      "",
      query ? `/jobs?${query}` : "/jobs"
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const searchValue =
      search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      job.role.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.category.toLowerCase().includes(searchValue) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchValue)
      );

    const matchesLocation =
      !location ||
      job.location === location;

    const matchesCategory =
      !category ||
      job.category === category;

    const matchesExperience =
      !experience ||
      job.experience === experience;

    const matchesType =
      !type ||
      job.type === type;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesExperience &&
      matchesType
    );
  });

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setExperience("");
    setType("");

    window.history.replaceState(
      {},
      "",
      "/jobs"
    );
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

        <Link
          to="/admin"
          className="admin-btn"
        >
          Admin
        </Link>
      </nav>

      <main>
        <section className="jobs-page-header">
          <p className="eyebrow">
            OPPORTUNITIES
          </p>

          <h1>
            Find your next job
          </h1>

          <p>
            Search and filter curated opportunities
            from leading companies.
          </p>
        </section>

        <section className="jobs-section">
          <div className="job-filters">
            <div className="filter-search">
              <span>⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  updateSearchUrl(e.target.value);
                }}
                placeholder="Search jobs, companies, skills..."
              />
            </div>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >
              <option value="">
                All locations
              </option>

              <option value="Hyderabad">
                Hyderabad
              </option>

              <option value="Bangalore">
                Bangalore
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="">
                All categories
              </option>

              <option value="AI / ML">
                AI / ML
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Support">
                Support
              </option>

              <option value="Software">
                Software
              </option>

              <option value="Python">
                Python
              </option>

              <option value="Cybersecurity">
                Cybersecurity
              </option>
            </select>

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
            >
              <option value="">
                All experience
              </option>

              <option value="Fresher">
                Fresher
              </option>

              <option value="Entry Level">
                Entry Level
              </option>
            </select>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="">
                All job types
              </option>

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Internship">
                Internship
              </option>
            </select>

            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          <div className="results-header">
            <div>
              <p className="eyebrow">
                RESULTS
              </p>

              <h2>
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "opportunity"
                  : "opportunities"}
              </h2>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="job-grid">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                ⌕
              </div>

              <h2>
                No jobs found
              </h2>

              <p>
                Try changing your search or filters
                to find more opportunities.
              </p>

              <button
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Jobs;