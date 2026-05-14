const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const projectsData = [
  {
    title: "GreenLeaf Nursery Portal",
    industry: "Agriculture / E-commerce",
    description: "Local nurseries often struggle with manual inventory tracking and limited customer reach beyond their physical location. Kognivex built a comprehensive digital storefront that allows enthusiasts to browse thousands of plant varieties with ease. We integrated a real-time inventory management system and a robust plant-care knowledge base. The solution includes a seasonal subscription model for regular maintenance and fertilizer delivery. Since launch, the business has seen a massive expansion in its customer base across the region.",
    features: ["Dynamic Plant Catalog", "Automated Inventory Sync", "Secure Multi-Payment Gateway", "Interactive Plant Care Guides", "Regional Delivery Tracking"],
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    slug: "greenleaf-nursery",
    liveUrl: "https://greenleaf.kognivex.com",
    githubUrl: "https://github.com/kognivex/greenleaf"
  }
];

async function seed() {
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
    console.log('Seeding projects with exact fields...');
    for (const p of projectsData) {
      await connection.execute(
        'INSERT INTO projects (title, slug, industry, description, features, technologies, image, liveUrl, githubUrl, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.title, p.slug, p.industry, p.description, JSON.stringify(p.features), JSON.stringify([]), p.image, p.liveUrl, p.githubUrl, 'published']
      );
    }
    console.log('✅ Seed successful.');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await connection.end();
  }
}

seed();
