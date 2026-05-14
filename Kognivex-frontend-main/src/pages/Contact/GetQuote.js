import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { updateSeo } from '../../utils/seoHelper';
import emailjs from '@emailjs/browser';
import { assertEmailJsConfig } from '../../constants/emailjs';
import styles from './GetQuote.module.css';
import { FaCheckCircle, FaRocket, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function GetQuote() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    timeline: '',
    projectType: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateSeo({
      title: 'Get a Quote | Kognivex Enterprise',
      description: 'Request a technical proposal and quote for your next digital product. Our engineering leads will review your requirements.',
    });
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    let config;
    try {
      config = assertEmailJsConfig();
    } catch (err) {
      console.error('EmailJS config error:', err);
      setStatus('❌ Configuration Error');
      setLoading(false);
      return;
    }

    emailjs.send(
      config.serviceId,
      config.templateId,
      {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: `
Company: ${form.company}
Project Requirement: ${form.projectType}
Timeline: ${form.timeline}

Project Details:
${form.message}
        `
      },
      config.publicKey
    )
    .then(() => {
      setStatus('✅ Quote request sent successfully!');
      setForm({
        name: '', email: '', phone: '', company: '', timeline: '', projectType: '', message: ''
      });
    })
    .catch((error) => {
      console.error('EmailJS send failed:', error);
      setStatus('❌ Failed to send. Try again.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className={styles.quotePage}>
      {/* 🌌 CINEMATIC HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Request a Technical <span className={styles.highlight}>Quote</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Tell us about your technical vision, and our engineering leads will 
            provide a detailed project roadmap and resource estimation.
          </motion.p>
        </div>
      </section>

      <div className={styles.container}>
        {/* ℹ️ LEFT: INFO SIDE */}
        <motion.div 
          className={styles.leftPanel}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2>Why Partner <br/> <span style={{color: 'var(--primary-highlight)'}}>With Us?</span></h2>
          <p>
            We don't just provide quotes; we provide strategic technical insight 
            to ensure your investment delivers maximum business value.
          </p>

          <div className={styles.features}>
            {[
              "Custom SaaS Architecture",
              "Scalable Cloud Infrastructure",
              "Performance-First Engineering",
              "Enterprise-Grade Security"
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className={styles.featureCard}
                whileHover={{ x: 8 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.iconBox}>
                  <FaCheckCircle />
                </div>
                <div className={styles.featureText}>
                  <span>{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.contactInfo}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <FaEnvelope style={{color: 'var(--primary-highlight)'}} />
              <span>info.kognivex@gmail.com</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <FaPhoneAlt style={{color: 'var(--primary-highlight)'}} />
              <span>+91 93817 97198</span>
            </div>
          </div>
        </motion.div>

        {/* 📝 RIGHT: FORM SIDE */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Project Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              name="company"
              placeholder="Company / Organization"
              value={form.company}
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              name="projectType"
              placeholder="Project Requirement (e.g., Web App, SaaS)"
              value={form.projectType}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <select
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="">Project Timeline</option>
              <option>1-2 Weeks (MVP)</option>
              <option>1-3 Months</option>
              <option>3-6 Months (Enterprise)</option>
              <option>Ongoing Partnership</option>
            </select>

            <textarea
              name="message"
              placeholder="Describe your technical requirements..."
              value={form.message}
              onChange={handleChange}
              required
              className={`${styles.input} ${styles.textarea}`}
            />

            <motion.button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Transmitting...' : 'Request Quote'} <FaRocket />
            </motion.button>

            {status && (
              <div 
                className={styles.statusMessage}
                style={{
                  background: status.includes('✅') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: status.includes('✅') ? '#10B981' : '#EF4444',
                  border: `1px solid ${status.includes('✅') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                }}
              >
                {status}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}

export default GetQuote;