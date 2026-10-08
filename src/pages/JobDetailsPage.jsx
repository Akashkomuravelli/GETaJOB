import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

function formatPostedDate(date) {
  if (!date) return "Recently";

  const now = new Date();
  const posted = new Date(date);

  const diffHours = Math.floor(
    (now - posted) / (1000 * 60 * 60)
  );

  if (diffHours < 1) return "Just now";

  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const days = Math.floor(diffHours / 24);

  if (days === 1) return "1 day ago";

  if (days < 30) {
    return `${days} days ago`;
  }

  return "Recently";
}

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJob();
  }, [id]);

  async function loadJob() {
    setLoading(true);
    setError("");

    const jobId = Number(id);

    if (!Number.isFinite(jobId)) {
      setError("Invalid job.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) {
      setError("This opportunity is no longer available.");
      setLoading(false);
      return;
    }

    setJob(data);
    setLoading(false);

    /*
     * VIEW TRACKING
     *
     * Only count once per browser session for this job.
     */
    const viewKey = `getajob-viewed-${jobId}`;

    if (!sessionStorage.getItem(viewKey)) {
      sessionStorage.setItem(viewKey, "true");

      await supabase.rpc("increment_job_view", {
        p_job_id: jobId,
      });
    }

    /*
     * SIMILAR JOBS
     */
    const { data: similar } = await supabase
      .from("jobs")
      .select(
        "id, company, role, location, type, category, experience, posted_at"
      )
      .eq("is_active", true)
      .eq("category", data.category)
      .neq("id", jobId)
      .order("posted_at", {
        ascending: false,
      })
      .limit(3);

    setSimilarJobs(similar || []);
  }

  async function handleApply() {
    if (!job?.apply_url) {
      alert("Application link is not available.");
      return;
    }

    /*
     * Track Apply click.
     *
     * If tracking fails, still allow the user
     * to continue to the company website.
     */
    try {
      await supabase.rpc("increment_job_apply", {
        p_job_id: job.id,
      });
    } catch (error) {
      console.error(
        "Apply tracking failed:",
        error
      );
    }

    window.open(
      job.apply_url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (loading) {
    return (
      <div className="gj-shell">
        <Navbar />

        <main className="gj-details-page">
          <div className="gj-loading">
            <div />
            <div />
            <div />
          </div>
        </main>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="gj-shell">
        <Navbar />

        <main className="gj-details-page">
          <section className="gj-not-found">
            <span>GETaJOB / 404</span>

            <h1>
              Opportunity not found.
            </h1>

            <p>
              {error ||
                "This job is no longer available."}
            </p>

            <button
              onClick={() =>
                navigate("/jobs")
              }
            >
              ← Back to jobs
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="gj-shell">
      <Navbar />

      <main className="gj-details-page">

        {/* BACK */}
        <button
          className="gj-back"
          onClick={() =>
            navigate("/jobs")
          }
        >
          ← Back to opportunities
        </button>


        {/* HERO */}
        <section className="gj-details-hero">

          <div className="gj-company-mark">
            {job.company
              ?.charAt(0)
              ?.toUpperCase() || "J"}
          </div>


          <div className="gj-details-heading">

            <span className="gj-kicker">
              {job.category ||
                "OPPORTUNITY"}
            </span>

            <h1>
              {job.role}
            </h1>

            <p>
              {job.company}
            </p>

            <div className="gj-detail-meta">

              <span>
                📍 {job.location}
              </span>

              <span>
                ◷ {job.type}
              </span>

              <span>
                ◉ {job.experience}
              </span>

              <span>
                ↗{" "}
                {formatPostedDate(
                  job.posted_at
                )}
              </span>

            </div>
          </div>


          {/* APPLY */}
          <div className="gj-apply-panel">

            <span>
              READY TO MOVE?
            </span>

            <button
              onClick={handleApply}
            >
              Apply Now ↗
            </button>

            <small>
              You'll continue on the
              company's original
              application page.
            </small>

          </div>

        </section>


        {/* CONTENT */}
        <div className="gj-details-layout">

          <article className="gj-details-main">

            {/* DESCRIPTION */}
            <section className="gj-content-section">

              <span className="gj-section-label">
                THE ROLE
              </span>

              <h2>
                About this opportunity
              </h2>

              <p className="gj-description">
                {job.description ||
                  "No detailed description has been provided for this opportunity."}
              </p>

            </section>


            {/* SKILLS */}
            <section className="gj-content-section">

              <span className="gj-section-label">
                WHAT YOU'LL NEED
              </span>

              <h2>
                Skills & requirements
              </h2>

              <div className="gj-skills">

                {(job.skills || []).length >
                0 ? (

                  job.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                      >
                        {skill}
                      </span>
                    )
                  )

                ) : (

                  <p className="gj-muted">
                    Skills were not
                    specified.
                  </p>

                )}

              </div>

            </section>

          </article>


          {/* SIDEBAR */}
          <aside className="gj-details-aside">

            <div className="gj-aside-card">

              <span className="gj-section-label">
                QUICK INFO
              </span>

              <div className="gj-info-row">
                <b>Company</b>
                <span>
                  {job.company}
                </span>
              </div>

              <div className="gj-info-row">
                <b>Location</b>
                <span>
                  {job.location}
                </span>
              </div>

              <div className="gj-info-row">
                <b>Job type</b>
                <span>
                  {job.type}
                </span>
              </div>

              <div className="gj-info-row">
                <b>Experience</b>
                <span>
                  {job.experience}
                </span>
              </div>

              <button
                className="gj-aside-apply"
                onClick={handleApply}
              >
                Apply for this role ↗
              </button>

            </div>

          </aside>

        </div>


        {/* SIMILAR JOBS */}
        {similarJobs.length > 0 && (

          <section className="gj-similar">

            <div className="gj-similar-heading">

              <div>
                <span>
                  KEEP EXPLORING
                </span>

                <h2>
                  More like this
                </h2>
              </div>

              <Link to="/jobs">
                View all →
              </Link>

            </div>


            <div className="gj-similar-grid">

              {similarJobs.map(
                (similar) => (

                  <Link
                    key={similar.id}
                    to={`/jobs/${similar.id}`}
                    className="gj-similar-card"
                  >

                    <div className="gj-similar-logo">
                      {similar.company
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "J"}
                    </div>

                    <span>
                      {similar.category}
                    </span>

                    <h3>
                      {similar.role}
                    </h3>

                    <p>
                      {similar.company}
                    </p>

                    <small>
                      {similar.location}
                      {" · "}
                      {similar.type}
                    </small>

                  </Link>

                )
              )}

            </div>

          </section>

        )}

      </main>
    </div>
  );
}

export default JobDetailsPage;