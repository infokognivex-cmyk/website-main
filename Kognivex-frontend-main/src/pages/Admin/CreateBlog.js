import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import blogService from '../../services/blogService';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import styles from './FormDesign.module.css';
import { FaEdit, FaInfoCircle, FaAlignLeft, FaImage, FaRocket, FaChevronLeft, FaTag, FaUserEdit, FaCalendarAlt, FaClock, FaListUl, FaLink, FaLightbulb, FaProjectDiagram, FaEye } from 'react-icons/fa';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  category: Yup.string().required('Category is required'),
  author: Yup.string().required('Author is required'),
  status: Yup.string()
    .oneOf(['draft', 'published'], 'Invalid status')
    .required('Status is required'),
  read_time: Yup.string().required('Read time is required (e.g. 5 min read)'),
  publish_date: Yup.date().required('Publish date is required'),
  short_description: Yup.string()
    .required('Short description is required')
    .min(10, 'Must be at least 10 characters'),
  article_content: Yup.string()
    .required('Full article content is required')
    .min(50, 'Content must be at least 50 characters'),
});

function CreateBlog() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setMessage('');
      setMessageType('');

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('slug', values.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      formData.append('category', values.category);
      formData.append('author', values.author);
      formData.append('publish_date', values.publish_date);
      formData.append('read_time', values.read_time);
      formData.append('status', values.status);
      formData.append('tags', values.tags);
      formData.append('short_description', values.short_description);
      formData.append('article_content', values.article_content);
      formData.append('key_challenges', values.key_challenges);
      formData.append('implementation_framework', values.implementation_framework);
      formData.append('future_outlook', values.future_outlook);
      formData.append('featured_image_url', values.featured_image_url);

      if (selectedImage) {
        formData.append('featuredImage', selectedImage);
      }

      await blogService.createBlog(formData);
      setMessage('Blog created successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/admin/manage-blogs'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to create blog. Please try again.');
      setMessageType('error');
      console.error('Create blog error:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/admin/manage-blogs')} className={styles.backBtn} style={{background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', marginBottom:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
          <FaChevronLeft /> Back to Blogs
        </button>
        <h1>Create New Blog</h1>
        <p>Share a new insight, technical deep-dive, or industry update.</p>
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
          category: 'Technology',
          author: 'Kognivex Engineering Team',
          publish_date: new Date().toISOString().split('T')[0],
          read_time: '5 min read',
          status: 'draft',
          tags: '',
          short_description: '',
          article_content: '',
          key_challenges: '',
          implementation_framework: '',
          future_outlook: '',
          featured_image_url: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.section}>
              <h2><FaInfoCircle /> Editorial Metadata</h2>
              <div className={styles.grid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Article Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={styles.input}
                    placeholder="Enter a compelling title..."
                  />
                  <ErrorMessage name="title" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Slug (URL ID)</label>
                  <Field
                    type="text"
                    name="slug"
                    className={styles.input}
                    placeholder="e.g. future-of-saas-2026"
                  />
                  <ErrorMessage name="slug" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <Field as="select" name="category" className={styles.select}>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Startup">Startup</option>
                    <option value="AI / SaaS">AI / SaaS</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </Field>
                  <ErrorMessage name="category" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaUserEdit /> Author</label>
                  <Field name="author" className={styles.input} />
                  <ErrorMessage name="author" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaCalendarAlt /> Publish Date</label>
                  <Field type="date" name="publish_date" className={styles.input} />
                  <ErrorMessage name="publish_date" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaClock /> Read Time</label>
                  <Field type="text" name="read_time" className={styles.input} placeholder="e.g. 8 min read" />
                  <ErrorMessage name="read_time" component="span" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}><FaTag /> Tags (Comma separated)</label>
                  <Field name="tags" className={styles.input} placeholder="AI, SaaS, Future" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Publication Status</label>
                  <Field as="select" name="status" className={styles.select}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </Field>
                  <ErrorMessage name="status" component="span" className={styles.error} />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2><FaAlignLeft /> Content Strategy</h2>
              <div className={styles.formGroup}>
                <label className={styles.label}>Short Description (Hook Text)</label>
                <Field
                  as="textarea"
                  name="short_description"
                  className={styles.textarea}
                  placeholder="Short summary for the blog card..."
                  rows={3}
                />
                <ErrorMessage name="short_description" component="span" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Full Article Content</label>
                <Field
                  as="textarea"
                  name="article_content"
                  className={styles.textarea}
                  placeholder="Write your main article content here..."
                  rows={10}
                />
                <ErrorMessage name="article_content" component="span" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}><FaLightbulb /> Key Challenges</label>
                <Field
                  as="textarea"
                  name="key_challenges"
                  className={styles.textarea}
                  placeholder="What hurdles did this project/topic face?"
                  rows={5}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}><FaProjectDiagram /> Implementation Framework</label>
                <Field
                  as="textarea"
                  name="implementation_framework"
                  className={styles.textarea}
                  placeholder="How was this strategy or technology implemented?"
                  rows={5}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}><FaEye /> Looking Ahead / Future Outlook</label>
                <Field
                  as="textarea"
                  name="future_outlook"
                  className={styles.textarea}
                  placeholder="What is the future potential or next steps?"
                  rows={5}
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2><FaImage /> Visual Presence</h2>
              <div className={styles.grid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}><FaLink /> Featured Image URL (Optional)</label>
                  <Field
                    type="text"
                    name="featured_image_url"
                    className={styles.input}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Or Upload Featured Image</label>
                  <ImageUpload onImageSelect={handleImageSelect} />
                </div>
              </div>
              
              {selectedImage && (
                <div className={styles.imagePreview} style={{marginTop:'20px', position:'relative'}}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    style={{borderRadius:'12px', maxWidth:'100%'}}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className={styles.tag}
                    style={{position:'absolute', top:'10px', right:'10px', background:'rgba(255,0,0,0.5)', border:'none', color:'#fff', cursor:'pointer', padding:'5px 10px'}}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={styles.submitBtn}
              >
                <FaRocket /> {loading ? 'Publishing Article...' : 'Launch Blog Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/manage-blogs')}
                className={styles.cancelBtn}
                disabled={isSubmitting || loading}
              >
                Discard Draft
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateBlog;
