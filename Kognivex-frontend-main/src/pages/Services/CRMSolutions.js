import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function CRMSolutions() {
  useEffect(() => {
    updateSeo({
      title: 'CRM Solutions - Kognivex',
      description: 'Custom CRM systems designed to streamline sales, marketing, and customer support for growing enterprises.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>CRM • Sales • Automation</div>
              <h1 className={styles.title}>Relationship management engineered for growth</h1>
              <p className={styles.subtitle}>
                We build custom CRM solutions that centralize your data, automate repetitive tasks, 
                and provide actionable insights into your customer journey.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Talk to a CRM Expert
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="CRM System"
                src="/crm_system_dashboard_1777891452262.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Operational Efficiency</h2>
          <p className={styles.lead}>
            Stop fighting with spreadsheets. Our custom CRM systems are built to fit your specific workflow, 
            ensuring your team spends more time closing deals and less time entering data.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Sales Automation</h3>
              <p className={styles.cardText}>Pipeline tracking, lead scoring, and automated follow-ups to keep your sales cycle moving.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Customer Insights</h3>
              <p className={styles.cardText}>360-degree views of customer interactions, history, and preferences in one place.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Marketing Integration</h3>
              <p className={styles.cardText}>Connect your CRM with marketing tools for seamless campaign tracking and ROI analysis.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Support Ticketing</h3>
              <p className={styles.cardText}>Integrated helpdesk systems to ensure every customer inquiry is resolved efficiently.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Custom Reporting</h3>
              <p className={styles.cardText}>Real-time dashboards and automated reports that help you make data-driven decisions.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Cloud Security</h3>
              <p className={styles.cardText}>Role-based access controls and encrypted data storage to keep your client info safe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Strategic Implementation</h2>
          <p className={styles.lead}>
            We don't just provide software; we provide a competitive advantage through strategic data management.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Workflow Audit</h3>
              <p className={styles.cardText}>We map your existing processes to identify bottlenecks and automation opportunities.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Custom Design</h3>
              <p className={styles.cardText}>Building a platform that speaks your business language and fits your team's needs.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Data Migration</h3>
              <p className={styles.cardText}>Safe, clean transfer of your existing data from legacy systems to your new CRM.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Training</h3>
              <p className={styles.cardText}>Ensuring your team is fully equipped to leverage the power of their new system.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['Salesforce', 'Python', 'Node.js', 'PostgreSQL', 'AWS', 'Automation', 'BI Tools', 'API First'].map(
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
            <h2 className={styles.h2}>Transform your customer relationships today</h2>
            <p className={styles.lead}>
              Partner with Kognivex to build a CRM that actually works for your business.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Get a Quote
              </Link>
              <Link className={styles.secondaryBtn} to="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CRMSolutions;
