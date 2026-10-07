function JobDetails({ job, onBack }) {
  if (!job) {
    return null;
  }

  const handleApply = () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="details-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to jobs
      </button>

      <section className="details-card">
        <div className="details-header">
          <div className="details-logo">
            {job.logo}
          </div>

          <div>
            <p className="details-company">
              {job.company}
            </p>

            <h1>{job.role}</h1>
          </div>
        </div>

        <div className="details-meta">
          <span>📍 {job.location}</span>
          <span>◷ {job.type}</span>
          <span>🎓 {job.experience}</span>
          <span>✦ {job.category}</span>
        </div>

        <div className="details-divider"></div>

        <section className="details-section">
          <h2>About this opportunity</h2>

          <p>
            {job.description ||
              "No description available for this opportunity."}
          </p>
        </section>

        <section className="details-section">
          <h2>Required skills</h2>

          <div className="skills-list">
            {(job.skills || []).map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}

            {(!job.skills || job.skills.length === 0) && (
              <span className="skill-pill">
                Skills not specified
              </span>
            )}
          </div>
        </section>

        <div className="apply-container">
          <div>
            <p className="apply-title">
              Interested in this opportunity?
            </p>

            <p className="apply-subtitle">
              Apply directly through the company's official application page.
            </p>
          </div>

          <button
            className="big-apply-btn"
            onClick={handleApply}
          >
            Apply Now ↗
          </button>
        </div>
      </section>
    </main>
  );
}

export default JobDetails;