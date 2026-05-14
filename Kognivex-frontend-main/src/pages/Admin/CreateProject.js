import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import projectService from '../../services/projectService';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import styles from './FormDesign.module.css';
import { FaProjectDiagram, FaInfoCircle, FaImage, FaRocket, FaPlus, FaTimes, FaGlobe, FaChevronLeft } from 'react-icons/fa';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(100),
  shortDescription: Yup.string().required('Short description is required').max(300),
  category: Yup.string().required('Category is required'),
  tags: Yup.array().min(1, 'At least one tag is required'),
  projectOverview: Yup.string().required('Project overview is required'),
  strategicExecution: Yup.array().min(1, 'At least one execution step is required'),
  coreImpact: Yup.string().required('Core impact is required'),
  status: Yup.string().oneOf(['draft', 'published']).required(),
});

function CreateProject() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [tagInput, setTagInput] = useState('');
  const [executionInput, setExecutionInput] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(values).forEach(key => {
        if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      });

      // Append files if they exist
      if (thumbnailFile) formData.append('thumbnailImage', thumbnailFile);
      if (heroFile) formData.append('heroImage', heroFile);

      await projectService.createProject(formData);
      setMessage('Project created successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/admin/manage-projects'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to create project.');
      setMessageType('error');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const addArrayItem = (input, setInput, list, setFieldValue, fieldName) => {
    if (input.trim() && !list.includes(input.trim())) {
      setFieldValue(fieldName, [...list, input.trim()]);
      setInput('');
    }
  };

  const removeArrayItem = (index, list, setFieldValue, fieldName) => {
    setFieldValue(fieldName, list.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/admin/manage-projects')} className={styles.backBtn} style={{background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', marginBottom:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
          <FaChevronLeft /> Back to Dashboard
        </button>
        <h1>Create New Project</h1>
        <p>Define a new engineering success story for your portfolio.</p>
      </header>

      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.errorMsg}`}>
          {message}
        </div>
      )}

      <Formik
        initialValues={{
          title: '',
          slug: '',
          shortDescription: '',
          thumbnailImage: '', 
          heroImage: '', 
          category: '',
          tags: [],
          projectOverview: '',
          strategicExecution: [],
          coreImpact: '',
          exploreButtonText: 'Explore Case Study',
          ctaText: 'Start A Similar Project',
          status: 'draft',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className={styles.section}>
              <h2><FaInfoCircle /> General Information</h2>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Project Title</label>
                  <Field name="title" className={styles.input} placeholder="e.g. GreenLeaf Portal" />
                  <ErrorMessage name="title" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Slug (URL ID)</label>
                  <Field name="slug" className={styles.input} placeholder="e.g. greenleaf-portal" />
                  <ErrorMessage name="slug" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <Field name="category" className={styles.input} placeholder="e.g. Agriculture / Tech" />
                  <ErrorMessage name="category" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <Field as="select" name="status" className={styles.select}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </Field>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Short Description (Card Preview)</label>
                  <Field as="textarea" name="shortDescription" className={styles.textarea} placeholder="Write a catchy 2-3 sentence overview..." />
                  <ErrorMessage name="shortDescription" component="span" className={styles.error} />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2><FaProjectDiagram /> Case Study Content</h2>
              <div className={styles.formGroup}>
                <label className={styles.label}>Project Overview</label>
                <Field as="textarea" name="projectOverview" className={styles.textarea} rows={6} placeholder="Detailed problem and solution background..." />
                <ErrorMessage name="projectOverview" component="span" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Success Highlights</label>
                <div className={styles.tagsContainer}>
                  {values.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag} 
                      <button type="button" onClick={() => removeArrayItem(i, values.tags, setFieldValue, 'tags')}><FaTimes /></button>
                    </span>
                  ))}
                </div>
                <div className={styles.addInput}>
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add achievement..." />
                  <button type="button" onClick={() => addArrayItem(tagInput, setTagInput, values.tags, setFieldValue, 'tags')}><FaPlus /></button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Strategic Execution Steps</label>
                <div className={styles.tagsContainer}>
                  {values.strategicExecution.map((step, i) => (
                    <span key={i} className={styles.tag} style={{background: 'rgba(0,114,255,0.1)', borderColor:'rgba(0,114,255,0.3)', color:'#4da3ff'}}>
                      {step} 
                      <button type="button" onClick={() => removeArrayItem(i, values.strategicExecution, setFieldValue, 'strategicExecution')}><FaTimes /></button>
                    </span>
                  ))}
                </div>
                <div className={styles.addInput}>
                  <input value={executionInput} onChange={e => setExecutionInput(e.target.value)} placeholder="Add process step..." />
                  <button type="button" onClick={() => addArrayItem(executionInput, setExecutionInput, values.strategicExecution, setFieldValue, 'strategicExecution')} style={{background:'#0072ff'}}><FaPlus /></button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Core Impact Statement</label>
                <Field as="textarea" name="coreImpact" className={styles.textarea} rows={3} placeholder="The definitive result of the project..." />
                <ErrorMessage name="coreImpact" component="span" className={styles.error} />
              </div>
            </div>

            <div className={styles.section}>
              <h2><FaImage /> Visuals & Branding</h2>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Thumbnail Image</label>
                  <ImageUpload onImageSelect={setThumbnailFile} />
                  {thumbnailFile && (
                    <div className={styles.imagePreview} style={{marginTop:'10px', position:'relative'}}>
                      <img src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail Preview" style={{borderRadius:'8px', maxWidth:'100%', height:'100px', objectFit:'cover'}} />
                      <button type="button" onClick={() => setThumbnailFile(null)} className={styles.tag} style={{position:'absolute', top:'5px', right:'5px', background:'rgba(255,0,0,0.6)', border:'none', color:'#fff', cursor:'pointer', padding:'2px 8px', fontSize:'10px'}}>Remove</button>
                    </div>
                  )}
                  <Field name="thumbnailImage" className={styles.input} placeholder="Or paste external URL..." style={{marginTop: '10px'}} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Hero/Modal Image</label>
                  <ImageUpload onImageSelect={setHeroFile} />
                  {heroFile && (
                    <div className={styles.imagePreview} style={{marginTop:'10px', position:'relative'}}>
                      <img src={URL.createObjectURL(heroFile)} alt="Hero Preview" style={{borderRadius:'8px', maxWidth:'100%', height:'100px', objectFit:'cover'}} />
                      <button type="button" onClick={() => setHeroFile(null)} className={styles.tag} style={{position:'absolute', top:'5px', right:'5px', background:'rgba(255,0,0,0.6)', border:'none', color:'#fff', cursor:'pointer', padding:'2px 8px', fontSize:'10px'}}>Remove</button>
                    </div>
                  )}
                  <Field name="heroImage" className={styles.input} placeholder="Or paste external URL..." style={{marginTop: '10px'}} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Explore Button Label</label>
                  <Field name="exploreButtonText" className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Modal CTA Label</label>
                  <Field name="ctaText" className={styles.input} />
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" disabled={isSubmitting || loading} className={styles.submitBtn}>
                <FaRocket /> {loading ? 'Creating Project...' : 'Launch Project Case Study'}
              </button>
              <button type="button" onClick={() => navigate('/admin/manage-projects')} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProject;
