const pool = require('../config/db');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    // Extensive fallback logic for different schema versions
    let rows;
    const queries = [
      'SELECT * FROM blogs ORDER BY created_at DESC',
      'SELECT * FROM blogs ORDER BY createdAt DESC',
      'SELECT * FROM blogs ORDER BY id DESC',
      'SELECT * FROM blogs ORDER BY _id DESC',
      'SELECT * FROM blogs' // Absolute fallback
    ];

    for (const query of queries) {
      try {
        [rows] = await pool.execute(query);
        break; // If success, exit loop
      } catch (e) {
        if (query === queries[queries.length - 1]) throw e; // Last one failed, throw
        continue;
      }
    }
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Fetch Blogs Error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch blogs. ' + err.message });
  }
};

// Get blog by slug
exports.getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const isId = !isNaN(slug);
    const query = isId ? 'SELECT * FROM blogs WHERE id = ?' : 'SELECT * FROM blogs WHERE slug = ?';
    const [rows] = await pool.execute(query, [slug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Blog not found.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Fetch Blog Error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch blog.' });
  }
};

// Helper for image source
const getImagePath = (files, fieldName, currentUrl) => {
  if (files && files.length > 0) {
    const file = files.find(f => f.fieldname === fieldName);
    if (file) return `/uploads/${file.filename}`;
  }
  return currentUrl || null;
};

// Create blog
exports.createBlog = async (req, res) => {
  const { 
    title, slug, category, author, publish_date, read_time, 
    short_description, article_content, key_challenges, 
    implementation_framework, future_outlook, tags, status,
    featured_image_url 
  } = req.body;
  
  const featured_image = getImagePath(req.files, 'featuredImage', null);
  const generatedSlug = (slug || title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  try {
    const [result] = await pool.execute(
      `INSERT INTO blogs (
        title, slug, category, author, publish_date, read_time, 
        short_description, featured_image, featured_image_url, 
        article_content, key_challenges, implementation_framework, 
        future_outlook, tags, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title || '', generatedSlug, category || 'Technology', author || 'Kognivex', publish_date || null, read_time || '',
        short_description || '', featured_image, featured_image_url || null,
        article_content || '', key_challenges || null, implementation_framework || null,
        future_outlook || null, tags || null, status || 'draft'
      ]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, title, slug: generatedSlug } });
  } catch (err) {
    console.error('Create Blog Error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to create blog. ' + err.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { 
    title, slug, category, author, publish_date, read_time, 
    short_description, article_content, key_challenges, 
    implementation_framework, future_outlook, tags, status,
    featured_image_url 
  } = req.body;

  try {
    const [existing] = await pool.execute('SELECT featured_image FROM blogs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Blog not found.' });
    }

    const featured_image = getImagePath(req.files, 'featuredImage', existing[0].featured_image);

    await pool.execute(
      `UPDATE blogs SET 
        title = ?, slug = ?, category = ?, author = ?, publish_date = ?, 
        read_time = ?, short_description = ?, featured_image = ?, 
        featured_image_url = ?, article_content = ?, key_challenges = ?, 
        implementation_framework = ?, future_outlook = ?, tags = ?, status = ?
      WHERE id = ?`,
      [
        title || '', slug || '', category || '', author || '', publish_date || null, read_time || '',
        short_description || '', featured_image || null, featured_image_url || null,
        article_content || '', key_challenges || null, implementation_framework || null,
        future_outlook || null, tags || null, status || 'draft', id
      ]
    );
    
    res.json({ success: true, message: 'Blog updated successfully.' });
  } catch (err) {
    console.error('Update Blog Error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to update blog. ' + err.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM blogs WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Blog not found.' });
    }
    res.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (err) {
    console.error('Delete Blog Error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to delete blog.' });
  }
};
