import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import projectService from '../../services/projectService';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import styles from './FormDesign.module.css';
import { API_URL } from '../../services/api';
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

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  
  const [tagInput, setTagInput] = useState('');
  const [executionInput, setExecutionInput] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        // Since we don't have a getById yet, we fetch all and find
        const all = await projectService.fetchProjects();
        const found = all.find(p => p._id.toString() === id);
        if (found) {
          setProject(found);
        } else {
          setMessage('Project not found.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Load project error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key] || '');
        }
      });

      if (thumbnailFile) formData.append('thumbnailImage', thumbnailFile);
      if (heroFile) formData.append('heroImage', heroFile);

      await projectService.updateProject(id, formData);
      setMessage('Project updated successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/admin/manage-projects'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to update project.');
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

  if (loading) return <div>Loading...</div>;
  if (!project && !loading) return <div>Project not found.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/admin/manage-projects')} className={styles.backBtn} style={{background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', marginBottom:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
          <FaChevronLeft /> Back to Dashboard
        </button>
        <h1>Edit Project</h1>
        <p>Refine your case study details, impact metrics, and project visuals.</p>
      </header>

      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.errorMsg}`}>
          {message}
        </div>
      )}

      <Formik
        initialValues={{
          title: project.title || '',
          slug: project.slug || '',
          shortDescription: project.shortDescription || '',
          thumbnailImage: project.thumbnailImage && !project.thumbnailImage.startsWith('/uploads') ? project.thumbnailImage : '',
          heroImage: project.heroImage && !project.heroImage.startsWith('/uploads') ? project.heroImage : '',
          category: project.category || '',
          tags: project.tags || [],
          projectOverview: project.projectOverview || '',
          strategicExecution: project.strategicExecution || [],
          coreImpact: project.coreImpact || '',
          exploreButtonText: project.exploreButtonText || 'Explore Case Study',
          ctaText: project.ctaText || 'Start A Similar Project',
          status: project.status || 'draft',
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
                  {project.thumbnailImage && !thumbnailFile && (
                    <div className={styles.imagePreview} style={{marginBottom:'10px'}}>
                      <img src={project.thumbnailImage.startsWith('http') ? project.thumbnailImage : `${API_URL}${project.thumbnailImage}`} alt="Current Thumbnail" style={{borderRadius:'8px', maxWidth:'100%', height:'100px', objectFit:'cover', opacity:0.7}} />
                      <div style={{fontSize:'10px', color:'rgba(255,255,255,0.5)', marginTop:'5px'}}>Current Active Image</div>
                    </div>
                  )}
                  <ImageUpload onImageSelect={setThumbnailFile} />
                  {thumbnailFile && (
                    <div className={styles.imagePreview} style={{marginTop:'10px', position:'relative'}}>
                      <img src={URL.createObjectURL(thumbnailFile)} alt="New Thumbnail Preview" style={{borderRadius:'8px', maxWidth:'100%', height:'100px', objectFit:'cover', border:'2px solid #0072ff'}} />
                      <button type="button" onClick={() => setThumbnailFile(null)} className={styles.tag} style={{position:'absolute', top:'5px', right:'5px', background:'rgba(255,0,0,0.6)', border:'none', color:'#fff', cursor:'pointer', padding:'2px 8px', fontSize:'10px'}}>Remove New</button>
                    </div>
                  )}
                  <Field name="thumbnailImage" className={styles.input} placeholder="Or paste external URL..." style={{marginTop: '10px'}} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Hero/Modal Image</label>
                  {project.heroImage && !heroFile && (
                    <div className={styles.imagePreview} style={{marginBottom:'10px'}}>
                      <img src={project.heroImage.startsWith('http') ? project.heroImage : `${API_URL}${project.heroImage}`} alt="Current Hero" style={{borderRadius:'8px', maxWidth:'100%', height:'100px', objectFit:'cover', opacity:0.7}} />
                      <div style={{fontSize:'10px', color:'rgba(255,255,255,0.5)', marginTop:'5px'}}>Current Active Image</div>
                    </div>
                  )}
                  <ImageUpload onImageSelect={setHeroFile} />
                  {heroFile && (
                    <div className={styles.imagePreview} style={{marginTop:'10px', position:'relative'}}>
                      <img src={URL.createObjectURL(heroFile)} alt="New Hero Preview" style={{borderRadius:'8px', maxWidth:'100%', height:'100px', objectFit:'cover', border:'2px solid #0072ff'}} />
                      <button type="button" onClick={() => setHeroFile(null)} className={styles.tag} style={{position:'absolute', top:'5px', right:'5px', background:'rgba(255,0,0,0.6)', border:'none', color:'#fff', cursor:'pointer', padding:'2px 8px', fontSize:'10px'}}>Remove New</button>
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
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                <FaRocket /> {loading ? 'Saving Changes...' : 'Update Case Study'}
              </button>
              <button type="button" onClick={() => navigate('/admin/manage-projects')} className={styles.cancelBtn}>
                Discard Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProject;
