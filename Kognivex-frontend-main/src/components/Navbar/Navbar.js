import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { 
  FaBars, FaTimes, FaPalette, 
  FaHome, FaInfoCircle, FaCogs, FaProjectDiagram, 
  FaNewspaper, FaBriefcase, FaEnvelope, FaQuoteRight 
} from 'react-icons/fa';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  
  // Theme Color Logic
  const [accentIndex, setAccentIndex] = useState(() => {
    return parseInt(localStorage.getItem('kognivex-accent') || '0');
  });

  const accents = [
    { 
      name: 'blue', 
      color: '#3B82F6', 
      secondary: '#2563EB', 
      deep: '#1D4ED8',
      glow: 'rgba(37, 99, 235, 0.3)',
      rgb: '59, 130, 246',
      bg: '#020617',
      bgCard: 'rgba(15, 23, 42, 0.6)',
      text: '#94A3B8',
      heading: '#FFFFFF',
      pillarText: '#FFFFFF',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      watermark: 'rgba(255, 255, 255, 0.05)',
      footerBg: '#020617',
      footerText: '#FFFFFF',
      navBg: 'rgba(2, 6, 23, 0.7)',
      navBorder: 'rgba(255, 255, 255, 0.08)',
      navGlow: 0.2,
      navLink: '#FFFFFF'
    },
    { 
      name: 'orange', 
      color: '#F97316', 
      secondary: '#EA580C', 
      deep: '#C2410C',
      glow: 'rgba(249, 115, 22, 0.3)',
      rgb: '249, 115, 22',
      bg: '#F8FAFC',
      bgCard: 'rgba(255, 255, 255, 0.7)',
      text: '#475569',
      heading: '#0F172A',
      pillarText: '#000000',
      borderColor: 'rgba(0, 0, 0, 0.15)',
      watermark: 'rgba(0, 0, 0, 0.1)',
      footerBg: '#000000',
      footerText: '#FFFFFF',
      navBg: 'rgba(255, 255, 255, 0.6)',
      navBorder: 'rgba(0, 0, 0, 0.1)',
      navGlow: 0,
      navLink: '#0F172A'
    },
    { 
      name: 'cyan', 
      color: '#06B6D4', 
      secondary: '#0891B2', 
      deep: '#164E63',
      glow: 'rgba(8, 145, 178, 0.3)',
      rgb: '6, 182, 212',
      bg: '#020617',
      bgCard: 'rgba(15, 23, 42, 0.6)',
      text: '#94A3B8',
      heading: '#FFFFFF',
      pillarText: '#FFFFFF',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      watermark: 'rgba(255, 255, 255, 0.05)',
      footerBg: '#020617',
      footerText: '#FFFFFF',
      navBg: 'rgba(2, 6, 23, 0.7)',
      navBorder: 'rgba(255, 255, 255, 0.08)',
      navGlow: 0.2,
      navLink: '#FFFFFF'
    }
  ];

  useEffect(() => {
    const root = document.documentElement;
    const theme = accents[accentIndex];
    root.style.setProperty('--primary-accent', theme.secondary);
    root.style.setProperty('--primary-highlight', theme.color);
    root.style.setProperty('--primary-royal', theme.secondary);
    root.style.setProperty('--primary-deep', theme.deep);
    root.style.setProperty('--primary-glow', theme.glow);
    root.style.setProperty('--primary-rgb', theme.rgb);
    root.style.setProperty('--bg-main', theme.bg);
    root.style.setProperty('--bg-dark', theme.bg === '#F8FAFC' ? '#FFFFFF' : '#0F172A');
    root.style.setProperty('--bg-card', theme.bgCard);
    root.style.setProperty('--text-body', theme.text);
    root.style.setProperty('--text-heading', theme.heading);
    root.style.setProperty('--pillar-text', theme.pillarText);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--watermark-color', theme.watermark);
    root.style.setProperty('--footer-bg', theme.footerBg);
    root.style.setProperty('--footer-text', theme.footerText);
    root.style.setProperty('--nav-bg', theme.navBg);
    root.style.setProperty('--nav-border', theme.navBorder);
    root.style.setProperty('--nav-glow', theme.navGlow);
    root.style.setProperty('--nav-link', theme.navLink);
    localStorage.setItem('kognivex-accent', accentIndex.toString());
  }, [accentIndex]);

  const toggleAccent = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setAccentIndex((prev) => (prev + 1) % accents.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const isActive = (path) =>
    location.pathname === path ? styles.active : "";

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      {/* OVERLAY FOR MOBILE */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <div className={styles.container}>
        {/* LOGO */}
        <div className={styles.logo}>
          <Link to="/">Kognivex</Link>
        </div>

        {/* NAV LINKS */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.mobileHeader}>
            <span>Navigation</span>
            <div className={styles.closeBtn} onClick={() => setMenuOpen(false)}><FaTimes /></div>
          </div>
          
          <Link to="/" className={isActive("/")}><FaHome className={styles.navIcon} /> Home</Link>
          <Link to="/about" className={isActive("/about")}><FaInfoCircle className={styles.navIcon} /> About</Link>
          <Link to="/services" className={isActive("/services")}><FaCogs className={styles.navIcon} /> Services</Link>
          <Link to="/projects" className={isActive("/projects")}><FaProjectDiagram className={styles.navIcon} /> Projects</Link>
          <Link to="/blog" className={isActive("/blog")}><FaNewspaper className={styles.navIcon} /> Blog</Link>
          <Link to="/careers" className={isActive("/careers")}><FaBriefcase className={styles.navIcon} /> Careers</Link>
          <Link to="/contact" className={isActive("/contact")}><FaEnvelope className={styles.navIcon} /> Contact</Link>
          
          <div className={styles.mobileCta}>
             <button onClick={() => navigate("/get-quote")}>
               <FaQuoteRight /> Get a Quote
             </button>
          </div>
        </nav>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <button 
            className={`${styles.colorToggle} ${isAnimating ? styles.wiggle : ""}`} 
            onClick={toggleAccent}
            title="Change Accent Color"
          >
            <span 
              className={styles.colorIndicator} 
              style={{ 
                backgroundColor: accents[accentIndex].color,
                transform: `translateX(${accentIndex * 20}px)` 
              }}
            ></span>
            <FaPalette className={styles.paletteIcon} />
          </button>
          <button 
            className={styles.cta}
            onClick={() => navigate("/get-quote")}
          >
            Get a Quote
          </button>

          <div
            className={`${styles.menuToggle} ${menuOpen ? styles.menuOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;