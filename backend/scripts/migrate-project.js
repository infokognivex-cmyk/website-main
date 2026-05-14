const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const project = {
  title: "GreenLeaf Nursery Portal",
  slug: "greenleaf-nursery",
  shortDescription: "Local nurseries often struggle with manual inventory tracking and limited customer reach beyond their physical location. Kognivex built a comprehensive digital storefront that allows enthusiasts to browse thousands of plant varieties with ease.",
  thumbnailImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200",
  category: "Agriculture",
  tags: ["Dynamic Plant Catalog", "Automated Inventory Sync", "Secure Multi-Payment Gateway"],
  projectOverview: "Local nurseries often struggle with manual inventory tracking and limited customer reach beyond their physical location. Kognivex built a comprehensive digital storefront that allows enthusiasts to browse thousands of plant varieties with ease. We integrated a real-time inventory management system and a robust plant-care knowledge base.",
  strategicExecution: [
    "Dynamic Plant Catalog", 
    "Automated Inventory Sync", 
    "Secure Multi-Payment Gateway", 
    "Interactive Plant Care Guides", 
    "Regional Delivery Tracking"
  ],
  coreImpact: "Successfully deployed GreenLeaf Nursery Portal for the Agriculture sector, driving digital transformation and operational excellence.",
  impactDescription: "Driving digital transformation and operational excellence.",
  exploreButtonText: "Explore Case Study",
  ctaText: "Start A Similar Project",
  status: "published"
};

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Migrating project to new schema...');
    await connection.execute(
      `INSERT INTO projects (
        title, slug, shortDescription, thumbnailImage, heroImage, 
        category, tags, projectOverview, strategicExecution, 
        coreImpact, impactDescription, exploreButtonText, ctaText, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.title, project.slug, project.shortDescription, project.thumbnailImage, project.heroImage,
        project.category, JSON.stringify(project.tags), project.projectOverview, JSON.stringify(project.strategicExecution),
        project.coreImpact, project.impactDescription, project.exploreButtonText, project.ctaText, project.status
      ]
    );
    console.log('✅ Migration successful.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await connection.end();
  }
}

migrate();
