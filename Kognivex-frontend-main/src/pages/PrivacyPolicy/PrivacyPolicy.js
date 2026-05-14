import React, { useEffect } from 'react';
import { updateSeo } from '../../utils/seoHelper';
import styles from './PrivacyPolicy.module.css';

function PrivacyPolicy() {
  useEffect(() => {
    updateSeo({
      title: 'Privacy Policy - Kognivex',
      description: 'Understand how Kognivex collects, protects, and uses your personal information. Read our professional privacy policy.',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.legalPage}>
      <header className={styles.hero}>
        <div className={styles.container_hero}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: April 27, 2026</p>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Kognivex. We are committed to protecting your personal information and your right to privacy. 
            If you have any questions or concerns about our policy or our practices with regards to your personal information, 
            please contact us at privacy@kognivex.com.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services.</p>
          <ul>
            <li><strong>Personal Information:</strong> We collect names, email addresses, phone numbers, and other similar contact data.</li>
            <li><strong>Credentials:</strong> We collect authentication data used for account access. This data is always securely encrypted and never stored as plain text.</li>
            <li><strong>Automatic Data:</strong> We automatically collect certain information when you visit, use, or navigate our website. This includes IP addresses, browser and device characteristics, and usage behavior.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. How We Use Your Data</h2>
          <p>We use personal information collected via our Services for a variety of business purposes described below:</p>
          <ul>
            <li><strong>Improve Services:</strong> To analyze usage trends and enhance the user experience.</li>
            <li><strong>Communication:</strong> To send you product updates, security alerts, and feature information.</li>
            <li><strong>Analytics:</strong> For performance tracking and monitoring the effectiveness of our marketing campaigns.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Legal Basis for Processing</h2>
          <p>
            We process your personal information based on specific legal grounds:
          </p>
          <ul>
            <li><strong>Consent:</strong> When you have given us clear consent.</li>
            <li><strong>Contractual Necessity:</strong> To fulfill our obligations under a contract with you.</li>
            <li><strong>Legal Obligations:</strong> Where we are required to comply with law requirements.</li>
            <li><strong>Legitimate Interests:</strong> For our legitimate business interests.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Data Protection</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. 
            However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Third-Party Services</h2>
          <p>
            We may share your data with trusted third-party vendors who perform services for us or on our behalf 
            and require access to such information to do that work.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Cookies Usage</h2>
          <p>
            We may use cookies and similar tracking technologies to access or store information. You can set your browser to refuse all or some browser cookies.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have the right to request access, correction, deletion, or restriction of your personal data.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Data Retention</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Children’s Privacy</h2>
          <p>
            We do not knowingly solicit data from or market to children under 18 years of age.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Compliance</h2>
          <p>
            We comply with applicable data protection laws, including the **India’s Digital Personal Data Protection Act, 2023**.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Contact Information</h2>
          <p>
            If you have questions or comments about this policy, you may contact our team at:
          </p>
          <div className={styles.contactCard}>
            <p><strong>Kognivex IT Solutions</strong></p>
            <p>Hyderabad, Telangana, India</p>
            <p>Email: <a href="mailto:privacy@kognivex.com">privacy@kognivex.com</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
