-- Migration script to populate initial blog data
USE kognivex_db;

-- Drop and recreate the blogs table to ensure clean state with new schema
DROP TABLE IF EXISTS blogs;
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

INSERT INTO blogs (
  title, slug, category, author, publish_date, read_time, 
  short_description, featured_image_url, article_content, 
  key_challenges, implementation_framework, future_outlook, 
  tags, status
) VALUES 
(
  'How Scalable Architecture Impacts Startup Growth',
  'scalable-architecture-startups',
  'Engineering',
  'Kognivex Team',
  '2026-01-12',
  '6 min read',
  'Scalable architecture directly impacts performance, cost, and long-term growth of startups.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
  'Scalable architecture is critical for modern applications. As your product grows, poor system design leads to downtime, slow performance, and increased costs.\n\nA scalable system ensures high availability and performance under load.',
  'Managing state across distributed nodes and ensuring eventual consistency in databases.',
  'Phased audit of logical boundaries for domain-driven design and gradual replacement of legacy components.',
  'Integration of AI directly into the software development lifecycle will further accelerate this evolution.',
  'Engineering, Architecture, Scalability',
  'published'
),
(
  'MVP Development: What Startups Get Wrong',
  'mvp-development-guide',
  'Startup',
  'Kognivex Team',
  '2026-02-02',
  '5 min read',
  'Most startups overbuild MVPs. Learn how to focus on speed, validation, and scalability.',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  'An MVP is about validation, not perfection. Startups often fail by trying to build everything at once. Focus on the core problem and fast launch.',
  'Narrowing down features to the absolute minimum viable set without losing value.',
  'Build simple, validate with real users, and then scale based on feedback.',
  'AI-assisted validation and rapid prototyping will become the norm for early-stage startups.',
  'Startup, MVP, Validation',
  'published'
),
(
  'Designing High-Performance Web Applications',
  'high-performance-web-apps',
  'Web Development',
  'Kognivex Team',
  '2026-02-18',
  '7 min read',
  'Performance directly impacts user experience and retention.',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'Users expect speed. Slow apps cause drop-offs, low engagement, and revenue loss. Optimize frontend rendering and API calls.',
  'Reducing bundle sizes while maintaining complex functionality and interactive features.',
  'Implementing edge caching, image optimization, and efficient state management.',
  'WebAssembly and server-side streaming will redefine the limits of web performance.',
  'Web, Performance, Optimization',
  'published'
),
(
  'Backend Engineering: Building Reliable APIs',
  'backend-api-design',
  'Backend',
  'Kognivex Team',
  '2026-03-05',
  '8 min read',
  'APIs are the backbone of modern systems. Reliability is critical.',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
  'APIs connect everything. Bad APIs lead to failures, security issues, and poor performance. Good design includes proper validation and error handling.',
  'Ensuring zero-downtime deployments and backward compatibility during rapid iteration.',
  'Using API Gateways, robust authentication, and automated documentation like Swagger.',
  'GraphQL and gRPC will continue to gain ground for high-performance internal service communication.',
  'Backend, API, Engineering',
  'published'
);
