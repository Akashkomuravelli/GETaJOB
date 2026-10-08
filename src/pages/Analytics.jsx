import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../lib/supabase";

function Analytics() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select(
        `
        id,
        company,
        role,
        category,
        location,
        is_active,
        views,
        apply_clicks,
        posted_at
        `
      )
      .order("apply_clicks", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  }

  const stats = useMemo(() => {
    const views = jobs.reduce(
      (sum, job) =>
        sum + (job.views || 0),
      0
    );

    const applies = jobs.reduce(
      (sum, job) =>
        sum + (job.apply_clicks || 0),
      0
    );

    return {
      total: jobs.length,

      active: jobs.filter(
        (job) => job.is_active
      ).length,

      views,

      applies,
    };
  }, [jobs]);

  const mostViewed = [...jobs]
    .sort(
      (a, b) =>
        (b.views || 0) -
        (a.views || 0)
    )
    .slice(0, 5);

  const mostApplied = [...jobs]
    .sort(
      (a, b) =>
        (b.apply_clicks || 0) -
        (a.apply_clicks || 0)
    )
    .slice(0, 5);

  const categories = useMemo(() => {
    const result = {};

    jobs.forEach((job) => {
      const category =
        job.category || "Other";

      if (!result[category]) {
        result[category] = {
          category,
          jobs: 0,
          views: 0,
          applies: 0,
        };
      }

      result[category].jobs += 1;

      result[category].views +=
        job.views || 0;

      result[category].applies +=
        job.apply_clicks || 0;
    });

    return Object.values(result).sort(
      (a, b) =>
        b.applies - a.applies ||
        b.views - a.views
    );
  }, [jobs]);

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/getajob-admin";
  }

  return (
    <div className="gj-admin-layout">

      <aside className="gj-admin-side">

        <Link
          to="/"
          className="gj-admin-brand"
        >
          GETaJOB<span>✦</span>
        </Link>

        <nav>

          <Link to="/getajob-admin/dashboard">
            ▦ Jobs
          </Link>

          <Link to="/jobs">
            ◫ Public jobs
          </Link>

          <Link to="/getajob-admin/add">
            ＋ Add job
          </Link>

          <Link
            className="active"
            to="/getajob-admin/analytics"
          >
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

          <button onClick={logout}>
            ↪ Logout
          </button>

        </div>

      </aside>


      <main className="gj-admin-main">

        <header className="gj-admin-header">

          <div>

            <span>
              PERFORMANCE
            </span>

            <h1>
              Analytics
            </h1>

            <p>
              Understand which
              opportunities attract
              attention and applications.
            </p>

          </div>

        </header>


        {loading ? (

          <div className="gj-admin-empty">
            Loading analytics...
          </div>

        ) : (

          <>

            {/* STATS */}
            <section className="gj-admin-stat-grid">

              <div>
                <span>
                  Total jobs
                </span>

                <strong>
                  {stats.total}
                </strong>
              </div>

              <div>
                <span>
                  Active jobs
                </span>

                <strong>
                  {stats.active}
                </strong>
              </div>

              <div>
                <span>
                  Job views
                </span>

                <strong>
                  {stats.views}
                </strong>
              </div>

              <div>
                <span>
                  Apply clicks
                </span>

                <strong>
                  {stats.applies}
                </strong>
              </div>

            </section>


            {/* RANKINGS */}
            <section className="gj-analytics-grid">

              <div className="gj-admin-card">

                <div className="gj-card-heading">
                  <h2>
                    Most viewed
                  </h2>

                  <span>
                    Views
                  </span>
                </div>

                {mostViewed.map(
                  (job, index) => (

                    <div
                      className="gj-ranking-row"
                      key={job.id}
                    >

                      <b>
                        0{index + 1}
                      </b>

                      <div>
                        <strong>
                          {job.role}
                        </strong>

                        <small>
                          {job.company}
                        </small>
                      </div>

                      <em>
                        {job.views || 0}
                      </em>

                    </div>

                  )
                )}

              </div>


              <div className="gj-admin-card">

                <div className="gj-card-heading">

                  <h2>
                    Most applied
                  </h2>

                  <span>
                    Apply clicks
                  </span>

                </div>

                {mostApplied.map(
                  (job, index) => (

                    <div
                      className="gj-ranking-row"
                      key={job.id}
                    >

                      <b>
                        0{index + 1}
                      </b>

                      <div>
                        <strong>
                          {job.role}
                        </strong>

                        <small>
                          {job.company}
                        </small>
                      </div>

                      <em>
                        {job.apply_clicks ||
                          0}
                      </em>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* CATEGORY */}
            <section className="gj-admin-card">

              <div className="gj-card-heading">

                <h2>
                  Category performance
                </h2>

                <span>
                  All jobs
                </span>

              </div>

              <div className="gj-table-wrap">

                <table className="gj-admin-table">

                  <thead>

                    <tr>
                      <th>
                        Category
                      </th>

                      <th>
                        Jobs
                      </th>

                      <th>
                        Views
                      </th>

                      <th>
                        Apply clicks
                      </th>

                      <th>
                        Conversion
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {categories.map(
                      (item) => {

                        const conversion =
                          item.views > 0
                            ? Math.round(
                                (item.applies /
                                  item.views) *
                                  100
                              )
                            : 0;

                        return (
                          <tr
                            key={
                              item.category
                            }
                          >

                            <td>
                              {item.category}
                            </td>

                            <td>
                              {item.jobs}
                            </td>

                            <td>
                              {item.views}
                            </td>

                            <td>
                              {item.applies}
                            </td>

                            <td>
                              {conversion}%
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </>

        )}

      </main>
    </div>
  );
}

export default Analytics;