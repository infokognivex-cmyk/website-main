import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './ServicePage.module.css';

function SchoolSystems() {
  useEffect(() => {
    updateSeo({
      title: 'School Systems - Kognivex',
      description: 'Comprehensive educational management systems to streamline administration, academics, and communication.'
    });
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>Education • Administration • Tech</div>
              <h1 className={styles.title}>Empowering institutions with smart management</h1>
              <p className={styles.subtitle}>
                We build end-to-end School Management Systems (SMS) that bridge the gap between 
                administration, teachers, students, and parents.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.primaryBtn} to="/get-quote">
                  Get a quote
                </Link>
                <Link className={styles.secondaryBtn} to="/contact">
                  Schedule a Demo
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="School Management System"
                src="/school_management_portal_1777891487039.png"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Academic Excellence through Technology</h2>
          <p className={styles.lead}>
            Our educational platforms are designed to reduce administrative overhead, allowing 
            educators to focus on what matters most: the students.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Student Information</h3>
              <p className={styles.cardText}>Centralized records for admissions, attendance, grades, and behavioral tracking.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Faculty Management</h3>
              <p className={styles.cardText}>Streamline lesson planning, staff scheduling, and performance reviews.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Fee Management</h3>
              <p className={styles.cardText}>Automated invoicing, online payments, and comprehensive financial reporting.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Exam & Grading</h3>
              <p className={styles.cardText}>Digital gradebooks, automated report card generation, and exam scheduling.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Communication Hub</h3>
              <p className={styles.cardText}>Integrated SMS, email, and portal notifications for parents and students.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Inventory & Library</h3>
              <p className={styles.cardText}>Digital management of school assets, books, and library resources.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Modern Learning Ecosystem</h2>
          <p className={styles.lead}>
            Built on secure, scalable architecture to handle the data needs of modern educational institutions.
          </p>

          <div className={styles.process}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.cardTitle}>Needs Analysis</h3>
              <p className={styles.cardText}>Understanding the unique administrative and academic requirements of your school.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.cardTitle}>System Setup</h3>
              <p className={styles.cardText}>Configuring modules for admissions, academics, and finances tailored to your rules.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.cardTitle}>Migration</h3>
              <p className={styles.cardText}>Transitioning legacy records to your new digital ecosystem safely.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3 className={styles.cardTitle}>Support</h3>
              <p className={styles.cardText}>Ongoing technical support and training for staff and administrators.</p>
            </div>
          </div>

          <div className={styles.stack}>
            {['PHP', 'Laravel', 'MySQL', 'React', 'AWS', 'Security', 'Reporting', 'Scalability'].map(
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
            <h2 className={styles.h2}>Ready to digitize your institution?</h2>
            <p className={styles.lead}>
              Join the future of education with Kognivex's school management solutions.
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

export default SchoolSystems;
