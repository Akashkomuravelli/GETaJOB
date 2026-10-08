import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScrollReveal from "../components/ScrollReveal";

function Categories() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("category")
      .eq("is_active", true);

    if (!error) {
      setJobs(data || []);
    }

    setLoading(false);
  }

  const categoryMap = {};

  jobs.forEach((job) => {
    const category = job.category || "Other";

    categoryMap[category] =
      (categoryMap[category] || 0) + 1;
  });

  const categories = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="gj-page">
      <section className="gj-page-hero">
        <ScrollReveal>
          <span>CATEGORIES</span>

          <h1>
            Find the right
            <br />
            <em>career path.</em>
          </h1>

          <p>
            Browse opportunities by category and find roles aligned with
            your skills, interests, and career goals.
          </p>
        </ScrollReveal>
      </section>

      <section className="gj-page-content">
        {loading ? (
          <div className="gj-empty-state">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <ScrollReveal>
            <div className="gj-empty-state">
              <h2>No categories yet</h2>
              <p>
                Categories will appear when jobs are published.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="gj-category-page-grid">
            {categories.map(([category, count], index) => (
              <ScrollReveal
                key={category}
                delay={index * 60}
              >
                <Link
                  to={`/jobs?search=${encodeURIComponent(category)}`}
                  className="gj-category-page-card"
                >
                  <div className="gj-category-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3>{category}</h3>

                    <p>
                      {count}{" "}
                      {count === 1 ? "opportunity" : "opportunities"}
                    </p>
                  </div>

                  <span>→</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Categories;