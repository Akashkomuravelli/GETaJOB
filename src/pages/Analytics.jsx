import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";

function Analytics() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">

        <Link to="/" className="admin-brand">
          JobNest<span>✦</span>
        </Link>

        <div className="admin-menu">

          <Link to="/admin" className="admin-menu-item">
            <span>▦</span>
            Dashboard
          </Link>

          <Link to="/jobs" className="admin-menu-item">
            <span>◫</span>
            Jobs
          </Link>

          <Link to="/admin/add" className="admin-menu-item">
            <span>＋</span>
            Add Job
          </Link>

          <Link
            to="/admin/analytics"
            className="admin-menu-item active"
          >
            <span>◒</span>
            Analytics
          </Link>

          <Link
            to="/admin/settings"
            className="admin-menu-item"
          >
            <span>⚙</span>
            Settings
          </Link>

        </div>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-view-site">
            ← View website
          </Link>
        </div>

      </aside>

      <main className="admin-main">

        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">
              INSIGHTS
            </p>

            <h1>
              Analytics
            </h1>

            <p className="admin-header-subtitle">
              Track how your job opportunities are performing.
            </p>
          </div>
        </header>

        <section className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              ◫
            </div>

            <div>
              <p>Total Jobs</p>
              <h2>{jobs.length}</h2>
              <span>Published opportunities</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              👁
            </div>

            <div>
              <p>Total Views</p>
              <h2>0</h2>
              <span>Job page views</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              ↗
            </div>

            <div>
              <p>Apply Clicks</p>
              <h2>0</h2>
              <span>Application redirects</span>
            </div>
          </div>

        </section>

        <section className="admin-panel">

          <div className="admin-panel-header">
            <div>
              <p className="admin-eyebrow">
                PERFORMANCE
              </p>

              <h2>
                Platform activity
              </h2>
            </div>
          </div>

          <div
            style={{
              padding: "60px 25px",
              textAlign: "center",
              color: "#777c8d",
            }}
          >
            Analytics tracking will appear here once
            we connect the platform to the database.
          </div>

        </section>

      </main>
    </div>
  );
}

export default Analytics;