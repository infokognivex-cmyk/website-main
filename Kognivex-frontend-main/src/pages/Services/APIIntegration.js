import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function APIIntegration() {
  useEffect(() => {
    updateSeo({
      title: 'API Integration - Kognivex',
      description: 'Robust API development and integration services to ensure seamless communication between your software systems.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Integration • Connectivity • Speed</div>
              <h1 className={styles.title}>Connecting your digital ecosystem seamlessly</h1>
              <p className={styles.subtitle}>
                We develop and integrate robust APIs that allow your software systems to communicate, 
                share data, and scale without friction.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Speak to an Architect
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="API Integration"
                src="/api_network_integration_1777891520007.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Unified Technical Infrastructure</h2>
          <p className={styles.lead}>
            Stop operating in silos. We build the bridges between your cloud services, 
            third-party tools, and internal legacy systems.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Custom API Development</h3>
              <p className={styles.cardText}>Building high-performance REST and GraphQL APIs tailored to your data needs.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Third-Party Sync</h3>
              <p className={styles.cardText}>Seamless integration with Stripe, Twilio, AWS, Salesforce, and many more.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Legacy Modernization</h3>
              <p className={styles.cardText}>Wrapping older systems in modern API layers to extend their utility.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Microservices</h3>
              <p className={styles.cardText}>Architecting distributed systems for better reliability and faster deployments.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Secure Gateways</h3>
              <p className={styles.cardText}>Implementing OAuth2, API keys, and rate limiting to protect your endpoints.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Real-time Webhooks</h3>
              <p className={styles.cardText}>Event-driven architecture to keep your systems perfectly synchronized.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Engineering for Connectivity</h2>
          <p className={styles.lead}>
            We prioritize documentation, security, and performance in every integration project.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Mapping</h3>
              <p className={styles.cardText}>Identifying data flow and system requirements for all integration points.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Prototyping</h3>
              <p className={styles.cardText}>Setting up sandboxes and defining API contracts (Swagger/GraphQL schema).</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Execution</h3>
              <p className={styles.cardText}>Developing robust connectors and middleware to handle data transformation.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Testing</h3>
              <p className={styles.cardText}>Extensive load testing and error handling verification across all endpoints.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['REST', 'GraphQL', 'Microservices', 'Node.js', 'Python', 'OAuth2', 'Swagger', 'Docker'].map(
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
            <h2 className={styles.h2}>Connect your world</h2>
            <p className={styles.lead}>
              Let Kognivex handle the complexity of system integration.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Build an API
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

export default APIIntegration;
