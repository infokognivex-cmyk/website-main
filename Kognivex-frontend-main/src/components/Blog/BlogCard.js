import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogCard.module.css';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { API_URL } from '../../services/api';

function BlogCard({ blog }) {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Use short_description if available, otherwise truncate article_content
  const description = blog.short_description || (blog.article_content ? blog.article_content.substring(0, 100) + '...' : '');
  
  const imageUrl = blog.featured_image 
    ? (blog.featured_image.startsWith('http') ? blog.featured_image : `${API_URL}${blog.featured_image}`)
    : (blog.featured_image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80");

  const date = blog.publish_date || blog.created_at;

  return (
    <article 
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.neonBg}></div>
      <div className={styles.neonGlass}>
        <div className={styles.imageWrapper}>
          <img 
            src={imageUrl} 
            alt={blog.title} 
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'; }}
          />
          <div className={styles.categoryBadge}>{blog.category}</div>
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span>
              <FaCalendarAlt /> {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}
            </span>
          </div>

          <h3>{blog.title}</h3>
          <p>{description}</p>
        </div>

        <Link to={`/blog/${blog.slug}`} className={styles.cta}>
          Read Article <FaArrowRight />
        </Link>
      </div>
    </article>
  );
}

export default React.memo(BlogCard);