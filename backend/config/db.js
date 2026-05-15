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
    
    // Create blogs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100),
        author VARCHAR(255),
        publish_date DATE,
        read_time VARCHAR(50),
        short_description TEXT,
        featured_image VARCHAR(255),
        featured_image_url TEXT,
        article_content LONGTEXT NOT NULL,
        key_challenges LONGTEXT,
        implementation_framework LONGTEXT,
        future_outlook LONGTEXT,
        tags TEXT,
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Blogs table initialized.');

    // Create projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        shortDescription TEXT,
        thumbnailImage VARCHAR(255),
        heroImage VARCHAR(255),
        category VARCHAR(255),
        tags JSON,
        projectOverview TEXT,
        strategicExecution JSON,
        coreImpact TEXT,
        exploreButtonText VARCHAR(255) DEFAULT 'Explore Case Study',
        ctaText VARCHAR(255) DEFAULT 'Start A Similar Project',
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Projects table initialized.');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table initialized.');

    // Create jobs table
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

    // Create contacts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Contacts table initialized.');

    // Create quotes table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        project_type VARCHAR(255) NOT NULL,
        timeline VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Quotes table initialized.');

    // Migration: Add icon column if it doesn't exist in jobs
    try {
      await connection.query('ALTER TABLE jobs ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT "briefcase" AFTER category');
    } catch (err) {
      // Ignore
    }

    connection.release();
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
  }
})();

module.exports = pool;
