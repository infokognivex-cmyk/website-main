CREATE DATABASE IF NOT EXISTS kognivex_db;
USE kognivex_db;

DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS quotes;
CREATE TABLE quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  project_type VARCHAR(255) NOT NULL,
  timeline VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
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
);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  _id INT AUTO_INCREMENT PRIMARY KEY,
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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
