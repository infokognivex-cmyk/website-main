const pool = require('../config/db');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM projects ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    console.error('Fetch Projects Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
};

// Get project by slug
exports.getProjectBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const isId = !isNaN(slug);
    const query = isId ? 'SELECT * FROM projects WHERE _id = ?' : 'SELECT * FROM projects WHERE slug = ?';
    const [rows] = await pool.execute(query, [slug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Fetch Project Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch project.' });
  }
};

// Helper to determine image source (priority to uploaded file)
const getImagePath = (files, fieldName, currentUrl) => {
  if (files && files.length > 0) {
    const file = files.find(f => f.fieldname === fieldName);
    if (file) return `/uploads/${file.filename}`;
  }
  return currentUrl || null;
};

// Create project
exports.createProject = async (req, res) => {
  const { 
    title, slug, shortDescription, category, tags, 
    projectOverview, strategicExecution, coreImpact, 
    exploreButtonText, ctaText, status,
    thumbnailImage: thumbnailImageUrl, heroImage: heroImageUrl
  } = req.body;
  
  const thumbnailImage = getImagePath(req.files, 'thumbnailImage', thumbnailImageUrl);
  const heroImage = getImagePath(req.files, 'heroImage', heroImageUrl);

  if (!title || !slug) {
    return res.status(400).json({ error: 'Title and slug are required.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO projects (
        title, slug, shortDescription, thumbnailImage, heroImage, 
        category, tags, projectOverview, strategicExecution, 
        coreImpact, exploreButtonText, ctaText, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, slug, shortDescription, thumbnailImage, heroImage,
        category, 
        typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        projectOverview,
        typeof strategicExecution === 'string' ? strategicExecution : JSON.stringify(strategicExecution || []),
        coreImpact,
        exploreButtonText || 'Explore Case Study',
        ctaText || 'Start A Similar Project',
        status || 'draft'
      ]
    );
    res.status(201).json({ _id: result.insertId, title, slug });
  } catch (err) {
    console.error('Create Project Error:', err.message);
    res.status(500).json({ error: 'Failed to create project.' });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  const { id } = req.params; // _id
  const { 
    title, slug, shortDescription, category, tags, 
    projectOverview, strategicExecution, coreImpact, 
    exploreButtonText, ctaText, status,
    thumbnailImage: thumbnailImageUrl, heroImage: heroImageUrl
  } = req.body;
  
  try {
    const [existing] = await pool.execute('SELECT thumbnailImage, heroImage FROM projects WHERE _id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const thumbnailImage = getImagePath(req.files, 'thumbnailImage', thumbnailImageUrl || existing[0].thumbnailImage);
    const heroImage = getImagePath(req.files, 'heroImage', heroImageUrl || existing[0].heroImage);

    await pool.execute(
      `UPDATE projects SET 
        title = ?, slug = ?, shortDescription = ?, thumbnailImage = ?, heroImage = ?, 
        category = ?, tags = ?, projectOverview = ?, strategicExecution = ?, 
        coreImpact = ?, exploreButtonText = ?, ctaText = ?, status = ?
      WHERE _id = ?`,
      [
        title, slug, shortDescription, thumbnailImage, heroImage,
        category,
        typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        projectOverview,
        typeof strategicExecution === 'string' ? strategicExecution : JSON.stringify(strategicExecution || []),
        coreImpact,
        exploreButtonText,
        ctaText,
        status,
        id
      ]
    );
    
    res.json({ message: 'Project updated successfully.' });
  } catch (err) {
    console.error('Update Project Error:', err.message);
    res.status(500).json({ error: 'Failed to update project.' });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM projects WHERE _id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    console.error('Delete Project Error:', err.message);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
};
