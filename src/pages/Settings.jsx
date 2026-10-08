import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Settings() {

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/getajob-admin";
  }

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <Link to="/" className="admin-brand">
          GETaJOB<span>✦</span>
        </Link>

        <div className="admin-menu">

          <Link
            to="/getajob-admin/dashboard"
            className="admin-menu-item"
          >
            <span>▦</span>
            Jobs Management
          </Link>

          <Link
            to="/jobs"
            className="admin-menu-item"
          >
            <span>◫</span>
            Public Jobs
          </Link>

          <Link
            to="/getajob-admin/add"
            className="admin-menu-item"
          >
            <span>＋</span>
            Add Job
          </Link>

          <Link
            to="/getajob-admin/analytics"
            className="admin-menu-item"
          >
            <span>◒</span>
            Analytics
          </Link>

          <Link
            to="/getajob-admin/settings"
            className="admin-menu-item active"
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

          <button
            type="button"
            className="admin-view-site"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

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
              Manage your GETaJOB platform settings.
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
              gap: "25px",
            }}
          >

            <div>

              <p
                style={{
                  color: "#858998",
                  fontSize: "12px",
                  marginBottom: "7px",
                }}
              >
                Platform name
              </p>

              <input
                value="GETaJOB"
                readOnly
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "13px",
                  boxSizing: "border-box",
                  border: "1px solid #2a2d38",
                  borderRadius: "10px",
                  background: "#0d0f15",
                  color: "white",
                }}
              />

            </div>

            <div>

              <p
                style={{
                  color: "#858998",
                  fontSize: "12px",
                  marginBottom: "7px",
                }}
              >
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
                  boxSizing: "border-box",
                  border: "1px solid #2a2d38",
                  borderRadius: "10px",
                  background: "#0d0f15",
                  color: "white",
                  resize: "vertical",
                }}
              />

            </div>

            <div>

              <p
                style={{
                  color: "#858998",
                  fontSize: "12px",
                  marginBottom: "7px",
                }}
              >
                Admin access
              </p>

              <p
                style={{
                  color: "#57d99b",
                  margin: 0,
                }}
              >
                ● Protected by Supabase Authentication
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;