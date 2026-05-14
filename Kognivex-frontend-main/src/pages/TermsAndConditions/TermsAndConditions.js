import React, { useEffect } from 'react';
import { updateSeo } from '../../utils/seoHelper';
import styles from '../PrivacyPolicy/PrivacyPolicy.module.css';

function TermsAndConditions() {
  useEffect(() => {
    updateSeo({
      title: 'Terms & Conditions - Kognivex',
      description: 'Review the terms and conditions for using Kognivex services and website. Professional IT service terms for our clients.',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.legalPage}>
      <header className={styles.hero}>
        <div className={styles.container_hero}>
          <h1>Terms & Conditions</h1>
          <p className={styles.lastUpdated}>Last Updated: April 27, 2026</p>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Kognivex. These Terms & Conditions govern your use of our website and the services provided by Kognivex. 
            By accessing or using our Services, you agree to be bound by these terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Acceptance of Terms</h2>
          <p>
            By using our website, you confirm that you accept these Terms & Conditions and that you agree to comply with them.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Services</h2>
          <p>
            Kognivex provides professional IT services including Custom Web Development, SaaS Solutions, 
            and Digital Transformation Services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. User Responsibilities</h2>
          <p>
            Users must provide accurate information, maintain account confidentiality, and not use 
            the platform for any unauthorized or illegal purposes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Intellectual Property</h2>
          <p>
            All content, branding, and materials belong to Kognivex and cannot be reused, 
            reproduced, or distributed without permission.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Payments & Services</h2>
          <p>
            Pricing and payment terms are determined based on specific project scopes 
            and will be agreed upon in individual contracts.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Limitation of Liability</h2>
          <p>
            Kognivex is not liable for indirect or incidental damages arising from 
            the use of our services or website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access for misuse or violation of these Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Third-Party Links</h2>
          <p>
            We are not responsible for the content or privacy practices of external websites 
            linked from our platform.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Changes to Terms</h2>
          <p>
            We may update our Terms at any time. Your continued use of the platform after changes 
            constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Governing Law</h2>
          <p>
            These Terms & Conditions are governed by the laws of **India**. Disputes are subject 
            to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          <div className={styles.contactCard}>
            <p><strong>Kognivex IT Solutions</strong></p>
            <p>Hyderabad, Telangana, India</p>
            <p>Email: <a href="mailto:support@kognivex.com">support@kognivex.com</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TermsAndConditions;
