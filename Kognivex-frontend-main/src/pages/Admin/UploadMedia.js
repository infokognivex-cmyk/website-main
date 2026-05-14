import React, { useState, useEffect, useMemo } from 'react';
import styles from './UploadMedia.module.css';

function UploadMedia() {
  console.log('UploadMedia component loaded successfully');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Load media files from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const savedMedia = localStorage.getItem('uploadedMedia');
    if (savedMedia) {
      setMediaFiles(JSON.parse(savedMedia));
    }
  }, []);

  // Save media files to localStorage
  const saveMediaFiles = (files) => {
    localStorage.setItem('uploadedMedia', JSON.stringify(files));
    setMediaFiles(files);
  };

  const filteredMedia = useMemo(() => {
    return mediaFiles.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || file.type.startsWith(typeFilter);
      return matchesSearch && matchesType;
    });
  }, [mediaFiles, searchTerm, typeFilter]);

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;

    setLoading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      const newFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Only image files are allowed');
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('File size must be less than 5MB');
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        const newFile = {
          id: Date.now() + i,
          name: file.name,
          type: file.type,
          size: file.size,
          url: previewUrl,
          uploadedAt: new Date().toISOString(),
        };

        newFiles.push(newFile);
      }

      const updatedFiles = [...mediaFiles, ...newFiles];
      saveMediaFiles(updatedFiles);
      setSuccess(`${newFiles.length} file(s) uploaded successfully!`);
      setUploadProgress(0);

    } catch (err) {
      setError(err.message || 'Upload failed');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileSelect(files);
  };

  const deleteFile = (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      const updatedFiles = mediaFiles.filter(file => file.id !== id);
      saveMediaFiles(updatedFiles);
      setSuccess('File deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setSuccess('URL copied to clipboard!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to copy URL');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Media Library</h1>
          <p>Upload and manage your media files</p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      {/* Upload Section */}
      <div className={styles.uploadSection}>
        <div
          className={`${styles.uploadArea} ${isDragOver ? styles.dragOver : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className={styles.uploadIcon}>📁</div>
          <div className={styles.uploadText}>
            {loading ? 'Uploading...' : 'Drop images here or click to browse'}
          </div>
          <div className={styles.uploadSubtext}>
            Supports: JPG, PNG, GIF, WebP (max 5MB each)
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInputChange}
            className={styles.fileInput}
            disabled={loading}
          />
        </div>

        {uploadProgress > 0 && (
          <div className={styles.uploadProgress}>
            <div>Uploading... {uploadProgress}%</div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Types</option>
          <option value="image/">Images</option>
        </select>
      </div>

      {/* Media Grid */}
      {filteredMedia.length > 0 ? (
        <div className={styles.mediaGrid}>
          {filteredMedia.map((file) => (
            <div key={file.id} className={styles.mediaCard}>
              <img
                src={file.url}
                alt={file.name}
                className={styles.mediaImage}
                onClick={() => setSelectedFile(file)}
              />
              <div className={styles.mediaActions}>
                <button
                  onClick={() => copyUrl(file.url)}
                  className={`${styles.actionBtn} ${styles.copyBtn}`}
                  title="Copy URL"
                >
                  📋
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
              <div className={styles.mediaInfo}>
                <div className={styles.mediaName}>{file.name}</div>
                <div className={styles.mediaMeta}>
                  <span>{formatFileSize(file.size)}</span>
                  <span>{formatDate(file.uploadedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          {mediaFiles.length === 0 ? 'No media files uploaded yet. Start by uploading some images!' : 'No files match your search criteria.'}
        </div>
      )}

      {/* Modal for full-size preview */}
      {selectedFile && (
        <div className={styles.modal} onClick={() => setSelectedFile(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setSelectedFile(null)}
            >
              ×
            </button>
            <img
              src={selectedFile.url}
              alt={selectedFile.name}
              className={styles.modalImage}
            />
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                {selectedFile.name}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                {formatFileSize(selectedFile.size)} • {formatDate(selectedFile.uploadedAt)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadMedia;
