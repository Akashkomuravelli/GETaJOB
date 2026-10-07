import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";

function AdminDashboard() {
  const totalJobs = jobs.length;
  const activeJobs = jobs.length;
  const applyClicks = 0;

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <Link to="/" className="admin-brand">
          JobNest<span>✦</span>
        </Link>

        <div className="admin-menu">

          <Link
            to="/admin"
            className="admin-menu-item active"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="admin-menu-item"
          >
            <span>◫</span>
            Jobs
          </Link>

          <Link
            to="/admin/add"
            className="admin-menu-item"
          >
            <span>＋</span>
            Add Job
          </Link>

          <Link
            to="/admin/analytics"
            className="admin-menu-item"
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

          <Link
            to="/"
            className="admin-view-site"
          >
            ← View website
          </Link>

        </div>

      </aside>


      {/* Main */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <div>
            <p className="admin-eyebrow">
              OVERVIEW
            </p>

            <h1>
              Dashboard
            </h1>

            <p className="admin-header-subtitle">
              Manage your job opportunities and platform activity.
            </p>
          </div>

          <Link
            to="/admin/add"
            className="admin-add-btn"
          >
            ＋ Add New Job
          </Link>

        </header>


        {/* Statistics */}
        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ◫
            </div>

            <div>
              <p>Total Jobs</p>

              <h2>
                {totalJobs}
              </h2>

              <span>
                All published opportunities
              </span>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ●
            </div>

            <div>
              <p>Active Jobs</p>

              <h2>
                {activeJobs}
              </h2>

              <span>
                Currently visible
              </span>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ↗
            </div>

            <div>
              <p>Apply Clicks</p>

              <h2>
                {applyClicks}
              </h2>

              <span>
                Total application clicks
              </span>
            </div>

          </div>

        </section>


        {/* Recent Jobs */}
        <section className="admin-panel">

          <div className="admin-panel-header">

            <div>
              <p className="admin-eyebrow">
                MANAGEMENT
              </p>

              <h2>
                Recent Jobs
              </h2>
            </div>

            <Link
              to="/jobs"
              className="admin-view-all"
            >
              View public jobs →
            </Link>

          </div>


          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr key={job.id}>

                    <td>

                      <div className="admin-company">

                        <div className="admin-company-logo">
                          {job.logo}
                        </div>

                        <strong>
                          {job.company}
                        </strong>

                      </div>

                    </td>


                    <td>
                      <span className="admin-position">
                        {job.role}
                      </span>
                    </td>


                    <td>
                      {job.location}
                    </td>


                    <td>

                      <span className="admin-category">
                        {job.category}
                      </span>

                    </td>


                    <td>

                      <span className="admin-status">
                        ● Active
                      </span>

                    </td>


                    <td>

                      <Link
                        to={`/jobs/${job.id}`}
                        className="admin-action"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;