import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScrollReveal from "../components/ScrollReveal";

function Companies() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    const { data, error } = await supabase
      .from("jobs")
      .select("company, role, location, category")
      .eq("is_active", true)
      .order("posted_at", { ascending: false });

    if (!error) {
      setJobs(data || []);
    }

    setLoading(false);
  }

  const companies = Array.from(
    new Map(
      jobs.map((job) => [
        job.company,
        {
          name: job.company,
          jobs: jobs.filter((item) => item.company === job.company),
        },
      ])
    ).values()
  );

  return (
    <div className="gj-page">
      <section className="gj-page-hero">
        <ScrollReveal>
          <span>COMPANIES</span>

          <h1>
            Discover companies
            <br />
            <em>hiring now.</em>
          </h1>

          <p>
            Explore companies with active opportunities on GETaJOB and
            discover roles that match your skills.
          </p>
        </ScrollReveal>
      </section>

      <section className="gj-page-content">
        {loading ? (
          <div className="gj-empty-state">
            Loading companies...
          </div>
        ) : companies.length === 0 ? (
          <ScrollReveal>
            <div className="gj-empty-state">
              <h2>No companies yet</h2>
              <p>
                Companies will appear here when active jobs are published.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="gj-company-grid">
            {companies.map((company, index) => (
              <ScrollReveal
                key={company.name}
                delay={index * 70}
              >
                <Link
                  to={`/jobs?search=${encodeURIComponent(company.name)}`}
                  className="gj-company-card"
                >
                  <div className="gj-company-logo">
                    {company.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{company.name}</h3>

                    <p>
                      {company.jobs.length}{" "}
                      {company.jobs.length === 1 ? "open role" : "open roles"}
                    </p>

                    <small>
                      {company.jobs
                        .slice(0, 2)
                        .map((job) => job.role)
                        .join(" • ")}
                    </small>
                  </div>

                  <span className="gj-company-arrow">→</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Companies;