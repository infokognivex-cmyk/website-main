import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { 
  FaCode, FaMobileAlt, FaCloud, FaCogs, FaWordpress,
  FaRocket, FaShieldAlt, FaChartLine, FaUsers, 
  FaCheck, FaQuoteLeft, FaBriefcase, FaAward, FaCalendarAlt,
  FaBrain, FaBolt, FaArrowRight
} from 'react-icons/fa';
import Counter from '../../components/Common/Counter';
import SEO from '../../components/SEO/SEO';

const testimonials = [
  {
    id: 1,
    name: "Ravi Kumar",
    text: "Kognivex handled our project with extreme professionalism. The software they built has completely streamlined our daily operations. Truly impressed with their technical depth."
  },
  {
    id: 2,
    name: "Suresh Reddy",
    text: "The team at Kognivex is brilliant. They delivered our mobile app on time and the user feedback has been amazing. Highly recommend them for any custom software needs."
  },
  {
    id: 3,
    name: "Anjali Sharma",
    text: "Working with Kognivex was a great experience. They were able to take our complex requirements and turn them into a simple, easy-to-use platform. Excellent service!"
  },
  {
    id: 4,
    name: "Vikram Malhotra",
    text: "We were looking for a reliable partner for our SaaS product, and Kognivex exceeded our expectations. Their architectural choices have made scaling our business much easier."
  },
  {
    id: 5,
    name: "Priya Das",
    text: "Top-tier engineering and great communication. They kept us updated throughout the development process and delivered a product that we are very proud of."
  }
];

