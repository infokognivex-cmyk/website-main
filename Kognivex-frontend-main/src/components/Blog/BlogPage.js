import React, { useEffect, useState, useMemo, useContext } from 'react';
import { BlogContext } from '../../context/BlogContext';
import BlogCard from './BlogCard';
import styles from './BlogPage.module.css';
import { FaSearch, FaFilter } from 'react-icons/fa';
import SEO from '../SEO/SEO';

function BlogPage() {
  const { blogs } = useContext(BlogContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(!blogs || blogs.length === 0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ["All", "Technology", "Business", "Startup", "Engineering", "Web Development", "Backend"];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (blogs && blogs.length > 0) {
      setLoading(false);
    }
  }, [blogs]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  // High-performance filtering using useMemo
  const filteredBlogs = useMemo(() => {
    return (blogs || []).filter(b => 
      (b.title?.toLowerCase().includes(search.toLowerCase()) || 
       b.short_description?.toLowerCase().includes(search.toLowerCase())) &&
      (category === 'All' || b.category === category)
    );
  }, [blogs, search, category]);

  // Grouping logic for layout sections
  const { recentBlogs, pagedBlogs, totalPages } = useMemo(() => {
    const isFiltered = category !== 'All' || search !== '';
    const pool = isFiltered ? filteredBlogs : filteredBlogs.slice(3);
    const recent = isFiltered ? [] : filteredBlogs.slice(0, 3);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paged = pool.slice(startIndex, startIndex + itemsPerPage);
    const total = Math.ceil(pool.length / itemsPerPage);

    return { 
      recentBlogs: recent, 
      pagedBlogs: paged,
      totalPages: total
    };
  }, [filteredBlogs, currentPage, category, search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <main className={styles.blogPage}>
      <SEO 
        title="Our Blog"
        description="Stay updated with the latest trends in software engineering, startup growth, and digital marketing. Insights on Technology & Business."
        keywords="software engineering blog, tech insights, business growth, Kognivex blog"
      />
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Engineering <span className={styles.highlight}>Success</span></h1>
          <p>
            Exploring the intersection of elite engineering, 
            scalable architecture, and strategic business growth.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterContainer}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.categoryFilters}>
              {categories.map((cat, idx) => (
                <button 
                  key={`cat-filter-v2-${idx}`}
                  className={`${styles.categoryBtn} ${category === cat ? styles.activeCategoryBtn : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {loading ? (
            <div className={styles.noResults}>
              <h3>Gathering latest insights...</h3>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className={styles.noResults}>
              <h3>No articles found</h3>
              <p>Try adjusting your search or category filters.</p>
              <button onClick={() => {setSearch(''); setCategory('All');}} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className={styles.resultsContainer}>
              {/* RECENT / FEATURED SECTION */}
              {recentBlogs.length > 0 && currentPage === 1 && (
                <div className={styles.sectionGroup}>
                  <h2 className={styles.sectionTitle}>Recent Updates</h2>
                  <div className={styles.blogContainer}>
                    {recentBlogs.map((blog, idx) => (
                      <BlogCard key={`item-recent-v4-${blog.id || idx}`} blog={blog} />
                    ))}
                  </div>
                </div>
              )}

              {/* MAIN ARTICLES SECTION */}
              <div className={styles.sectionGroup}>
                <h2 className={styles.sectionTitle}>
                  {category === 'All' && search === '' ? 'More Articles' : `${category} Articles`}
                </h2>
                <div className={styles.blogContainer}>
                  {pagedBlogs.map((blog, idx) => (
                    <BlogCard key={`item-paged-v4-${blog.id || idx}`} blog={blog} />
                  ))}
                </div>
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button 
                    className={styles.pageBtn} 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={`page-btn-${i + 1}`}
                      className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePageBtn : ''}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    className={styles.pageBtn} 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default BlogPage;