import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function WordPressDev() {
  useEffect(() => {
    updateSeo({
      title: 'WordPress Development - Kognivex',
      description: 'Custom WordPress development services including theme engineering, plugin development, and performance optimization.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>CMS • Custom Themes • Speed</div>
              <h1 className={styles.title}>High-performance WordPress solutions for modern brands</h1>
              <p className={styles.subtitle}>
                We go beyond templates. We build custom-engineered WordPress themes and plugins 
                tailored for speed, security, and effortless content management.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Talk to a WP Expert
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="WordPress Development"
                src="/wordpress_custom_development_1777891937942.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>WordPress Engineered for Performance</h2>
          <p className={styles.lead}>
            Don't settle for slow, bloated sites. Our WordPress solutions focus on clean code, 
            optimized databases, and superior Core Web Vitals.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Custom Theme Dev</h3>
              <p className={styles.cardText}>Unique, lightweight themes built from scratch—no heavy page builders required.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Plugin Engineering</h3>
              <p className={styles.cardText}>Custom functionality built to your exact specifications without site-slowing bloat.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Headless WordPress</h3>
              <p className={styles.cardText}>Using WordPress as a back-end CMS with a fast React or Next.js front-end.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>WooCommerce Expert</h3>
              <p className={styles.cardText}>Complex e-commerce stores integrated with custom payment and shipping logic.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>WP Security Hardening</h3>
              <p className={styles.cardText}>Enterprise-grade security measures to protect your content and user data.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Speed Optimization</h3>
              <p className={styles.cardText}>Advanced caching, CDN integration, and asset optimization for &lt;1s load times.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Our WP Development Workflow</h2>
          <p className={styles.lead}>
            We combine the flexibility of WordPress with the rigor of modern software engineering.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Discovery</h3>
              <p className={styles.cardText}>Analyzing your content needs and performance requirements.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Architecture</h3>
              <p className={styles.cardText}>Defining custom post types, taxonomies, and database structures.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Code Build</h3>
              <p className={styles.cardText}>Writing clean, PHP-compliant code for themes and specialized plugins.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Launch</h3>
              <p className={styles.cardText}>Deployment with staging environments and continuous monitoring.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['PHP', 'MySQL', 'JavaScript', 'REST API', 'WooCommerce', 'Gutenberg', 'Elementor', 'SEO Ready'].map(
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
            <h2 className={styles.h2}>Transform your WordPress experience</h2>
            <p className={styles.lead}>
              Partner with Kognivex to build a WordPress site that actually performs.
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

export default WordPressDev;
