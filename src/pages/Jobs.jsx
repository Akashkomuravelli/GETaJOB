import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import { supabase } from "../lib/supabase";

function Jobs() {
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [location, setLocation] = useState("All");
  const [category, setCategory] =
  useState(
    searchParams.get("category") ||
      "All"
  );
  const [experience, setExperience] = useState("All");
  const [type, setType] = useState("All");

  // =====================================================
  // FETCH JOBS
  // =====================================================

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("posted_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
      return;
    }

    const formattedJobs = (data || []).map((job) => ({
      id: job.id,
      company: job.company,
      role: job.role,
      location: job.location,
      type: job.type,
      category: job.category,
      experience: job.experience,
      description: job.description,
      skills: job.skills || [],
      applyUrl: job.apply_url,
      logo: job.company?.charAt(0)?.toUpperCase() || "J",
      posted: formatPostedDate(job.posted_at),
    }));

    setJobs(formattedJobs);
    setLoading(false);
  }

  // =====================================================
  // DATE FORMAT
  // =====================================================

  function formatPostedDate(date) {
    if (!date) return "Recently";

    const now = new Date();
    const posted = new Date(date);

    const diffHours = Math.floor(
      (now - posted) / (1000 * 60 * 60)
    );

    if (diffHours < 1) {
      return "Just now";
    }

    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 1) {
      return "1 day ago";
    }

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    }

    return "Recently";
  }

  // =====================================================
  // SEARCH + FILTERS
  // =====================================================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchableText = [
        job.role,
        job.company,
        job.category,
        job.location,
        ...(job.skills || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search ||
        searchableText.includes(search.toLowerCase());

      const matchesLocation =
        location === "All" ||
        job.location
          .toLowerCase()
          .includes(location.toLowerCase());

      const matchesCategory =
        category === "All" ||
        job.category === category;

      const matchesExperience =
        experience === "All" ||
        job.experience === experience;

      const matchesType =
        type === "All" ||
        job.type === type;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesExperience &&
        matchesType
      );
    });
  }, [
    jobs,
    search,
    location,
    category,
    experience,
    type,
  ]);

  // =====================================================
// =====================================================
// SCROLL ANIMATION
// =====================================================

