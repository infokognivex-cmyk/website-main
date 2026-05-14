import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function Maintenance() {
  useEffect(() => {
    updateSeo({
      title: 'Maintenance & Support - Kognivex',
      description: '24/7 technical support, system monitoring, and continuous maintenance to ensure your software remains secure and high-performing.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Support • Reliability • Security</div>
              <h1 className={styles.title}>Ensuring your systems stay operational 24/7</h1>
              <p className={styles.subtitle}>
                We provide comprehensive technical support and continuous maintenance to ensure your 
                software platforms remain fast, secure, and always available.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Speak to Support
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="System Monitoring"
                src="/software_maintenance_monitoring_1777891619573.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Proactive System Health</h2>
          <p className={styles.lead}>
            We don't just wait for things to break. Our team monitors your infrastructure proactively 
            to catch and resolve issues before they affect your users.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>24/7 Monitoring</h3>
              <p className={styles.cardText}>Real-time tracking of server health, uptime, and performance metrics.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Security Patching</h3>
              <p className={styles.cardText}>Regular updates to core libraries and frameworks to protect against vulnerabilities.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Bug Fixing</h3>
              <p className={styles.cardText}>Rapid response teams to identify, reproduce, and resolve technical issues.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Cloud Optimization</h3>
              <p className={styles.cardText}>Continuous tuning of your AWS/Azure environments to reduce costs and improve speed.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Backups & Recovery</h3>
              <p className={styles.cardText}>Automated daily backups and verified disaster recovery procedures for peace of mind.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Tech Debt Management</h3>
              <p className={styles.cardText}>Continuous refactoring and updates to ensure your codebase stays modern and maintainable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>The Reliability Framework</h2>
          <p className={styles.lead}>
            We provide clear Service Level Agreements (SLAs) tailored to your business criticality.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Integration</h3>
              <p className={styles.cardText}>Setting up monitoring agents and connecting your system to our support dashboard.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Monitoring</h3>
              <p className={styles.cardText}>Continuous oversight of your application, database, and infrastructure health.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Maintenance</h3>
              <p className={styles.cardText}>Scheduled updates, patches, and optimizations performed during low-traffic windows.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Support</h3>
              <p className={styles.cardText}>On-demand technical assistance and bug resolution for your peace of mind.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['Monitoring', 'Security', 'Cloud', 'Backup', 'Patching', 'Refactoring', 'SLA', '24/7 Support'].map(
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
            <h2 className={styles.h2}>Keep your systems running at peak performance</h2>
            <p className={styles.lead}>
              Partner with Kognivex for reliable software maintenance and 24/7 support.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Get a Quote
              </Link>
              <Link className={styles.secondaryBtn} to="/services">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Maintenance;
