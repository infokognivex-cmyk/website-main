const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide username and password.' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'kognivex_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: { _id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    console.error('Auth Error:', err.message);
    res.status(500).json({ error: 'Server error during login.' });
  }
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role || 'admin']
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ error: 'Registration failed.' });
  }
};
