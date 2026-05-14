import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../services/blogService';
import styles from './ManageBlogs.module.css';

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.fetchAllBlogs();
        setBlogs(data || []);
      } catch (err) {
        setError('Unable to load blogs');
        console.error('Load blogs error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const titleMatch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = blog.short_description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = titleMatch || descriptionMatch;
      const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [blogs, searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogService.deleteBlog(id);
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      setError('');
    } catch (err) {
      setError('Unable to delete blog');
      console.error('Delete blog error:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading blogs...</div>;
  }

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.header}>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <Link to="/admin/create-blog" className={styles.createBtn}>
          + Create Blog
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {filteredBlogs.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <tr key={blog.id || blog.slug || index}>
                  <td>
                    <div className={styles.title}>{blog.title || 'Untitled'}</div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${blog.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {formatDate(blog.publish_date || blog.created_at)}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className={`${styles.actionBtn} ${styles.viewBtn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/edit-blog/${blog.slug}`}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            {blogs.length === 0 ? 'No blogs found. Create your first blog!' : 'No blogs match your search criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBlogs;
