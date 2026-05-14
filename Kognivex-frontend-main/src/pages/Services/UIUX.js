import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function UIUX() {
  useEffect(() => {
    updateSeo({
      title: 'UI/UX Design - Kognivex',
      description:
        'User-centered UI/UX that improves conversion, reduces friction, and makes complex workflows feel simple.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>UI/UX • Conversion • Clarity</div>
              <h1 className={styles.title}>Design that turns complexity into confidence</h1>
              <p className={styles.subtitle}>
                We create interfaces that are easy to use, consistent across devices, and aligned with how users
                actually work. The result: fewer support tickets, higher conversion, and faster onboarding.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Design a new experience
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Review your current UX
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="UI and UX design"
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=70"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>What we optimize for</h2>
          <p className={styles.lead}>
            Beautiful visuals matter, but outcomes matter more. We design for usability, accessibility, and business
            KPIs—so your product is easier to adopt and easier to scale.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Clear information architecture</h3>
              <p className={styles.cardText}>Navigation and content structure that reduces cognitive load.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Conversion-ready flows</h3>
              <p className={styles.cardText}>Frictionless onboarding, signup, checkout, and lead funnels.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Design systems</h3>
              <p className={styles.cardText}>Reusable components that keep teams consistent as the product grows.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Accessibility & standards</h3>
              <p className={styles.cardText}>Inclusive experiences aligned with a11y best practices.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Admin UX that works</h3>
              <p className={styles.cardText}>Tables, filters, forms, and states that feel clean and reliable.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Mobile-first responsiveness</h3>
              <p className={styles.cardText}>Layouts that adapt without breaking hierarchy or readability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Design process</h2>
          <p className={styles.lead}>
            We work in short cycles so stakeholders get fast visibility and teams can ship confidently.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Research</h3>
              <p className={styles.cardText}>Understand users, goals, constraints, and pain points.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>Wireframes</h3>
              <p className={styles.cardText}>Define structure and flows before visuals—faster decisions.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>UI system</h3>
              <p className={styles.cardText}>Components, states, and tokens to scale design across screens.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Handoff</h3>
              <p className={styles.cardText}>Specs and assets ready for implementation with minimal ambiguity.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['Figma', 'Component libraries', 'Design tokens', 'Accessibility', 'UX writing', 'Responsive layouts'].map(
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
            <h2 className={styles.h2}>Upgrade your product experience</h2>
            <p className={styles.lead}>
              If your UI feels inconsistent or your workflows are hard to use, we’ll redesign and modernize them end‑to‑end.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryBtn} to="/get-quote">
                Get a UX plan
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

export default UIUX;

