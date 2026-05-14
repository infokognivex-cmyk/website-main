const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false // Set to true and provide DB_SSL_CA for production
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and initialize tables
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to TiDB (MySQL Compatible) database.');
    
    // Create jobs table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        icon VARCHAR(50) DEFAULT 'briefcase',
        description TEXT NOT NULL,
        link VARCHAR(255) DEFAULT '/contact',
        status VARCHAR(20) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Jobs table initialized.');

    // Migration: Add icon column if it doesn't exist
    try {
      await connection.query('ALTER TABLE jobs ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT "briefcase" AFTER category');
    } catch (err) {
      // Ignore if column already exists or IF NOT EXISTS is not supported (MySQL 8.0.19+ supports it)
    }

    connection.release();
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
  }
})();

module.exports = pool;
