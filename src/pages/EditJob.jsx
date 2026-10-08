import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchJob();
  }, [id]);

  async function fetchJob() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setForm({
      company: data.company || "",
      role: data.role || "",
      location: data.location || "",
      type: data.type || "Full-time",
      category: data.category || "Technology",
      experience: data.experience || "Fresher",
      description: data.description || "",
      skills: (data.skills || []).join(", "),
      applyUrl: data.apply_url || "",
    });

    setLoading(false);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");

    const skillsArray = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("jobs")
      .update({
        company: form.company,
        role: form.role,
        location: form.location,
        type: form.type,
        category: form.category,
        experience: form.experience,
        description: form.description,
        skills: skillsArray,
        apply_url: form.applyUrl,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    alert("Job updated successfully! 🎉");

    navigate("/admin");
  }

  if (loading) {
    return (
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <Link to="/" className="admin-brand">
            GETaJOB<span>✦</span>
          </Link>
        </aside>

        <main className="admin-main">
          <div className="admin-empty-state">
            Loading job...
          </div>
        </main>
      </div>
    );
  }

  if (error && !form.company) {
    return (
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <Link to="/" className="admin-brand">
            GETaJOB<span>✦</span>
          </Link>
        </aside>

        <main className="admin-main">
          <div className="admin-empty-state">
            <h3>Unable to load job</h3>
            <p>{error}</p>

            <Link
              to="/admin"
              className="admin-add-btn"
            >
              ← Back to Jobs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <Link to="/" className="admin-brand">
          GETaJOB<span>✦</span>
        </Link>

        <div className="admin-menu">

          <Link
            to="/admin"
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

      {/* MAIN */}

      <main className="admin-main">

        <header className="admin-header">

          <div>
            <p className="admin-eyebrow">
              MANAGEMENT
            </p>

            <h1>Edit Job</h1>

            <p className="admin-header-subtitle">
              Update this job opportunity.
            </p>
          </div>

        </header>

        <section className="admin-panel add-job-panel">

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="job-form"
          >

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
                placeholder="Python, SQL, Git"
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

              <Link
                to="/admin"
                className="cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="admin-add-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "✓ Save Changes"}
              </button>

            </div>

          </form>

        </section>

      </main>
    </div>
  );
}

export default EditJob;