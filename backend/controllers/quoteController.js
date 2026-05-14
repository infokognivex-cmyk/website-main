const pool = require('../config/db');

exports.submitQuote = async (req, res) => {
  const { name, email, phone, company, projectType, timeline, message } = req.body;

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO quotes (name, email, phone, company, project_type, timeline, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone || null, company || null, projectType, timeline || null, message]
    );

    res.status(201).json({ 
      message: 'Quote request submitted successfully!',
      quoteId: result.insertId 
    });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Database error occurred while saving quote.' });
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve quotes.' });
  }
};
