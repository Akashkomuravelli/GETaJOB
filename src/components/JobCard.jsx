import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="card-top">
        <div className="company-logo">
          {job.logo}
        </div>

        <span className="category">
          {job.category}
        </span>
      </div>

      <div className="job-info">
        <p className="company-name">
          {job.company}
        </p>

        <h3>
          {job.role}
        </h3>

        <div className="job-meta">
          <span>
            📍 {job.location}
          </span>

          <span>
            ◷ {job.type}
          </span>
        </div>
      </div>

      <div className="card-bottom">
        <span className="fresh">
          ● {job.posted}
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="apply-btn"
        >
          View job →
        </Link>
      </div>
    </article>
  );
}

export default JobCard;