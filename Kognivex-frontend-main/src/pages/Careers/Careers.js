import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobService from '../../services/jobService';
import styles from './Careers.module.css';
import {
  FaRocket, FaUsers, FaLightbulb, FaBriefcase, FaGraduationCap, FaHeart, FaChevronRight, FaShieldAlt,
  FaCode, FaPaintBrush, FaCloud, FaChartLine
} from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';

function Careers() {
  const navigate = useNavigate();
  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get Icon component from string
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'code': return FaCode;
      case 'paint-brush': return FaPaintBrush;
      case 'cloud': return FaCloud;
      case 'rocket': return FaRocket;
      case 'users': return FaUsers;
      case 'chart-line': return FaChartLine;
      case 'shield-alt': return FaShieldAlt;
      default: return FaBriefcase;
    }
  };

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const data = await jobService.fetchAllJobs();
        // Only show open positions
        setOpenPositions(data.filter(job => job.status === 'open'));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to static data if API fails or is empty during transition
        setOpenPositions([
          {
            id: 'fallback-1',
            title: "Senior Full Stack Engineer",
            type: "Full-Time",
            location: "Remote / Hyderabad",
            category: "Engineering",
            icon: "code",
            description: "Lead the development of scalable web applications using React, Node.js, and cloud technologies.",
            link: "/contact",
            status: "open"
          },
          {
            id: 'fallback-2',
            title: "UI/UX Product Designer",
            type: "Full-Time",
            location: "Remote",
            category: "Design",
            icon: "paint-brush",
            description: "Craft intuitive, premium user experiences and design systems for next-generation SaaS products.",
            link: "/contact",
            status: "open"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <main className={styles.careersPage}>
      <SEO 
        title="Careers"
        description="Build the future of SaaS and Web 3.0. Join Kognivex and work on cutting-edge software solutions that impact businesses globally."
        keywords="engineering jobs, software developer careers, remote jobs tech, Kognivex careers"
      />
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Build the Future of <span className={styles.highlight}>Software</span> with Us</h1>

            <p>
              Kognivex is looking for visionaries, engineers, and creators who are passionate
              about solving complex problems through elegant code and superior design.
            </p>

          </div>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className={styles.cultureSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Why Join <span className={styles.highlight}>Kognivex?</span></h2>
            <p>We don't just build products; we build careers and empower individuals to lead the next wave of digital transformation.</p>
          </div>

          <div className={styles.cultureGrid}>
            <div className={styles.cultureCard}>
              <div className={styles.iconWrapper}><FaLightbulb /></div>
              <h3>Innovation First</h3>
              <p>Work with the latest tech stacks (React, Node, Go, AWS) and contribute to cutting-edge R&D projects.</p>
            </div>
            <div className={styles.cultureCard}>
              <div className={styles.iconWrapper}><FaUsers /></div>
              <h3>Collaborative DNA</h3>
              <p>Join a team of elite engineers where mentorship and knowledge sharing are part of our core philosophy.</p>
            </div>
            <div className={styles.cultureCard}>
              <div className={styles.iconWrapper}><FaRocket /></div>
              <h3>Accelerated Growth</h3>
              <p>We invest in your career path with clear progression goals, certifications, and leadership opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONS SECTION */}
      <section id="positions" className={styles.positionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Current Openings</h2>
            <p>Ready to make an impact? Explore our current opportunities below.</p>
          </div>

          <div className={styles.positionsList}>
            {loading ? (
              <div className={styles.loading}>Loading opportunities...</div>
            ) : openPositions.length > 0 ? (
              openPositions.map((job, index) => {
                const Icon = getIcon(job.icon);

                return (
                  <div key={job.id || index} className={styles.jobRow}>
                    <div className={styles.jobMain}>
                      <div className={styles.jobIconWrapper}>
                        <Icon />
                      </div>
                      <div className={styles.jobDetails}>
                        <div className={styles.jobHeader}>
                          <span className={styles.jobCategoryBadge}>{job.category}</span>
                          <h3>{job.title}</h3>
                        </div>
                        <p className={styles.jobDesc}>{job.description}</p>
                        <div className={styles.jobTags}>
                          <span className={styles.tag}><FaBriefcase /> {job.type}</span>
                          <span className={styles.tag}><FaUsers /> {job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.jobAction}>
                      <button onClick={() => job.link.startsWith('http') ? window.open(job.link, '_blank') : navigate(job.link)} className={styles.applyBtn}>
                        <span className={styles.btnText}>Apply Role</span>
                        <span className={styles.btnIcon}><FaChevronRight /></span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <p>We don't have any open positions at the moment. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PERKS SECTION */}
      <section className={styles.perksSection}>
        <div className={styles.container}>
          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaGraduationCap /></div>
              <h4>Learning Budget</h4>
            </div>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaHeart /></div>
              <h4>Health & Wellness</h4>
            </div>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaRocket /></div>
              <h4>Flexible Hours</h4>
            </div>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaShieldAlt /></div>
              <h4>Global Impact</h4>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Careers;