import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function EcommerceDev() {
  useEffect(() => {
    updateSeo({
      title: 'E-commerce Development - Kognivex',
      description: 'Scalable online stores and marketplaces engineered for performance, security, and conversion.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Retail • Commerce • Conversion</div>
              <h1 className={styles.title}>Scalable commerce platforms for global brands</h1>
              <p className={styles.subtitle}>
                We build high-performance e-commerce stores and custom marketplaces optimized for 
                seamless user journeys and maximum conversion rates.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Talk to a Retail Expert
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="E-commerce Analytics"
                src="/ecommerce_store_analytics_1777891553507.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Engineered for Sales</h2>
          <p className={styles.lead}>
            Our commerce solutions focus on speed and trust—ensuring your customers enjoy 
            a frictionless shopping experience on any device.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Custom Storefronts</h3>
              <p className={styles.cardText}>Tailored UI/UX designed to match your brand and optimize the path to purchase.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Multi-Platform Sync</h3>
              <p className={styles.cardText}>Integrate Shopify, Magento, or WooCommerce with your internal inventory and ERP.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Secure Payments</h3>
              <p className={styles.cardText}>PCI-compliant integrations with Stripe, PayPal, and international gateways.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Inventory Management</h3>
              <p className={styles.cardText}>Real-time stock tracking, SKU management, and automated restocking alerts.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Mobile Commerce</h3>
              <p className={styles.cardText}>Progressive Web Apps (PWA) and native mobile shopping experiences.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Performance SEO</h3>
              <p className={styles.cardText}>Fast load times and SEO-ready architecture to drive organic traffic and sales.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>The Path to Conversion</h2>
          <p className={styles.lead}>
            We combine data-driven design with robust engineering to build stores that actually sell.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Strategy</h3>
              <p className={styles.cardText}>Defining your target audience, product catalog structure, and growth goals.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>UX Design</h3>
              <p className={styles.cardText}>Creating intuitive navigation, search, and checkout flows optimized for mobile.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Development</h3>
              <p className={styles.cardText}>Building a scalable, secure back-end and a fast, responsive front-end storefront.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Optimization</h3>
              <p className={styles.cardText}>Continuous A/B testing and performance tuning to improve conversion over time.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['Shopify', 'Magento', 'WooCommerce', 'React', 'Node.js', 'Stripe', 'Redis', 'Analytics'].map(
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
            <h2 className={styles.h2}>Ready to launch your online store?</h2>
            <p className={styles.lead}>
              Partner with Kognivex to build a commerce platform that scales with your ambition.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Start Selling
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

export default EcommerceDev;
