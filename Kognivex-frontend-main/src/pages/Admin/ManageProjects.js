import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../../services/projectService';
import styles from './ManageProjects.module.css';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.fetchProjects();
        setProjects(data || []);
      } catch (err) {
        setError('Unable to load projects');
        console.error('Load projects error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (project.shortDescription && project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (project.tags && project.tags.some(tag =>
                             tag.toLowerCase().includes(searchTerm.toLowerCase())
                           ));
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await projectService.deleteProject(id);
      setProjects(prev => prev.filter(project => project._id !== id));
      setError('');
    } catch (err) {
      setError('Unable to delete project');
      console.error('Delete project error:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.header}>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search projects..."
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
        <Link to="/admin/create-project" className={styles.createBtn}>
          + Create Project
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {filteredProjects.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className={styles.title}>{project.title}</div>
                  </td>
                  <td>
                    <div className={styles.technologies}>
                      {(() => {
                        let tags = project.tags;
                        if (typeof tags === 'string' && tags.startsWith('[')) {
                          try {
                            tags = JSON.parse(tags);
                          } catch (e) {
                            console.error('Failed to parse tags:', e);
                          }
                        }
                        
                        if (Array.isArray(tags) && tags.length > 0) {
                          return (
                            <>
                              {tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className={styles.techTag}>
                                  {tag}
                                </span>
                              ))}
                              {tags.length > 3 && (
                                <span className={styles.techTag}>+{tags.length - 3}</span>
                              )}
                            </>
                          );
                        }
                        return <span style={{ color: '#64748b', fontStyle: 'italic' }}>{typeof tags === 'string' ? tags : 'N/A'}</span>;
                      })()}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${project.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {formatDate(project.createdAt || project.created_at)}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        to="/projects"
                        className={`${styles.actionBtn} ${styles.viewBtn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                        <Link
                        to={`/admin/edit-project/${project._id}`}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id)}
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
            {projects.length === 0 ? 'No projects found. Create your first project!' : 'No projects match your search criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProjects;
