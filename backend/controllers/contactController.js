const pool = require('../config/db');

exports.submitContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone || null, message]
    );

    res.status(201).json({ 
      message: 'Contact form submitted successfully!',
      contactId: result.insertId 
    });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Database error occurred while saving contact.' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve contacts.' });
  }
};
