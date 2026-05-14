import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* BRAND */}
          <div className={styles.info}>
            <h3>Kognivex</h3>
            <p>
              Engineering high-performance digital solutions for ambitious enterprises. 
              We build the future of SaaS, one pixel at a time.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className={styles.links}>
            <h4>Platform</h4>
            <ul>
              <li onClick={() => navigate('/services')}>Services</li>
              <li onClick={() => navigate('/projects')}>Portfolio</li>
              <li onClick={() => navigate('/about')}>Engineering</li>
              <li onClick={() => navigate('/careers')}>Careers</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className={styles.links}>
            <h4>Company</h4>
            <ul>
              <li onClick={() => navigate('/about')}>About Us</li>
              <li onClick={() => navigate('/contact')}>Contact</li>
              <li onClick={() => navigate('/privacy-policy')}>Privacy Policy</li>
              <li onClick={() => navigate('/terms-and-conditions')}>Terms & Conditions</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className={styles.contact}>
            <h4>Contact Info</h4>
            <p><FaEnvelope /> info.kognivex@gmail.com</p>
            <p><FaPhoneAlt /> +91 93817 97198</p>
            <p><FaMapMarkerAlt /> Hyderabad, Telangana, India</p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <p>© 2026 Kognivex IT Solutions. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter"><FaTwitter /></a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;