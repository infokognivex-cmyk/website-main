import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function WebDevelopment() {
  useEffect(() => {
    updateSeo({
      title: 'Web Development - Kognivex',
      description:
        'High-performance web applications engineered for scalability, reliability, and measurable business outcomes.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Web Development • Performance • Scale</div>
              <h1 className={styles.title}>Web applications that grow with your business</h1>
              <p className={styles.subtitle}>
                We build modern web platforms—marketing sites, dashboards, and SaaS products—optimized for
                speed, security, and long‑term maintainability. Your product stays reliable as usage and complexity
                increase.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Talk to an engineer
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="Web development"
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Business-focused engineering</h2>
          <p className={styles.lead}>
            Great web products are not “just UI”—they are systems. We design for conversion, retention, and internal
            efficiency while keeping architecture clean enough to ship faster month after month.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>SaaS & customer portals</h3>
              <p className={styles.cardText}>Role-based access, billing-ready flows, and scalable data models.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Admin dashboards</h3>
              <p className={styles.cardText}>Reliable CRUD, search/filtering, audit-friendly workflows, and UX clarity.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Performance & SEO</h3>
              <p className={styles.cardText}>Faster pages, better Core Web Vitals, and search visibility that converts.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Secure by default</h3>
              <p className={styles.cardText}>JWT auth, validation, rate limiting, and secure file handling.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Scalable APIs</h3>
              <p className={styles.cardText}>Clean REST design, consistent responses, and predictable error handling.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Maintainable delivery</h3>
              <p className={styles.cardText}>Clear structure, reusable components, and conventions your team can extend.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Our development process</h2>
          <p className={styles.lead}>
            We keep momentum high while reducing risk with short feedback loops and clear milestones.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Discovery</h3>
              <p className={styles.cardText}>Requirements, constraints, and success metrics aligned with business goals.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Architecture</h3>
              <p className={styles.cardText}>Data model, API contract, and system boundaries designed for change.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Build</h3>
              <p className={styles.cardText}>Fast iterations with QA checkpoints, staging deploys, and measurable progress.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Launch & optimize</h3>
              <p className={styles.cardText}>Monitoring, performance tuning, and continuous improvements post-release.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Swagger', 'AWS / Vercel', 'CI-friendly structure'].map(
              (item) => (
                <span key={item} className={styles.pill}>
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.finalCard}>
            <h2 className={styles.h2}>Ready to build a scalable web platform?</h2>
            <p className={styles.lead}>
              Tell us what you’re building. We’ll propose the fastest path to production without sacrificing quality.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Start a project
              </Link>
              <Link className={styles.secondaryBtn} to="/services">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WebDevelopment;

