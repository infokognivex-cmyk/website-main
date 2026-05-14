import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import styles from './ManageBlogs.module.css';

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const data = await jobService.fetchAllJobs();
        setJobs(data || []);
      } catch (err) {
        setError('Unable to load jobs');
        console.error('Load jobs error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const titleMatch = job.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = job.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = titleMatch || categoryMatch;
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      await jobService.deleteJob(id);
      setJobs(prev => prev.filter(job => job.id !== id));
      setError('');
    } catch (err) {
      setError('Unable to delete job');
      console.error('Delete job error:', err);
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
    return <div className={styles.loading}>Loading jobs...</div>;
  }

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.header}>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search jobs..."
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
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <Link to="/admin/create-job" className={styles.createBtn}>
          + Create Job
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {filteredJobs.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={job.id || index}>
                  <td>
                    <div className={styles.title}>{job.title || 'Untitled'}</div>
                  </td>
                  <td>
                    <div>{job.category}</div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${job.status === 'open' ? styles.statusPublished : styles.statusDraft}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {formatDate(job.created_at)}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        to={`/admin/edit-job/${job.id}`}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
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
            {jobs.length === 0 ? 'No jobs found. Create your first job posting!' : 'No jobs match your search criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageJobs;
