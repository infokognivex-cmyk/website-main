import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function MobileApps() {
  useEffect(() => {
    updateSeo({
      title: 'Mobile Apps - Kognivex',
      description:
        'Ship reliable, high-performance mobile apps with secure backend integration and a UX that users love.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Mobile Apps • Speed • Reliability</div>
              <h1 className={styles.title}>Mobile apps that feel fast and stay stable</h1>
              <p className={styles.subtitle}>
                We design and build mobile experiences that load quickly, remain responsive under real-world conditions,
                and integrate cleanly with your backend. From MVP to production scale, we keep quality high and iteration
                cycles tight.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Request a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Discuss your app
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="Mobile app development"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=70"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>What we deliver</h2>
          <p className={styles.lead}>
            Mobile success depends on reliability, security, and measurable UX. We build apps that reduce churn, improve
            conversion, and support growth without constant rewrites.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Fast UI & smooth performance</h3>
              <p className={styles.cardText}>Optimized rendering, offline-safe flows, and consistent interactions.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Secure authentication</h3>
              <p className={styles.cardText}>JWT integration, role-based access, and safe session handling.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Backend-ready architecture</h3>
              <p className={styles.cardText}>Clean API contracts and predictable error handling for stability.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Release quality</h3>
              <p className={styles.cardText}>Validation, edge cases, and production checks built into delivery.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Analytics & iteration</h3>
              <p className={styles.cardText}>Instrument events to understand users and ship improvements faster.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Scalable foundations</h3>
              <p className={styles.cardText}>A codebase your team can extend as features and teams grow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Process</h2>
          <p className={styles.lead}>Clear milestones, consistent quality, and fast feedback loops.</p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Scope & UX</h3>
              <p className={styles.cardText}>Define flows, screens, and the experience that drives business goals.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Build core</h3>
              <p className={styles.cardText}>Auth, navigation, data layer, and reusable UI foundation.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Integrate APIs</h3>
              <p className={styles.cardText}>Production-grade networking, retries, and error UX.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Ship & monitor</h3>
              <p className={styles.cardText}>Release readiness, bug triage loop, and performance monitoring.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['React Native', 'Expo', 'REST APIs', 'JWT', 'Secure storage', 'Push-ready structure', 'Analytics-ready'].map(
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
            <h2 className={styles.h2}>Launch a mobile app users keep</h2>
            <p className={styles.lead}>
              Share your idea and timeline. We’ll propose an implementation plan that reduces risk and accelerates launch.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Get started
              </Link>
              <Link className={styles.secondaryBtn} to="/services">
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MobileApps;

