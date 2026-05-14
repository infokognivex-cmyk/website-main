import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function SaaSProductDev() {
  useEffect(() => {
    updateSeo({
      title: 'SaaS Product Development - Kognivex',
      description: 'Full-cycle SaaS product development, from architecture and multi-tenancy to cloud scaling and security.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>SaaS • Cloud • Multi-tenancy</div>
              <h1 className={styles.title}>Building the next generation of SaaS platforms</h1>
              <p className={styles.subtitle}>
                We specialize in architecting and building multi-tenant SaaS products that are 
                scalable, secure, and ready for global delivery.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Consult a SaaS Architect
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="SaaS Architecture"
                src="/saas_platform_architecture_1777891586641.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Scalable Software as a Service</h2>
          <p className={styles.lead}>
            SaaS development requires a unique focus on multi-tenant architecture, data isolation, 
            and subscription-based business logic. We excel at all three.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Multi-Tenant Design</h3>
              <p className={styles.cardText}>Shared infrastructure with strict logical data isolation for every customer.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Subscription Billing</h3>
              <p className={styles.cardText}>Integrated Stripe/Chargebee for recurring billing, tiered plans, and usage-based pricing.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Cloud Native Scaling</h3>
              <p className={styles.cardText}>Autoscaling clusters that grow dynamically with your user base (Kubernetes/AWS).</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Advanced Security</h3>
              <p className={styles.cardText}>SSO/SAML integration, data encryption at rest, and comprehensive audit logs.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>API-First Products</h3>
              <p className={styles.cardText}>Build ecosystems around your SaaS with robust public-facing APIs and documentation.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Admin Controls</h3>
              <p className={styles.cardText}>Powerful internal dashboards to manage tenants, users, and system performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>The SaaS Lifecycle</h2>
          <p className={styles.lead}>
            We partner with you from MVP through series funding and global scaling.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Architecture</h3>
              <p className={styles.cardText}>Defining the multi-tenant data model and cloud infrastructure strategy.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>MVP Build</h3>
              <p className={styles.cardText}>Focusing on core value propositions to get your product to market fast.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Cloud Deployment</h3>
              <p className={styles.cardText}>Setting up CI/CD pipelines and production-ready environments on AWS/Azure.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Scaling</h3>
              <p className={styles.cardText}>Continuous monitoring and performance tuning as your tenant count increases.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['React', 'Node.js', 'K8s', 'AWS', 'PostgreSQL', 'Redis', 'Stripe', 'Docker'].map(
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
            <h2 className={styles.h2}>Ready to build your SaaS empire?</h2>
            <p className={styles.lead}>
              Partner with the SaaS engineering experts at Kognivex.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Build my SaaS
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

export default SaaSProductDev;
