import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  supabase,
} from "../lib/supabase";

function AdminDashboard() {

  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [busyId, setBusyId] =
    useState(null);


  useEffect(() => {
    loadJobs();
  }, []);


  async function loadJobs() {

    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("jobs")
      .select("*")
      .order(
        "posted_at",
        {
          ascending: false,
        }
      );

    if (error) {
      console.error(error);
    }

    setJobs(data || []);

    setLoading(false);
  }


  async function toggleActive(job) {

    setBusyId(job.id);

    const {
      error,
    } = await supabase
      .from("jobs")
      .update({
        is_active:
          !job.is_active,
      })
      .eq("id", job.id);

    if (error) {

      alert(
        "Could not update job."
      );

    } else {

      setJobs((current) =>
        current.map((item) =>
          item.id === job.id
            ? {
                ...item,
                is_active:
                  !item.is_active,
              }
            : item
        )
      );

    }

    setBusyId(null);
  }


  async function deleteJob(job) {

    const confirmed =
      window.confirm(
        `Delete "${job.role}" at ${job.company}? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setBusyId(job.id);

    const {
      error,
    } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job.id);

    if (error) {

      alert(
        "Could not delete this job."
      );

    } else {

      setJobs((current) =>
        current.filter(
          (item) =>
            item.id !== job.id
        )
      );

    }

    setBusyId(null);
  }


  async function logout() {

    await supabase.auth.signOut();

    window.location.href =
      "/getajob-admin";
  }


  const filteredJobs =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      return jobs.filter(
        (job) => {

          const searchable =
            [
              job.company,
              job.role,
              job.location,
              job.category,
              job.experience,
            ]
              .join(" ")
              .toLowerCase();

          const matchesSearch =
            !query ||
            searchable.includes(
              query
            );

          const matchesStatus =
            status === "all" ||
            (
              status ===
                "active" &&
              job.is_active
            ) ||
            (
              status ===
                "inactive" &&
              !job.is_active
            );

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      jobs,
      search,
      status,
    ]);


  const activeJobs =
    jobs.filter(
      (job) =>
        job.is_active
    ).length;


  const totalViews =
    jobs.reduce(
      (sum, job) =>
        sum +
        (job.views || 0),
      0
    );


  const totalApplies =
    jobs.reduce(
      (sum, job) =>
        sum +
        (job.apply_clicks || 0),
      0
    );


  return (

    <div className="gj-admin-layout">

      {/* SIDEBAR */}

      <aside className="gj-admin-side">

        <Link
          to="/"
          className="gj-admin-brand"
        >
          GETaJOB
          <span>✦</span>
        </Link>


        <nav>

          <Link
            className="active"
            to="/getajob-admin/dashboard"
          >
            ▦ Jobs
          </Link>

          <Link to="/jobs">
            ◫ Public jobs
          </Link>

          <Link to="/getajob-admin/add">
            ＋ Add job
          </Link>

          <Link to="/getajob-admin/analytics">
            ◒ Analytics
          </Link>

          <Link to="/getajob-admin/settings">
            ⚙ Settings
          </Link>

        </nav>


        <div className="gj-admin-bottom">

          <Link to="/">
            ← View website
          </Link>

          <button
            onClick={logout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="gj-admin-main">

        <header className="gj-admin-header">

          <div>

            <span>
              MANAGEMENT
            </span>

            <h1>
              Jobs
            </h1>

            <p>
              Manage every opportunity
              published on GETaJOB.
            </p>

          </div>


          <Link
            className="gj-admin-primary"
            to="/getajob-admin/add"
          >
            ＋ Add new job
          </Link>

        </header>


        {/* STATS */}

        <section className="gj-admin-stat-grid">

          <div>
            <span>
              Total jobs
            </span>

            <strong>
              {jobs.length}
            </strong>
          </div>


          <div>
            <span>
              Active
            </span>

            <strong>
              {activeJobs}
            </strong>
          </div>


          <div>
            <span>
              Total views
            </span>

            <strong>
              {totalViews}
            </strong>
          </div>


          <div>
            <span>
              Apply clicks
            </span>

            <strong>
              {totalApplies}
            </strong>
          </div>

        </section>


        {/* SEARCH */}

        <section className="gj-admin-toolbar">

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search company, role, location..."
          />


          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
          >

            <option value="all">
              All jobs
            </option>

            <option value="active">
              Active only
            </option>

            <option value="inactive">
              Inactive only
            </option>

          </select>

        </section>


        {/* TABLE */}

        <section className="gj-admin-card">

          {loading ? (

            <div className="gj-admin-empty">
              Loading jobs...
            </div>

          ) : filteredJobs.length === 0 ? (

            <div className="gj-admin-empty">

              <h3>
                No jobs found
              </h3>

              <p>
                Try another search or
                add a new opportunity.
              </p>

            </div>

          ) : (

            <div className="gj-table-wrap">

              <table className="gj-admin-table">

                <thead>

                  <tr>

                    <th>
                      Opportunity
                    </th>

                    <th>
                      Location
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Views
                    </th>

                    <th>
                      Apply
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredJobs.map(
                    (job) => (

                      <tr key={job.id}>

                        <td>

                          <strong>
                            {job.role}
                          </strong>

                          <small>
                            {job.company}
                            {" · "}
                            {job.category}
                          </small>

                        </td>


                        <td>
                          {job.location}
                        </td>


                        <td>

                          <span
                            className={
                              `gj-status ${
                                job.is_active
                                  ? "on"
                                  : "off"
                              }`
                            }
                          >
                            {job.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </td>


                        <td>
                          {job.views || 0}
                        </td>


                        <td>
                          {job.apply_clicks ||
                            0}
                        </td>


                        <td>

                          <div className="gj-actions">

                            <Link
                              to={`/getajob-admin/edit/${job.id}`}
                            >
                              Edit
                            </Link>


                            <button
                              disabled={
                                busyId ===
                                job.id
                              }
                              onClick={() =>
                                toggleActive(
                                  job
                                )
                              }
                            >
                              {job.is_active
                                ? "Deactivate"
                                : "Activate"}
                            </button>


                            <button
                              className="danger"
                              disabled={
                                busyId ===
                                job.id
                              }
                              onClick={() =>
                                deleteJob(
                                  job
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;