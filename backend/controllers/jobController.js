const pool = require('../config/db');

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single job
exports.getJobById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Job not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create job
exports.createJob = async (req, res) => {
  const { title, type, location, category, icon, description, link, status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO jobs (title, type, location, category, icon, description, link, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, type, location, category, icon || 'briefcase', description, link || '/contact', status || 'open']
    );
    res.status(201).json({ id: result.insertId, message: 'Job created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  const { title, type, location, category, icon, description, link, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE jobs SET title = ?, type = ?, location = ?, category = ?, icon = ?, description = ?, link = ?, status = ? WHERE id = ?',
      [title, type, location, category, icon, description, link, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
