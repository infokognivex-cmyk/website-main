import React, { useState, useRef } from 'react';
import api from '../../services/api';

const ImageUpload = ({ onImageUploaded, multiple = false, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(multiple ? [] : null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (multiple) {
      setPreview(files.map(file => URL.createObjectURL(file)));
    } else {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.length) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      if (multiple) {
        Array.from(fileInputRef.current.files).forEach((file, index) => {
          formData.append('images', file);
        });
      } else {
        formData.append('image', fileInputRef.current.files[0]);
      }

      const endpoint = multiple ? '/upload/multiple' : '/upload';
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (multiple) {
        onImageUploaded(response.data.imageUrls);
      } else {
        onImageUploaded(response.data.imageUrl);
      }

      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removePreview = (index) => {
    if (multiple) {
      setPreview(prev => prev.filter((_, i) => i !== index));
    } else {
      setPreview(null);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        {label}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ marginBottom: '0.5rem' }}
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading || !fileInputRef.current?.files?.length}
        style={{
          padding: '0.5rem 1rem',
          background: uploading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          marginRight: '0.5rem'
        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

      {/* Preview */}
      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Preview:</h4>
          {multiple ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {preview.map((url, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <button
                    type="button"
                    onClick={() => removePreview(index)}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={preview}
                alt="Preview"
                style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <button
                type="button"
                onClick={() => removePreview()}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;