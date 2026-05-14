import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import jobService from '../../services/jobService';
import styles from './FormDesign.module.css';
import { FaBriefcase, FaInfoCircle, FaAlignLeft, FaRocket, FaChevronLeft, FaMapMarkerAlt, FaLayerGroup } from 'react-icons/fa';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Job title is required')
    .min(3, 'Title must be at least 3 characters'),
  type: Yup.string().required('Job type is required (e.g. Full-Time)'),
  location: Yup.string().required('Location is required (e.g. Remote / Hyderabad)'),
  category: Yup.string().required('Category is required (e.g. Engineering)'),
  icon: Yup.string().required('Icon is required'),
  description: Yup.string()
    .required('Job description is required')
    .min(20, 'Description must be at least 20 characters'),
  link: Yup.string().required('Link is required'),
  status: Yup.string()
    .oneOf(['open', 'closed'], 'Invalid status')
    .required('Status is required'),
});

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await jobService.fetchJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Load job error:', error);
        setMessage('Failed to load job data.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setMessage('');
      setMessageType('');

      await jobService.updateJob(id, values);
      setMessage('Job posting updated successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/admin/manage-jobs'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to update job posting. Please try again.');
      setMessageType('error');
      console.error('Update job error:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && !job) return <div className={styles.container}>Loading job data...</div>;
  if (!job && !loading) return <div className={styles.container}>Job posting not found.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/admin/manage-jobs')} className={styles.backBtn} style={{background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', marginBottom:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
          <FaChevronLeft /> Back to Jobs
        </button>
        <h1>Edit Job Posting</h1>
        <p>Update the career opportunity details.</p>
      </header>

      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.errorMsg}`}>
          {message}
        </div>
      )}

      <Formik
        initialValues={{
          title: job.title || '',
          type: job.type || 'Full-Time',
          location: job.location || 'Remote',
          category: job.category || 'Engineering',
          icon: job.icon || 'briefcase',
          description: job.description || '',
          link: job.link || '/contact',
          status: job.status || 'open',
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.section}>
              <h2><FaInfoCircle /> Job Details</h2>
              <div className={styles.grid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Job Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={styles.input}
                    placeholder="e.g. Senior Full Stack Engineer"
                  />
                  <ErrorMessage name="title" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaBriefcase /> Job Type</label>
                  <Field
                    type="text"
                    name="type"
                    className={styles.input}
                    placeholder="e.g. Full-Time, Contract"
                  />
                  <ErrorMessage name="type" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaMapMarkerAlt /> Location</label>
                  <Field
                    type="text"
                    name="location"
                    className={styles.input}
                    placeholder="e.g. Remote / Hyderabad"
                  />
                  <ErrorMessage name="location" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaLayerGroup /> Category</label>
                  <Field as="select" name="category" className={styles.select}>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                  </Field>
                  <ErrorMessage name="category" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Card Icon</label>
                  <Field as="select" name="icon" className={styles.select}>
                    <option value="code">Code (Engineering)</option>
                    <option value="paint-brush">Paint Brush (Design)</option>
                    <option value="cloud">Cloud (Infra)</option>
                    <option value="briefcase">Briefcase (General)</option>
                    <option value="rocket">Rocket (Startup)</option>
                    <option value="users">Users (HR/Ops)</option>
                    <option value="chart-line">Chart Line (Sales)</option>
                    <option value="shield-alt">Shield (Security)</option>
                  </Field>
                  <ErrorMessage name="icon" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Application Link</label>
                  <Field
                    type="text"
                    name="link"
                    className={styles.input}
                    placeholder="/contact or external URL"
                  />
                  <ErrorMessage name="link" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <Field as="select" name="status" className={styles.select}>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </Field>
                  <ErrorMessage name="status" component="span" className={styles.error} />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2><FaAlignLeft /> Job Description</h2>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className={styles.textarea}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={8}
                />
                <ErrorMessage name="description" component="span" className={styles.error} />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={styles.submitBtn}
              >
                <FaRocket /> {loading ? 'Saving...' : 'Update Job Posting'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/manage-jobs')}
                className={styles.cancelBtn}
                disabled={isSubmitting || loading}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditJob;
