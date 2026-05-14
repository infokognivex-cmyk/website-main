const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const projects = [
  {
    title: "SwiftPath Travels",
    slug: "swiftpath-travels",
    shortDescription: "The travel industry faces significant challenges with overbooking and inefficient manual seat allocations. Kognivex developed a high-performance bus booking engine that handles thousands of concurrent users.",
    thumbnailImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
    category: "Travel & Logistics",
    tags: ["Real-time Seat Selection", "Live GPS Route Tracking", "Dynamic Pricing Engine"],
    projectOverview: "The travel industry faces significant challenges with overbooking and inefficient manual seat allocations. We developed a high-performance bus booking engine that handles thousands of concurrent users during peak hours. The platform features an interactive seat selection tool and live GPS tracking for all active routes.",
    strategicExecution: [
      "Real-time Seat Selection",
      "Live GPS Route Tracking",
      "Dynamic Pricing Engine",
      "Integrated Refund Portal",
      "Automated Passenger Alerts"
    ],
    coreImpact: "Successfully deployed SwiftPath Travels for the Travel & Logistics sector, reducing administrative errors by 95% and significantly improving passenger trust.",
    exploreButtonText: "Explore Case Study",
    ctaText: "Start A Similar Project",
    status: "published"
  },
  {
    title: "NexusSoft Solutions Corporate",
    slug: "nexussoft-solutions",
    shortDescription: "Modern tech companies need a digital presence that reflects their technical prowess. Kognivex designed a futuristic, high-performance corporate website focused on lead generation and B2B conversion.",
    thumbnailImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    category: "Software & Technology",
    tags: ["Headless CMS Integration", "Interactive Project Showcases", "Secure B2B Client Portal"],
    projectOverview: "Modern tech companies need a digital presence that reflects their technical prowess. Kognivex designed a futuristic, high-performance corporate website focused on lead generation and B2B conversion. We implemented interactive case studies and a client-only portal for project tracking.",
    strategicExecution: [
      "Headless CMS Integration",
      "Interactive Project Showcases",
      "Secure B2B Client Portal",
      "SEO Optimized Architecture",
      "Automated Lead Scoring"
    ],
    coreImpact: "Successfully deployed NexusSoft Solutions for the Software & Technology sector, resulting in a 65% increase in high-value enterprise inquiries.",
    exploreButtonText: "Explore Case Study",
    ctaText: "Start A Similar Project",
    status: "published"
  }
];

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
    console.log('Migrating old projects to new schema...');
    for (const project of projects) {
      await connection.execute(
        `INSERT INTO projects (
          title, slug, shortDescription, thumbnailImage, heroImage, 
          category, tags, projectOverview, strategicExecution, 
          coreImpact, exploreButtonText, ctaText, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          project.title, project.slug, project.shortDescription, project.thumbnailImage, project.heroImage,
          project.category, JSON.stringify(project.tags), project.projectOverview, JSON.stringify(project.strategicExecution),
          project.coreImpact, project.exploreButtonText, project.ctaText, project.status
        ]
      );
      console.log(`✅ Migrated: ${project.title}`);
    }
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await connection.end();
  }
}

migrate();
