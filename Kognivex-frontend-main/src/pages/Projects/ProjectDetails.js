import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProjectDetails.module.css';
import { FaArrowLeft, FaCheckCircle, FaRocket, FaIndustry } from 'react-icons/fa';
import { updateSeo } from '../../utils/seoHelper';
import projectService from '../../services/projectService';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        // Param id is the slug from URL
        const data = await projectService.fetchProjectBySlug(id);
        
        if (data) {
          setProject(data);
          updateSeo({
            title: `${data.title} - Case Study | Kognivex`,
            description: (data.shortDescription || '').substring(0, 160),
          });
        }
      } catch (error) {
        console.error('Failed to load project details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.container} style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Loading Project Details...</h2>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.container} style={{ textAlign: 'center', padding: '100px 0' }}>
          <h1>🚧 Project Not Found</h1>
          <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
            The case study you are looking for has been moved or is under maintenance.
          </p>
          <Link to="/projects" className={styles.backBtn} style={{ display: 'inline-block', marginTop: '30px' }}>
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  // Fallback data for fields
  const problemStatement = project.projectOverview || "The client was facing severe operational bottlenecks due to outdated legacy systems.";
  const solutionProvided = project.coreImpact || "We engineered a robust, cloud-native application utilizing a microservices architecture.";
  const resultOutcome = "Post-launch, the client saw a 45% increase in operational efficiency.";

  return (
    <main className={styles.detailsPage}>
      <div className={styles.container}>
        <Link to="/projects" className={styles.backBtn}>
          <FaArrowLeft /> Back to Portfolio
        </Link>

        <header className={styles.header}>
          <div className={styles.badge}>
            {(project.category || '').split(' / ')[0]}
          </div>
          <h1>{project.title}</h1>
          <p className={styles.description}>{project.shortDescription}</p>
        </header>

        {/* MAIN ANALYSIS CARD */}
        <div className={styles.mainCard}>
          <div className={styles.cardGrid}>
            <div className={styles.sectionBlock}>
              <h2>Problem Statement</h2>
              <p>{problemStatement}</p>
            </div>
            <div className={styles.sectionBlock}>
              <h2>The Solution</h2>
              <p>{solutionProvided}</p>
            </div>
          </div>
        </div>

        {/* SUCCESS STATS */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <FaRocket className={styles.statIcon} />
            <h3>{(project.category || '').includes('Retail') ? '98%' : '45%'}</h3>
            <p>Efficiency Gain</p>
          </div>
          <div className={styles.statCard}>
            <FaIndustry className={styles.statIcon} />
            <h3>Scalable</h3>
            <p>Cloud Architecture</p>
          </div>
          <div className={styles.statCard}>
            <FaCheckCircle className={styles.statIcon} />
            <h3>Seamless</h3>
            <p>User Integration</p>
          </div>
        </div>

        {/* FEATURE GRID */}
        <div className={styles.featuresGrid}>
          {(project.strategicExecution || []).map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* OUTCOME BLOCK */}
        <div className={styles.mainCard}>
          <div className={styles.sectionBlock} style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
            <h2>The Result</h2>
            <p>{resultOutcome}</p>
          </div>
        </div>

        {/* UNIFIED CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBannerWrapper}>
            <div className={styles.ctaBanner}>
              <div className={styles.ctaContent}>
                <h2>Ready for your <span className={styles.highlight}>Legacy?</span></h2>
                <p>Let's engineer your next success story together.</p>
              </div>
              <Link to="/contact" className={styles.ctaButton}>
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProjectDetails;