function Home() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <main>
      <SEO 
        title="Home"
        description="Build Scalable Software That Grows Your Business. Kognivex is a leading web development and SaaS solutions company helping startups and businesses."
        keywords="web development, SaaS solutions, software company, IT services India, scalable software"
      />
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span>AI</span> • <span>AUTOMATION</span> • <span>INNOVATION</span>
              </div>
              <h1>
                <span className={styles.aiHighlight}>AI-POWERED</span> SOLUTIONS.<br />
                REAL BUSINESS IMPACT.
              </h1>
              <p className={styles.heroDescription}>
                We build intelligent digital products, enterprise systems, and premium websites 
                that help businesses automate, scale, and grow in the digital era.
              </p>

              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><FaBrain /></div>
                  <div className={styles.featureText}>
                    <h4>AI Integration</h4>
                    <span>Smarter Workflows</span>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><FaChartLine /></div>
                  <div className={styles.featureText}>
                    <h4>Scalable Systems</h4>
                    <span>Built for Growth</span>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><FaShieldAlt /></div>
                  <div className={styles.featureText}>
                    <h4>Secure & Reliable</h4>
                    <span>Enterprise Grade</span>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><FaBolt /></div>
                  <div className={styles.featureText}>
                    <h4>Performance Driven</h4>
                    <span>Fast & Optimized</span>
                  </div>
                </div>
              </div>

              <div className={styles.heroBtns}>
                <button onClick={() => navigate('/projects')} className={styles.primaryBtn}>
                  Explore Our Work <FaArrowRight style={{ marginLeft: '10px' }} />
                </button>
                <button onClick={() => navigate('/contact')} className={styles.secondaryBtn}>
                  Book a Free Consultation <FaCalendarAlt style={{ marginLeft: '10px' }} />
                </button>
              </div>
            </div>

            <div className={styles.heroImageContainer}>
              <div className={styles.dashboardMockup}>
                <img 
                  src={require('../../assets/hero-dashboard.png')} 
                  alt="Kognivex Dashboard" 
                  className={styles.dashboardImg}
                />
                <div className={styles.imageGlow}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP WEB DEVELOPMENT COMPANY (SHOWCASE) */}
      <section className={styles.showcaseSection}>
        <div className={styles.container}>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseMain}>
              <div className={styles.showcaseContent}>
                <h2>Top Web Development Company for <span className={styles.highlight}>Scalable Solutions</span></h2>
                <p>
                  Kognivex provides end-to-end software development services including web development, 
                  SaaS platforms, mobile app development, and enterprise systems. We help startups 
                  build scalable digital products using modern technologies.
                </p>
                <div className={styles.pillarGrid}>
                  <div className={styles.pillarItem}>
                    <FaRocket />
                    <span>Scalable Architecture</span>
                  </div>
                  <div className={styles.pillarItem}>
                    <FaChartLine />
                    <span>High-Performance</span>
                  </div>
                  <div className={styles.pillarItem}>
                    <FaShieldAlt />
                    <span>Secure Development</span>
                  </div>
                  <div className={styles.pillarItem}>
                    <FaCode />
                    <span>Modern Tech Stack</span>
                  </div>
                </div>
              </div>
              <div className={styles.showcaseImage}>
                <div className={styles.glowBlob}></div>
                <img src={require('../../assets/feature-icon.png')} alt="Feature Icon" />
              </div>
            </div>

            <div className={styles.showcaseStats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><FaRocket /></div>
                <h3><Counter end={50} suffix="+" /></h3>
                <p>Projects Delivered</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><FaUsers /></div>
                <h3><Counter end={30} suffix="+" /></h3>
                <p>Happy Clients</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><FaCalendarAlt /></div>
                <h3><Counter end={5} suffix="+" /></h3>
                <p>Years Experience</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><FaAward /></div>
                <h3><Counter end={100} suffix="%" /></h3>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR CORE SERVICES (4 COLUMNS) */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesSectionHeader}>
            <h2>Our Core Services</h2>
            <p>We deliver scalable and high-performance solutions tailored for modern businesses.</p>
          </div>
          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
              <div className={styles.iconWrapper}>
                <FaCode className={styles.cardIcon} />
              </div>
              <h3>Web Development</h3>
              <p>Custom web development services using modern technologies like React, Node.js, and scalable cloud architecture. We build high-performance applications that grow with your business.</p>
            </div>
            
            <div className={`${styles.bentoCard} ${styles.bentoCardTall}`}>
              <div className={styles.iconWrapper}>
                <FaMobileAlt className={styles.cardIcon} />
              </div>
              <h3>Mobile Apps</h3>
              <p>High performance Android and iOS mobile applications with seamless user experience and modern design.</p>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.iconWrapper}>
                <FaCloud className={styles.cardIcon} />
              </div>
              <h3>SaaS Platforms</h3>
              <p>Scalable SaaS platform development with secure cloud infrastructure.</p>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.iconWrapper}>
                <FaCogs className={styles.cardIcon} />
              </div>
              <h3>Enterprise Systems</h3>
              <p>Enterprise solutions to automate workflows and operations.</p>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.iconWrapper}>
                <FaWordpress className={styles.cardIcon} />
              </div>
              <h3>WordPress Development</h3>
              <p>Custom themes, plugins, and scalable CMS solutions.</p>
            </div>
          </div>
          <div className={styles.viewMoreContainer}>
            <button onClick={() => navigate('/services')} className={styles.viewMoreBtn}>
              View More Services
            </button>
          </div>
        </div>
      </section>



      {/* WHY CHOOSE US GRID */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.servicesSectionHeader}>
            <h2>Why Choose Us</h2>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.watermarkNumber}>01</div>
              <div className={styles.whyIcon}><FaRocket /></div>
              <div className={styles.whyContent}>
                <h3>Performance First</h3>
                <p>Fast, optimized, and scalable web applications built for maximum performance and speed.</p>
              </div>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.watermarkNumber}>02</div>
              <div className={styles.whyIcon}><FaShieldAlt /></div>
              <div className={styles.whyContent}>
                <h3>Secure Systems</h3>
                <p>Secure software development with enterprise-level protection and data privacy at its core.</p>
              </div>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.watermarkNumber}>03</div>
              <div className={styles.whyIcon}><FaChartLine /></div>
              <div className={styles.whyContent}>
                <h3>Scalable Architecture</h3>
                <p>Future-ready architecture designed to scale seamlessly as your business grows globally.</p>
              </div>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.watermarkNumber}>04</div>
              <div className={styles.whyIcon}><FaUsers /></div>
              <div className={styles.whyContent}>
                <h3>Client Focused</h3>
                <p>Development tailored to your unique business goals with dedicated support throughout.</p>
              </div>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.watermarkNumber}>05</div>
              <div className={styles.whyIcon}><FaCode /></div>
              <div className={styles.whyContent}>
                <h3>Modern Tech Stack</h3>
                <p>Leveraging the latest technologies like React, Node.js, and AWS for robust solutions.</p>
              </div>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.watermarkNumber}>06</div>
              <div className={styles.whyIcon}><FaCloud /></div>
              <div className={styles.whyContent}>
                <h3>Cloud Native</h3>
                <p>Fully integrated cloud solutions ensuring 99.9% uptime and global accessibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT OUR CLIENTS SAY (INFINITE MARQUEE) */}
      <section className={styles.testimonialSection}>
        <div className={styles.container}>
          <div className={styles.servicesSectionHeader}>
            <h2>What Our Clients Say</h2>
          </div>
        </div>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* First Set */}
            {testimonials.map((t) => (
              <div key={`first-${t.id}`} className={styles.testimonialCard}>
                <FaQuoteLeft className={styles.quoteIcon} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialFooter}>
                  <div className={styles.authorAvatar}>
                    {t.name.charAt(0)}
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <h4>{t.name}</h4>
                    <p>Valued Client</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate Set for Seamless Infinite Scroll */}
            {testimonials.map((t) => (
              <div key={`second-${t.id}`} className={styles.testimonialCard}>
                <FaQuoteLeft className={styles.quoteIcon} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialFooter}>
                  <div className={styles.authorAvatar}>
                    {t.name.charAt(0)}
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <h4>{t.name}</h4>
                    <p>Valued Client</p>
                  </div>
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
              <h2>Ready to Build Your <span className={styles.highlight}>Digital Future?</span></h2>
              <p>Contact our engineering team today for a free consultation and project roadmap.</p>
            </div>
            <div className={styles.ctaActions}>
              <button onClick={() => navigate('/contact')} className={styles.ctaButtonPrimary}>
                Get Started Now <FaRocket style={{ marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;