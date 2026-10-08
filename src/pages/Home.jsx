import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

function Home() {

  const navigate =
    useNavigate();

  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");


  useEffect(() => {

    async function loadJobs() {

      const {
        data,
        error,
      } = await supabase
        .from("jobs")
        .select(
          `
          id,
          company,
          role,
          location,
          type,
          category,
          experience,
          posted_at
          `
        )
        .eq(
          "is_active",
          true
        )
        .order(
          "posted_at",
          {
            ascending: false,
          }
        )
        .limit(6);

      if (!error) {
        setJobs(data || []);
      }
    }

    loadJobs();

  }, []);


  const categories =
    useMemo(() => {

      const counts = {};

      jobs.forEach(
        (job) => {

          const category =
            job.category ||
            "Other";

          counts[category] =
            (counts[category] ||
              0) + 1;

        }
      );

      return Object.entries(
        counts
      )
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 6);

    }, [jobs]);


  function searchJobs(event) {

    event.preventDefault();

    const query =
      search.trim();

    if (!query) {

      navigate("/jobs");

      return;
    }

    navigate(
      `/jobs?search=${encodeURIComponent(
        query
      )}`
    );
  }


  return (

    <div className="gj-home">

      <Navbar />


      <main>

        {/* HERO */}

        <section className="gj-home-hero">

          <div className="gj-home-hero-inner">

            <span className="gj-home-kicker">
              THE NEXT MOVE STARTS HERE
            </span>


            <h1>
              Find work that
              <br />
              <em>
                moves you forward.
              </em>
            </h1>


            <p>
              Real opportunities from
              real companies. Discover
              a role, open the original
              listing, and make your move.
            </p>


            <form
              className="gj-home-search"
              onSubmit={searchJobs}
            >

              <span>
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search jobs, companies, skills..."
              />

              <button>
                Search jobs →
              </button>

            </form>


            <div className="gj-home-trust">

              <span>
                ✓ Direct company applications
              </span>

              <span>
                ✓ Curated opportunities
              </span>

              <span>
                ✓ No application fees
              </span>

            </div>

          </div>

        </section>


        {/* LATEST JOBS */}

        <section className="gj-home-section">

          <div className="gj-home-section-head">

            <div>

              <span>
                FRESH OPPORTUNITIES
              </span>

              <h2>
                Worth a look.
              </h2>

            </div>


            <Link to="/jobs">
              Explore all →
            </Link>

          </div>


          <div className="gj-home-jobs">

            {jobs.map(
              (job) => (

                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="gj-home-job"
                >

                  <div className="gj-home-logo">
                    {job.company
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "J"}
                  </div>


                  <div className="gj-home-job-body">

                    <span>
                      {job.category}
                    </span>

                    <h3>
                      {job.role}
                    </h3>

                    <p>
                      {job.company}
                    </p>

                    <small>
                      {job.location}
                      {" · "}
                      {job.type}
                    </small>

                  </div>


                  <b>
                    ↗
                  </b>

                </Link>

              )
            )}

          </div>

        </section>


        {/* CATEGORIES */}

        {categories.length > 0 && (

          <section className="gj-home-section">

            <span>
              EXPLORE BY CATEGORY
            </span>

            <h2>
              Find your lane.
            </h2>


            <div className="gj-category-grid">

              {categories.map(
                ([category, count]) => (

                  <button
                    key={category}
                    onClick={() =>
                      navigate(
                        `/jobs?category=${encodeURIComponent(
                          category
                        )}`
                      )
                    }
                  >

                    <strong>
                      {category}
                    </strong>

                    <span>
                      {count}{" "}
                      {count === 1
                        ? "opening"
                        : "openings"}{" "}
                      →
                    </span>

                  </button>

                )
              )}

            </div>

          </section>

        )}


        {/* HOW IT WORKS */}

        <section className="gj-how">

          <div>

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Simple by design.
            </h2>

          </div>


          <div className="gj-how-grid">

            <article>

              <b>
                01
              </b>

              <h3>
                Discover
              </h3>

              <p>
                Search and filter
                opportunities that match
                what you're looking for.
              </p>

            </article>


            <article>

              <b>
                02
              </b>

              <h3>
                Review
              </h3>

              <p>
                See the role, requirements,
                company and application
                details.
              </p>

            </article>


            <article>

              <b>
                03
              </b>

              <h3>
                Apply
              </h3>

              <p>
                Continue directly to the
                company's original
                application page.
              </p>

            </article>

          </div>

        </section>


        {/* CTA */}

        <section className="gj-home-cta">

          <span>
            YOUR NEXT MOVE
          </span>

          <h2>
            Don't wait for the
            <br />
            perfect moment.
          </h2>

          <Link to="/jobs">
            Find your next opportunity →
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Home;