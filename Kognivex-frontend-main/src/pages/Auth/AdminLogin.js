import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FaUserShield, FaLock, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import styles from './AdminLogin.module.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState('NEXUS CONTROL');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // 🖱️ MOUSE TRACKING FOR BACKGROUND GLOW
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // 🧩 TEXT SCRAMBLE EFFECT
  useEffect(() => {
    const original = 'NEXUS CONTROL';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        original.split('').map((char, index) => {
          if (index < iteration) return original[index];
          return letters[Math.floor(Math.random() * letters.length)];
        }).join('')
      );
      
      if (iteration >= original.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'ACCESS REVOKED: INVALID PROTOCOL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* 🔮 INTERACTIVE MOUSE GLOW */}
      <motion.div 
        className={styles.mouseGlow}
        style={{ x: springX, y: springY }}
      />

      {/* 🕸️ GEOMETRIC GRID BACKGROUND */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.scanlines}></div>

      {/* 📦 THE PRISM CARD */}
      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, scale: 0.8, rotateX: -10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ✨ ANIMATED ACCENT LINES */}
        <div className={styles.cornerTL}></div>
        <div className={styles.cornerBR}></div>
        <div className={styles.sideGlow}></div>

        <div className={styles.cardContent}>
          <motion.div 
            className={styles.logoBox}
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{ 
              boxShadow: ["0 0 20px rgba(var(--primary-rgb), 0.3)", "0 0 40px rgba(var(--primary-rgb), 0.6)", "0 0 20px rgba(var(--primary-rgb), 0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaShieldAlt />
          </motion.div>
          
          <h1 className={styles.title}>{displayText}</h1>
          <div className={styles.separator}>
            <div className={styles.sepLine}></div>
            <div className={styles.sepDot}></div>
            <div className={styles.sepLine}></div>
          </div>
          <p className={styles.subtitle}>SECURE GATEWAY: AUTHORIZED PERSONNEL ONLY</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <div className={styles.inputContainer}>
                <FaUserShield className={styles.fieldIcon} />
                <input 
                  type="text" 
                  placeholder="ID: SYSTEM_ADMIN"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className={styles.fieldLabel}>IDENTITY</span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.inputContainer}>
                <FaLock className={styles.fieldIcon} />
                <input 
                  type="password" 
                  placeholder="PASS: ••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className={styles.fieldLabel}>ENCRYPTION KEY</span>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className={styles.errorBanner}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className={styles.errorIndicator}>!</div>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit" 
              disabled={loading} 
              className={styles.authBtn}
              whileHover={{ letterSpacing: '4px' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.btnBackground}></div>
              <span className={styles.btnText}>
                {loading ? 'VALIDATING...' : 'INITIATE OVERRIDE'}
              </span>
              <FaArrowRight className={styles.btnArrow} />
            </motion.button>
          </form>

          <div className={styles.systemStatus}>
            <div className={styles.statusGroup}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>ENCRYPTION: AES-256</span>
            </div>
            <div className={styles.statusGroup}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>LINK: SECURE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
