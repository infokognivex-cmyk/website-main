import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { assertEmailJsConfig } from '../../constants/emailjs';
import styles from './Contact.module.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaShieldAlt, FaGlobeAmericas } from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        message: form.message,
      },
      config.publicKey
    )
    .then(() => {
      setStatus('✅ Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    })
    .catch((error) => {
      console.error('EmailJS send failed:', error);
      setStatus('❌ Failed to send message.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className={styles.contactPage}>
      <SEO 
        title="Contact"
        description="Get in touch with Kognivex for your next software project. Our engineering team is ready to discuss your requirements."
        keywords="contact tech company, software development inquiry, project consultation, IT support"
      />
      <section className={styles.hero}>
        <div className={styles.header}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Our <span className={styles.highlight}>Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ready to scale your technical infrastructure? Let's discuss your next breakthrough project.
          </motion.p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT: INFO */}
          <motion.div 
            className={styles.infoSide}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Get In Touch</h2>
            <p>
              Whether you have a specific requirement or just want to explore possibilities, 
              our leads are here to help.
            </p>

            <div className={styles.contactCards}>
              {[
                { icon: <FaEnvelope />, text: "info.kognivex@gmail.com", label: "Email" },
                { icon: <FaPhoneAlt />, text: "+91 93817 97198", label: "Call" },
                { icon: <FaMapMarkerAlt />, text: "Hyderabad, India", label: "Location" },
                { icon: <FaGlobeAmericas />, text: "Global Service", label: "Availability" }
              ].map((item, index) => (
                <div key={index} className={styles.tactileCard}>
                  <div className={styles.iconBox}>{item.icon}</div>
                  <div className={styles.cardText}>
                    <small>{item.label}</small>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.securityNote}>
              <FaShieldAlt style={{color: 'var(--primary-highlight)'}} />
              <span>Secure, encrypted communication guaranteed.</span>
            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div 
            className={styles.formSide}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2>Send Message</h2>
              
              <div className={styles.inputGrid}>
                <div className={styles.inputWrapper}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className={`${styles.input} ${styles.textarea}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? 'Sending...' : 'Send Message'} 
                <FaPaperPlane />
              </button>

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
      </div>
    </main>
  );
}

export default Contact;