import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import blogService from '../../services/blogService';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import styles from './FormDesign.module.css';
import { API_URL } from '../../services/api';
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

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await blogService.fetchBlogBySlugAdmin(id);
        setBlog(data);
      } catch (error) {
        console.error('Load blog error:', error);
        setMessage('Failed to load blog data.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setMessage('');
      setMessageType('');

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('slug', values.slug);
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
      } else if (blog.featured_image) {
        formData.append('featuredImage', blog.featured_image);
      }

      await blogService.updateBlog(blog.id, formData);
      setMessage('Blog updated successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/admin/manage-blogs'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to update blog. Please try again.');
      setMessageType('error');
      console.error('Update blog error:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && !blog) return <div className={styles.container}>Loading blog data...</div>;
  if (!blog && !loading) return <div className={styles.container}>Blog not found.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/admin/manage-blogs')} className={styles.backBtn} style={{background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', marginBottom:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
          <FaChevronLeft /> Back to Blogs
        </button>
        <h1>Edit Blog Post</h1>
        <p>Update your insights, technical deep-dives, and industry updates.</p>
      </header>

      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.errorMsg}`}>
          {message}
        </div>
      )}

      <Formik
        initialValues={{
          title: blog.title || '',
          slug: blog.slug || '',
          category: blog.category || 'Technology',
          author: blog.author || 'Kognivex Engineering Team',
          publish_date: blog.publish_date ? new Date(blog.publish_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          read_time: blog.read_time || '5 min read',
          status: blog.status || 'draft',
          tags: blog.tags || '',
          short_description: blog.short_description || '',
          article_content: blog.article_content || '',
          key_challenges: blog.key_challenges || '',
          implementation_framework: blog.implementation_framework || '',
          future_outlook: blog.future_outlook || '',
          featured_image_url: blog.featured_image_url || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
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
                  {blog.featured_image && (
                    <div style={{fontSize:'0.8rem', color:'rgba(255,255,255,0.5)', marginBottom:'10px'}}>
                      Current Image: {blog.featured_image}
                    </div>
                  )}
                  <ImageUpload onImageSelect={setSelectedImage} />
                </div>
              </div>
              
              {(selectedImage || blog.featured_image || blog.featured_image_url) && (
                <div className={styles.imagePreview} style={{marginTop:'20px', position:'relative'}}>
                  <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : (blog.featured_image ? (blog.featured_image.startsWith('http') ? blog.featured_image : `${API_URL}${blog.featured_image}`) : blog.featured_image_url)}
                    alt="Preview"
                    style={{borderRadius:'12px', maxWidth:'100%'}}
                  />
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={styles.submitBtn}
              >
                <FaRocket /> {loading ? 'Saving Changes...' : 'Update Article'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/manage-blogs')}
                className={styles.cancelBtn}
                disabled={isSubmitting || loading}
              >
                Discard Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditBlog;
