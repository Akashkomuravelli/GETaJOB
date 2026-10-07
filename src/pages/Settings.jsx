import { Link } from "react-router-dom";

function Settings() {
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
            className="admin-menu-item"
          >
            <span>◒</span>
            Analytics
          </Link>

          <Link
            to="/admin/settings"
            className="admin-menu-item active"
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
              CONFIGURATION
            </p>

            <h1>
              Settings
            </h1>

            <p className="admin-header-subtitle">
              Manage your JobNest platform settings.
            </p>
          </div>

        </header>

        <section className="admin-panel">

          <div className="admin-panel-header">
            <div>
              <p className="admin-eyebrow">
                PLATFORM
              </p>

              <h2>
                General Settings
              </h2>
            </div>
          </div>

          <div
            style={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >

            <div>
              <p style={{ color: "#858998", fontSize: "12px" }}>
                Platform name
              </p>

              <input
                value="JobNest"
                readOnly
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "13px",
                  marginTop: "7px",
                  boxSizing: "border-box",
                  border: "1px solid #2a2d38",
                  borderRadius: "10px",
                  background: "#0d0f15",
                  color: "white",
                }}
              />
            </div>

            <div>
              <p style={{ color: "#858998", fontSize: "12px" }}>
                Platform description
              </p>

              <textarea
                value="Discover curated job opportunities from leading companies."
                readOnly
                rows="4"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  padding: "13px",
                  marginTop: "7px",
                  boxSizing: "border-box",
                  border: "1px solid #2a2d38",
                  borderRadius: "10px",
                  background: "#0d0f15",
                  color: "white",
                  resize: "vertical",
                }}
              />
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;