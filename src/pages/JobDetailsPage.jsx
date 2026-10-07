import { Link, useNavigate, useParams } from "react-router-dom";

import { jobs } from "../data/jobs";
import JobDetails from "../components/JobDetails";

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find(
    (job) => job.id === Number(id)
  );

  if (!job) {
    return (
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="logo">
            JobNest<span>✦</span>
          </Link>
        </nav>

        <main className="details-page">
          <section className="details-card">
            <h1>
              Job not found
            </h1>

            <button
              className="big-apply-btn"
              onClick={() => navigate("/jobs")}
            >
              Back to Jobs
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">
          JobNest<span>✦</span>
        </Link>

        <div className="nav-links">
          <Link to="/jobs">
            Jobs
          </Link>

          <a href="#">
            Companies
          </a>

          <a href="#">
            Categories
          </a>

          <a href="#">
            About
          </a>
        </div>

        <Link
          to="/admin"
          className="admin-btn"
        >
          Admin
        </Link>
      </nav>

      <JobDetails
        job={job}
        onBack={() => navigate("/jobs")}
      />
    </div>
  );
}

export default JobDetailsPage;