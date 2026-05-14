const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const blogs = [
  {
    slug: 'scaling-saas-architecture-2026',
    title: 'Scaling SaaS Architecture: Best Practices for 2026',
    excerpt: 'Learn how to build a multi-tenant architecture that can handle millions of users with zero downtime.',
    content: `Scaling a SaaS platform requires a deep understanding of multi-tenancy, database sharding, and edge computing. In 2026, the focus has shifted towards serverless architectures that offer granular scalability. Modern engineering teams prioritize high availability and low latency above all else.`,
    category: 'Technology',
    author: 'Kognivex Engineering Team',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'it-trends-redefining-enterprise',
    title: '5 IT Trends Redefining Enterprise Software',
    excerpt: 'From AI-driven automation to low-code platforms, discover the technologies shaping the future of IT.',
    content: `Enterprise software is undergoing a massive transformation. AI integration is now at the core of every business process, from automated workflows to predictive analytics. Low-code platforms are democratizing software development, allowing business teams to iterate faster than ever.`,
    category: 'Education',
    author: 'Kognivex Engineering Team',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'startup-growth-strategies',
    title: 'Startup Growth: Mastering the Technical Roadmap',
    excerpt: 'Avoid technical debt while scaling your startup. A guide for CTOs and product owners.',
    content: `Startups often face a dilemma: move fast and break things, or build for the future. Mastering the technical roadmap means identifying which technical debts are worth taking and which will cripple your growth. Focus on core architectural decisions early to avoid costly rewrites later.`,
    category: 'Startup',
    author: 'Kognivex Engineering Team',
    featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    status: 'published'
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
    console.log('Migrating blogs to new schema...');
    for (const blog of blogs) {
      await connection.execute(
        'INSERT INTO blogs (title, slug, excerpt, content, category, author, status, featuredImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [blog.title, blog.slug, blog.excerpt, blog.content, blog.category, blog.author, blog.status, blog.featuredImage]
      );
      console.log(`✅ Migrated: ${blog.title}`);
    }
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await connection.end();
  }
}

migrate();
