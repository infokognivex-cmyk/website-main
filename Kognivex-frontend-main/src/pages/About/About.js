import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSeo } from '../../utils/seoHelper';
import styles from './About.module.css';
import { 
  FaUsers, FaLightbulb, FaShieldAlt, FaRocket, 
  FaCode, FaChartLine, FaCheck, FaAward, FaCogs
} from 'react-icons/fa';
import Counter from '../../components/Common/Counter';

import lalithaImg from "../../assets/images/lalitha.png";
import vinayImg from "../../assets/images/vinay.png";
import philosophyImg from "../../assets/philosophy-visual.png";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    updateSeo({
      title: 'About Us | Kognivex Engineering',
      description: 'Discover the story behind Kognivex. We are a team of elite engineers dedicated to building high-performance digital products for global enterprises.',
    });
  }, []);

  const teamMembers = [
    {
      name: "Lalitha",
      role: "Quality Assurance Specialist",
      xp: "8+ Years",
      focus: "Automation",
      description: "Ensures high standards of quality, reliability, and consistency across all deliverables.",
      image: lalithaImg,
      tech: ["Selenium", "Jest", "Appium"]
    },
    {
      name: "Pallavi",
      role: "DevOps Specialist",
      xp: "6+ Years",
      focus: "Infrastructure",
      description: "Manages efficient deployment processes and maintains system stability and performance.",
      image: null,
      tech: ["AWS", "Terraform", "Docker"]
    },
    {
      name: "Vinay",
      role: "Full Stack Developer",
      xp: "10+ Years",
      focus: "Scalability",
      description: "Builds scalable and efficient applications aligned with business needs.",
      image: vinayImg,
      tech: ["React", "Go", "Kubernetes"]
    },
    {
      name: "Hidayatullah",
      role: "Web Developer",
      xp: "5+ Years",
      focus: "Frontend",
      description: "Develops responsive and user-friendly web interfaces with clean design.",
      image: null,
      tech: ["Next.js", "Three.js", "Tailwind"]
    },
    {
      name: "Ruben",
      role: "Java Developer",
      xp: "7+ Years",
      focus: "Backend",
      description: "Specializes in high-performance backend systems and enterprise-grade Java applications.",
      image: null,
      tech: ["Spring", "Kafka", "Redis"]
    }
  ];

  return (
    <main className={styles.aboutPage}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Engineering <span className={styles.highlight}>Excellence</span></h1>
            <p>
              At Kognivex, we don't just build software. We engineer high-performance 
              digital assets that scale with your business ambition.
            </p>
            <div className={styles.heroBtns}>
              <button onClick={() => navigate('/contact')} className={styles.primaryBtn}>
                Work With Us <FaRocket style={{ marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RESTORED & REDESIGNED PHILOSOPHY SECTION */}
      <section className={styles.philosophyContained}>
        <div className={styles.container}>
          <div className={styles.philMainCard}>
            <div className={styles.philThreeCol}>
              {/* Col 1: Text Content */}
              <div className={styles.philContentCol}>
                <div className={styles.philBadge}>Strategic Vision</div>
                <h2>Our <span className={styles.highlight}>Philosophy</span></h2>
                <p>
                  Founded on the principles of elite craftsmanship and strategic innovation, 
                  Kognivex was born to bridge the gap between complex engineering and 
                  world-class user experience.
                </p>
                <p>
                  We believe that every line of code should serve a business purpose. 
                  Our team works at the intersection of robust architecture and 
                  seamless design to deliver products that aren't just functional—they're transformative.
                </p>
                <div className={styles.philChecklist}>
                   <div className={styles.checkItem}><FaCheck /> <span>Business Centric Engineering</span></div>
                   <div className={styles.checkItem}><FaCheck /> <span>Scalable Cloud Architecture</span></div>
                </div>
              </div>

              {/* Col 2: Unique Visual */}
              <div className={styles.philVisualCol}>
                <div className={styles.visualWrapper}>
                  <div className={styles.visualGlow}></div>
                  <img src={philosophyImg} alt="Kognivex Philosophy" className={styles.philImg} />
                </div>
              </div>

              {/* Col 3: Vertical Stats */}
              <div className={styles.philStatsCol}>
                <div className={styles.vStatCard}>
                  <div className={styles.vStatIcon}><FaRocket /></div>
                  <div className={styles.vStatText}>
                    <h3><Counter end={50} suffix="+" /></h3>
                    <p>Projects Delivered</p>
                  </div>
                </div>
                <div className={styles.vStatCard}>
                  <div className={styles.vStatIcon}><FaUsers /></div>
                  <div className={styles.vStatText}>
                    <h3><Counter end={30} suffix="+" /></h3>
                    <p>Happy Clients</p>
                  </div>
                </div>
                <div className={styles.vStatCard}>
                  <div className={styles.vStatIcon}><FaAward /></div>
                  <div className={styles.vStatText}>
                    <h3><Counter end={100} suffix="%" /></h3>
                    <p>Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE KOGNIVEX STANDARD - 3 IN A ROW */}
      <section className={styles.standardRowSection}>
        <div className={styles.container}>
          <div className={styles.standardHeader}>
            <div className={styles.badge}>The Kognivex Standard</div>
            <h2>Elite Engineering <span className={styles.highlight}>Pillars</span></h2>
            <p>Our core values define every project we undertake and every partnership we build.</p>
          </div>
          
          <div className={styles.standardRowGrid}>
            <div className={styles.rowCard}>
              <div className={styles.cardGlow}></div>
              <div className={styles.rowIcon}><FaLightbulb /></div>
              <h3>Innovation First</h3>
              <p>We leverage the latest technological advancements to give our partners a competitive edge in the digital landscape.</p>
              <div className={styles.rowTags}>
                <span>AI Integration</span>
                <span>Cloud Native</span>
              </div>
            </div>

            <div className={styles.rowCard}>
              <div className={styles.cardGlow}></div>
              <div className={styles.rowIcon}><FaShieldAlt /></div>
              <h3>Integrity & Security</h3>
              <p>Security is not an afterthought; it's the foundation of everything we build. We prioritize data protection at every level.</p>
              <div className={styles.rowTags}>
                <span>Data Protection</span>
                <span>Security First</span>
              </div>
            </div>

            <div className={styles.rowCard}>
              <div className={styles.cardGlow}></div>
              <div className={styles.rowIcon}><FaUsers /></div>
              <h3>Partnership Driven</h3>
              <p>We don't have clients; we have partners. Your success is our primary metric, and we scale alongside your growth.</p>
              <div className={styles.rowTags}>
                <span>Client Success</span>
                <span>Scalable Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.teamHeader}>
            <div className={styles.badge}>The Brain Trust</div>
            <h2>Meet the <span className={styles.highlight}>Minds Behind Us</span></h2>
            <p>Our multidisciplinary team of elite engineers is dedicated to your success.</p>
          </div>
          <div className={styles.specGrid}>
            {teamMembers.map((member) => (
              <div className={styles.specCard} key={member.name}>
                <div className={styles.specPattern}></div>
                <div className={styles.specHeader}>
                  <div className={styles.specAvatarWrapper}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} className={styles.specImg} />
                    ) : (
                      <div className={styles.specAvatar}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.specTitle}>
                    <h3>{member.name}</h3>
                    <p className={styles.specRole}>{member.role}</p>
                  </div>
                </div>

                <div className={styles.specTech}>
                  <div className={styles.techLabel}>Technical Stack</div>
                  <div className={styles.techPills}>
                    {member.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>

                <div className={styles.specBio}>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBannerWrapper}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaContent}>
              <h2>Ready to Build Your <span className={styles.highlight}>Technical Vision?</span></h2>
              <p>Our engineers are standing by to transform your vision into a scalable reality.</p>
            </div>
            <div className={styles.ctaActions}>
              <button onClick={() => navigate('/contact')} className={styles.ctaButtonPrimary}>
                Get in Touch <FaRocket style={{ marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;