useEffect(() => {
  let frame = null;

  function animateCards() {
    const cards = document.querySelectorAll(".job-card-wrapper");

    const viewportHeight = window.innerHeight;

    cards.forEach((card) => {
      // Get the card's current position
      const rect = card.getBoundingClientRect();

      // Calculate where the card is relative to viewport
      const distanceFromCenter =
        rect.top + rect.height / 2 - viewportHeight / 2;

      // Convert to -1 → 1 range
      let progress =
        distanceFromCenter / (viewportHeight * 0.75);

      progress = Math.max(-1, Math.min(1, progress));

      /*
       * CARD MOTION
       *
       * Card below center:
       *   starts lower
       *   moves upward as user scrolls
       *
       * Card at center:
       *   normal position
       *
       * Card above center:
       *   moves upward
       */

      const translateY = progress * 80;

      const scale =
        1 - Math.abs(progress) * 0.04;

      const opacity =
        1 - Math.abs(progress) * 0.2;

      card.style.setProperty(
        "transform",
        `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        "important"
      );

      card.style.setProperty(
        "opacity",
        opacity,
        "important"
      );
    });

    frame = null;
  }

  function requestAnimation() {
    if (frame === null) {
      frame = requestAnimationFrame(animateCards);
    }
  }

  // Run once
  requestAnimation();

  // Run while scrolling
  window.addEventListener(
    "scroll",
    requestAnimation,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestAnimation
  );

  return () => {
    window.removeEventListener(
      "scroll",
      requestAnimation
    );

    window.removeEventListener(
      "resize",
      requestAnimation
    );

    if (frame !== null) {
      cancelAnimationFrame(frame);
    }
  };
}, [filteredJobs.length]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  function clearFilters() {
    setSearch("");
    setLocation("All");
    setCategory("All");
    setExperience("All");
    setType("All");
  }

  // =====================================================
  // FILTER OPTIONS
  // =====================================================

  const locations = [
    "All",
    ...new Set(
      jobs.map((job) => job.location)
    ),
  ];

  const categories = [
    "All",
    ...new Set(
      jobs.map((job) => job.category)
    ),
  ];

  const experiences = [
    "All",
    ...new Set(
      jobs.map((job) => job.experience)
    ),
  ];

  const types = [
    "All",
    ...new Set(
      jobs.map((job) => job.type)
    ),
  ];

  const hasFilters =
    search ||
    location !== "All" ||
    category !== "All" ||
    experience !== "All" ||
    type !== "All";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="app">

      {/* NAVBAR */}

      <div className="jobs-navbar">
        <Navbar />
      </div>

      <main className="jobs-page">

        {/* BACKGROUND */}

        <div className="jobs-orb jobs-orb-one" />
        <div className="jobs-orb jobs-orb-two" />

        {/* =================================================
            HERO
        ================================================= */}

        <section className="jobs-page-header">

          <div className="hero-content">

            <div className="today-badge">
              <span className="today-dot" />
              DO IT TODAY
            </div>

            <h1>
              Find work that
              <br />
              <span>
                moves you forward.
              </span>
            </h1>

            <p className="jobs-hero-description">
              Dream big, apply fast, get hired. 
              Turn your passion into a paycheck and land the role you were built for.
            </p>

            <div className="jobs-search-box">

              <span className="jobs-search-icon">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search jobs, companies, skills..."
                aria-label="Search jobs"
              />

              {search && (
                <button
                  type="button"
                  className="jobs-search-clear"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>

          </div>

          <div className="hero-side-mark">
            <span>GETaJOB</span>
            <span>
              SCROLL TO EXPLORE
            </span>
          </div>

        </section>

        {/* =================================================
            JOB SECTION
        ================================================= */}

        <section className="jobs-section">

          {/* SECTION HEADER */}

          <div
            className="jobs-section-heading"
            data-scroll-reveal
          >

            <div>

              <span className="section-kicker">
                CURATED OPPORTUNITIES
              </span>

              <h2>
                Find something worth your time.
              </h2>

              <p className="section-description">
                Real companies. Real openings. Direct
                applications.
              </p>

            </div>

            {!loading && (
              <div className="results-pill">
                <span />

                {filteredJobs.length}{" "}

                {filteredJobs.length === 1
                  ? "result"
                  : "results"}
              </div>
            )}

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div
            className="job-filters"
            data-scroll-reveal
          >

            <span className="filter-label">
              FILTER
            </span>

            {/* LOCATION */}

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >
              {locations.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All locations"
                    : item}
                </option>
              ))}
            </select>

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All categories"
                    : item}
                </option>
              ))}
            </select>

            {/* EXPERIENCE */}

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
            >
              {experiences.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All experience"
                    : item}
                </option>
              ))}
            </select>

            {/* TYPE */}

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              {types.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All job types"
                    : item}
                </option>
              ))}
            </select>

            {/* RESET */}

            {hasFilters && (
              <button
                type="button"
                className="clear-filters"
                onClick={clearFilters}
              >
                Reset
              </button>
            )}

          </div>

          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div
            className="results-header"
            data-scroll-reveal
          >

            <span>
              {loading
                ? "Finding opportunities..."
                : `${filteredJobs.length} opportunities`}
            </span>

            {!loading &&
              filteredJobs.length > 0 && (
                <span className="results-newest">
                  Newest first
                </span>
              )}

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="jobs-loading-grid">

              {[1, 2, 3, 4].map((item) => (

                <div
                  className="job-skeleton"
                  key={item}
                >

                  <div className="skeleton-line skeleton-small" />

                  <div className="skeleton-line skeleton-title" />

                  <div className="skeleton-line" />

                  <div className="skeleton-line skeleton-short" />

                  <div className="skeleton-bottom" />

                </div>

              ))}

            </div>

          ) : filteredJobs.length > 0 ? (

            /* =================================================
               JOB GRID
            ================================================= */

            <div className="job-grid">

              {filteredJobs.map((job) => (

                <div
                  className="job-card-wrapper"
                  data-scroll-reveal
                  key={job.id}
                >

                  <JobCard job={job} />

                </div>

              ))}

            </div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div
              className="no-results"
              data-scroll-reveal
            >

              <div className="no-results-icon">
                ⌕
              </div>

              <h3>
                Nothing matched your search.
              </h3>

              <p>
                Try another keyword or remove a filter.
              </p>

              <button
                type="button"
                className="clear-filters"
                onClick={clearFilters}
              >
                Clear filters
              </button>

            </div>

          )}

        </section>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        {!loading && jobs.length > 0 && (

          <section
            className="jobs-bottom-cta"
            data-scroll-reveal
          >

            <div>

              <span className="section-kicker">
                YOUR NEXT MOVE
              </span>

              <h2>
                Don't wait for the
                <br />
                perfect moment.
              </h2>

              <p>
                Find something interesting.
                Take the next step.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Back to top ↑
            </button>

          </section>

        )}

      </main>

    </div>
  );
}

export default Jobs;