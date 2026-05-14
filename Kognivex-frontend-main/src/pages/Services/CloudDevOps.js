import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function CloudDevOps() {
  useEffect(() => {
    updateSeo({
      title: 'Cloud & DevOps - Kognivex',
      description:
        'Cloud and DevOps foundations for reliable deployments, secure infrastructure, and predictable scaling.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Cloud • DevOps • Reliability</div>
              <h1 className={styles.title}>Infrastructure that scales without drama</h1>
              <p className={styles.subtitle}>
                We help teams ship with confidence—repeatable deployments, secure environments, and monitoring that
                surfaces problems before customers notice. The goal is uptime, speed, and control.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Improve reliability
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Talk DevOps
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="Cloud and DevOps"
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=70"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>What we set up</h2>
          <p className={styles.lead}>
            Strong infrastructure reduces incidents, speeds up delivery, and prevents costly surprises during growth.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Production environments</h3>
              <p className={styles.cardText}>Clear separation of dev/staging/prod with safe secrets management.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>CI/CD pipelines</h3>
              <p className={styles.cardText}>Repeatable deploys, automated checks, and predictable releases.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Observability</h3>
              <p className={styles.cardText}>Logs, metrics, and alerts that help you fix issues quickly.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Scaling strategy</h3>
              <p className={styles.cardText}>Capacity planning and performance baselines for growth.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Security posture</h3>
              <p className={styles.cardText}>Rate limits, headers, access control, and hardened deployments.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Cost control</h3>
              <p className={styles.cardText}>Right-size resources and avoid surprise bills as usage rises.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>How we work</h2>
          <p className={styles.lead}>We start with stability, then optimize for speed and scale.</p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Audit</h3>
              <p className={styles.cardText}>Assess deployment, security, and failure points.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Stabilize</h3>
              <p className={styles.cardText}>Fix critical gaps and set sane defaults.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Automate</h3>
              <p className={styles.cardText}>CI/CD, monitoring, and repeatable environments.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Optimize</h3>
              <p className={styles.cardText}>Performance, reliability, and cost improvements.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['Docker', 'CI/CD', 'Monitoring', 'NGINX basics', 'Secrets management', 'Security headers', 'Scaling playbooks'].map(
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
            <h2 className={styles.h2}>Make deployments predictable</h2>
            <p className={styles.lead}>
              If your releases feel risky or environments drift, we’ll standardize and automate your delivery pipeline.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Plan an upgrade
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

export default CloudDevOps;

