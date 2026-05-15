import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { API_URL } from '../../services/api';
import styles from './BlogDetails.module.css';
import { FaArrowLeft, FaCalendarAlt, FaTag, FaUserCircle } from 'react-icons/fa';
import SEO from '../SEO/SEO';

function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        if (res.data && res.data.success) {
          const blogData = res.data.data;
          setBlog(blogData);
        }
      } catch (err) {
        console.error('Failed to fetch blog details:', err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.detailsPage}>
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: 'var(--text-heading)', fontSize: '1.5rem' }}>Gathering technical details...</h2>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.detailsPage}>
        <div className={styles.container} style={{ textAlign: 'center', paddingTop: '150px' }}>
          <h2 style={{ color: 'var(--text-heading)' }}>Article not found.</h2>
          <Link to="/blog" className="ctaButton" style={{ marginTop: '30px', display: 'inline-block' }}>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = blog.featured_image 
    ? (blog.featured_image.startsWith('http') ? blog.featured_image : `${API_URL}${blog.featured_image}`)
    : (blog.featured_image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80');

  const date = blog.publish_date || blog.created_at;

  const renderContent = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    const result = [];
    let currentList = [];

    const flushList = (key) => {
      if (currentList.length > 0) {
        result.push(
          <ul key={key} className={styles.articleList}>
            {currentList.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // 1. Explicit list detection (- or * or 1.)
      const isExplicitList = trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || (trimmedLine.match(/^\d+\.\s/) && !isNaN(parseInt(trimmedLine)));
      
      // 2. Implicit list detection (short lines after a line ending with :)
      const prevLine = i > 0 ? lines[i-1].trim() : '';
      const isImplicitList = (prevLine.endsWith(':') || currentList.length > 0) && trimmedLine.length < 100 && !trimmedLine.endsWith('.');

      if (isExplicitList || isImplicitList) {
        const content = isExplicitList 
          ? (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') ? trimmedLine.substring(2) : trimmedLine.replace(/^\d+\.\s/, ''))
          : trimmedLine;
        currentList.push(content);
      } else {
        flushList(`list-${i}`);
        
        // Check if it's a heading
        const isHeading = (trimmedLine.length < 80 && !trimmedLine.endsWith('.') && (trimmedLine === trimmedLine.toUpperCase() || trimmedLine.endsWith(':')));
        
        if (isHeading) {
          result.push(<h3 key={i} className={styles.subHeading}>{trimmedLine}</h3>);
        } else {
          result.push(<p key={i}>{trimmedLine}</p>);
        }
      }
    });

    flushList('list-final');
    return result;
  };

  return (
    <main className={styles.detailsPage}>
      <SEO 
        title={blog.title}
        description={blog.short_description || (blog.article_content ? blog.article_content.substring(0, 160) : '')}
        image={imageUrl}
        type="article"
      />
      <div className={styles.progressBar} style={{ width: scrollProgress }}></div>

      <div className={styles.container}>
        <nav className={styles.headerNav}>
          <Link to="/blog" className={styles.backLink}>
            <FaArrowLeft /> Back to Blog
          </Link>
        </nav>

        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={blog.title}
            className={styles.heroImage}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'; }}
          />
        </div>

        <div className={styles.titleArea}>
          <h1 className={styles.title}>
            {blog.title}
          </h1>
          <div className={styles.meta}>
            <span><FaUserCircle /> {blog.author || "Kognivex Engineering Team"}</span>
            <span><FaCalendarAlt /> {date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "October 24, 2024"}</span>
            <span><FaTag /> {blog.category}</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.excerpt}>
            {blog.short_description}
          </div>
          
          <div className={styles.articleBody}>
            {renderContent(blog.article_content)}
          </div>

          {blog.key_challenges && (
            <section className={styles.specialSection}>
              <h2 className={styles.sectionTitle}>Key Challenges</h2>
              <div className={styles.challenges}>
                {renderContent(blog.key_challenges)}
              </div>
            </section>
          )}

          {blog.implementation_framework && (
            <section className={styles.specialSection}>
              <h2 className={styles.sectionTitle}>Strategic Implementation Framework</h2>
              <div className={styles.framework}>
                {renderContent(blog.implementation_framework)}
              </div>
            </section>
          )}

          {blog.future_outlook && (
            <section className={styles.specialSection}>
              <h2 className={styles.sectionTitle}>Looking Ahead</h2>
              <div className={styles.outlook}>
                {renderContent(blog.future_outlook)}
              </div>
            </section>
          )}
        </div>

        <footer className={styles.footer}>
          <h3>Ready to build for the future?</h3>
          <p>Our engineering team specializes in scaling enterprise digital products with precision and absolute reliability.</p>
          <Link to="/contact" className="ctaButton">Start A Conversation</Link>
        </footer>
      </div>
    </main>
  );
}

export default BlogDetails;