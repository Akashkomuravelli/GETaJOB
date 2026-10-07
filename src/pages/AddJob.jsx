import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    type: "Full-time",
    category: "Technology",
    experience: "Fresher",
    description: "",
    skills: "",
    applyUrl: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Job:", {
      ...form,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });

    alert("Job published successfully!");

    navigate("/admin");
  };

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

          <Link
            to="/admin/add"
            className="admin-menu-item active"
          >
            <span>＋</span>
            Add Job
          </Link>

          <Link to="/admin/analytics" className="admin-menu-item">
            <span>◒</span>
            Analytics
          </Link>

          <Link to="/admin/settings" className="admin-menu-item">
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
            <p className="admin-eyebrow">MANAGEMENT</p>
            <h1>Add New Job</h1>
            <p className="admin-header-subtitle">
              Publish a new opportunity to JobNest.
            </p>
          </div>
        </header>

        <section className="admin-panel add-job-panel">
          <form onSubmit={handleSubmit} className="job-form">

            <div className="form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Amazon"
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Title</label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Technology</option>
                  <option>Software</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>AI / ML</option>
                  <option>Cybersecurity</option>
                  <option>Support</option>
                  <option>Data</option>
                </select>
              </div>

              <div className="form-group">
                <label>Experience</label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option>Fresher</option>
                  <option>Entry Level</option>
                  <option>1-2 Years</option>
                  <option>2-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the job opportunity..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Python, SQL, FastAPI, Git"
                required
              />
              <small>
                Separate skills with commas.
              </small>
            </div>

            <div className="form-group">
              <label>Application URL</label>
              <input
                type="url"
                name="applyUrl"
                value={form.applyUrl}
                onChange={handleChange}
                placeholder="https://company.com/careers/job"
                required
              />
            </div>

            <div className="form-actions">
              <Link to="/admin" className="cancel-btn">
                Cancel
              </Link>

              <button type="submit" className="admin-add-btn">
                ＋ Publish Job
              </button>
            </div>

          </form>
        </section>
      </main>
    </div>
  );
}

export default AddJob;