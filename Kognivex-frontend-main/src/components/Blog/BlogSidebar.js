import React, { useState } from 'react';
import styles from './BlogPage.module.css';
import { FaSearch } from 'react-icons/fa';

function BlogSidebar({ setSearch, setCategory }) {
  const [active, setActive] = useState('All');

  // Updated categories to match the blogData constants exactly
  const categories = ["All", "Technology", "Business", "Startups", "Marketing", "IT Trends"];

  const handleCategory = (cat) => {
    setActive(cat);
    setCategory(cat === "All" ? "" : cat);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.widget}>
        <h4>Search Articles</h4>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search titles..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.widget}>
        <h4>Categories</h4>
        <ul className={styles.categoryList}>
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => handleCategory(cat)}
              className={active === cat ? styles.activeCategory : ''}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.ctaWidget}>
        <h4>Need Expert Insight?</h4>
        <p>Book a technical consultation with our engineering leads today.</p>
        <button className="btn-primary" style={{ width: '100%', fontSize: '0.9rem', marginTop: '16px' }}>
          Schedule a Call
        </button>
      </div>
    </aside>
  );
}

export default BlogSidebar;