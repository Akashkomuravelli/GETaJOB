import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

function About() {
  return (
    <div className="gj-page">
      <section className="gj-page-hero">
        <ScrollReveal>
          <span>ABOUT GETaJOB</span>

          <h1>
            A simpler way to
            <br />
            <em>find opportunities.</em>
          </h1>

          <p>
            GETaJOB helps job seekers discover relevant opportunities
            from companies and apply directly through their official
            application websites.
          </p>
        </ScrollReveal>
      </section>

      <section className="gj-about-section">
        <ScrollReveal direction="left">
          <div className="gj-about-panel">
            <span>01</span>

            <h2>
              Discover.
            </h2>

            <p>
              Search and explore curated job opportunities across
              different technologies, industries, experience levels,
              locations, and job types.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={120}>
          <div className="gj-about-panel">
            <span>02</span>

            <h2>
              Compare.
            </h2>

            <p>
              Review job descriptions, requirements, locations,
              experience levels, skills, and other important details
              before deciding where to apply.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={180}>
          <div className="gj-about-panel">
            <span>03</span>

            <h2>
              Apply.
            </h2>

            <p>
              GETaJOB does not replace the employer's application
              system. When you choose a role, you are redirected to
              the original company application page.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="gj-about-values">
        <ScrollReveal>
          <span>OUR APPROACH</span>

          <h2>
            Built around the
            <br />
            job seeker.
          </h2>
        </ScrollReveal>

        <div className="gj-values-grid">
          <ScrollReveal delay={80}>
            <article>
              <strong>01</strong>
              <h3>Simple discovery</h3>
              <p>
                Keep job searching focused and easy to navigate.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <article>
              <strong>02</strong>
              <h3>Useful information</h3>
              <p>
                See the details that matter before applying.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <article>
              <strong>03</strong>
              <h3>Direct applications</h3>
              <p>
                Apply through the employer's original website.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <section className="gj-about-cta">
          <span>READY?</span>

          <h2>
            Your next opportunity
            <br />
            could be one search away.
          </h2>

          <Link to="/jobs">
            Explore Jobs →
          </Link>
        </section>
      </ScrollReveal>
    </div>
  );
}

export default About;