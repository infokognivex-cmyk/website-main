// Each blog has a UNIQUE Unsplash image matched to its topic. No duplicates.
const uniqueImages = [
  // 1-5: Original hand-picked entries
  'photo-1451187580459-43490279c0fa', // SaaS/tech globe
  'photo-1460925895917-afdab827c52f', // analytics dashboard
  'photo-1519389950473-47ba0277781c', // team working on laptops
  'photo-1432888622747-4eb9a8f2c207', // digital marketing
  'photo-1522071820081-009f0129c71c', // remote team collab
  // 6-10
  'photo-1633356122544-f134324a6cee', // React/code
  'photo-1558494949-ef010cbdcc31', // edge computing / servers
  'photo-1550751827-4bd374c3f58b', // cybersecurity
  'photo-1553877522-43269d4ea984', // SaaS product growth
  'photo-1531297484001-80022131f5a1', // cloud containers
  // 11-15
  'photo-1586717791821-3f44a563fa4c', // UX psychology
  'photo-1521791055366-0d553872125f', // data privacy
  'photo-1551288049-bebda4e38f71', // cloud cost dashboard
  'photo-1518770660439-4636190af475', // distributed systems / circuits
  'photo-1556761175-5973dc0f32e7', // DevOps culture team
  // 16-20
  'photo-1620712943543-bcc4688e7485', // AI code generation
  'photo-1512941937669-90a1b58e7e9c', // mobile app architecture
  'photo-1555066931-4365d14bab8c', // API security / code
  'photo-1504639725590-34d0984388bd', // low-code dark screen
  'photo-1542601906990-b4d3fb778b09', // sustainable / green tech
  // 21-25
  'photo-1552664730-d307ca884978', // project management meeting
  'photo-1557804506-669a67965ba0', // product roadmap
  'photo-1639322537228-f710d846310a', // blockchain
  'photo-1535378917042-10a22c95931a', // IoT / connectivity
  'photo-1544197150-b99a580bb7a8', // hybrid cloud
  // 26-30
  'photo-1573496359142-b8d87734a5a2', // accessibility design
  'photo-1461749280684-dccba630e2f6', // JavaScript performance
  'photo-1498050108023-c5249f4df085', // multi-cloud laptop
  'photo-1559526324-4b87b5e36e44', // fintech
  'photo-1516321497487-e288fb19713f', // QA testing
  // 31-35
  'photo-1504384308090-c894fdcc538d', // transparent IT
  'photo-1517694712202-14dd9538aa97', // microservices code
  'photo-1635070041078-e363dbe005cb', // quantum computing
  'photo-1485827404703-89b55fcc595e', // ethical AI robot
  'photo-1551434678-e076c223a692', // data-driven decisions
  // 36-40
  'photo-1522202176988-66273c2fd55f', // engineering culture
  'photo-1588196749597-9ff075ee6b5b', // remote collaboration
  'photo-1581291518633-83b4eef1d2fa', // system documentation
  'photo-1618401471353-b98afee0b2eb', // CI/CD pipeline
  'photo-1526374965328-7f61d4dc18c5', // Web3 / matrix
];

export const blogData = [
  {
    id: 1,
    slug: 'scaling-saas-architecture-2026',
    title: 'Scaling SaaS Architecture: Best Practices for 2026',
    excerpt: 'Learn how to build a multi-tenant architecture that can handle millions of users with zero downtime.',
    content: `Scaling a SaaS platform requires a deep understanding of multi-tenancy, database sharding, and edge computing. In 2026, the focus has shifted towards serverless architectures that offer granular scalability.`,
    category: 'Technology',
    image: `https://images.unsplash.com/${uniqueImages[0]}?q=80&w=1200&auto=format&fit=crop`,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    slug: 'it-trends-redefining-enterprise',
    title: '5 IT Trends Redefining Enterprise Software',
    excerpt: 'From AI-driven automation to low-code platforms, discover the technologies shaping the future of IT.',
    content: `Enterprise software is undergoing a massive transformation. AI integration is now at the core of every business process.`,
    category: 'Education',
    image: `https://images.unsplash.com/${uniqueImages[1]}?q=80&w=1200&auto=format&fit=crop`,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    slug: 'startup-growth-strategies',
    title: 'Startup Growth: Mastering the Technical Roadmap',
    excerpt: 'Avoid technical debt while scaling your startup. A guide for CTOs and product owners.',
    content: `Startups often face a dilemma: move fast and break things, or build for the future.`,
    category: 'Startup',
    image: `https://images.unsplash.com/${uniqueImages[2]}?q=80&w=1200&auto=format&fit=crop`,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 4,
    slug: 'digital-marketing-for-it-companies',
    title: 'Digital Marketing Strategies for B2B IT Services',
    excerpt: 'How IT companies can leverage content marketing and SEO to drive high-quality leads.',
    content: `Marketing IT services is different from B2C products. It's about building trust and demonstrating expertise.`,
    category: 'AI / SaaS',
    image: `https://images.unsplash.com/${uniqueImages[3]}?q=80&w=1200&auto=format&fit=crop`,
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 5,
    slug: 'future-of-work-remote-engineering',
    title: 'The Future of Work: Scaling Remote Engineering Teams',
    excerpt: 'Best practices for managing global development teams and maintaining culture.',
    content: `Remote work is no longer an experiment; it's the standard for engineering.`,
    category: 'Business',
    image: `https://images.unsplash.com/${uniqueImages[4]}?q=80&w=1200&auto=format&fit=crop`,
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  // 35 more entries — each with a UNIQUE image from uniqueImages[5..39]
  ...(() => {
    const titles = [
      'Mastering React Server Components',
      'The Shift to Edge Computing Explained',
      'Cybersecurity Protocols in the Age of AI',
      'Product-Led Growth for Modern SaaS',
      'Serverless vs Containers: The Ultimate Guide',
      'Psychology of User Experience Design',
      'Global Data Privacy Regulations in 2026',
      'Optimizing Cloud Costs for Enterprise',
      'Building Resilient Distributed Systems',
      'The Evolution of DevOps Culture',
      'AI-Powered Code Generation Benefits',
      'Next-Gen Mobile App Architectures',
      'API Security Best Practices',
      'The Rise of Low-Code for Business',
      'Sustainable Software Engineering',
      'Effective Technical Project Management',
      'User-Centric Product Roadmap Design',
      'Blockchain Beyond Cryptocurrency',
      'The Impact of 6G on IoT Ecosystems',
      'Hybrid Cloud Strategy for Growth',
      'Designing for Accessibility First',
      'Performance Optimization in JavaScript',
      'Managing Multi-Cloud Environments',
      'The Future of FinTech Infrastructure',
      'Automated Quality Assurance Strategies',
      'Building Trust Through Transparent IT',
      'Microservices vs Monoliths in 2026',
      'The Role of Quantum Computing',
      'Ethical AI Development Standards',
      'Data-Driven Decision Making in IT',
      'Scaling Engineering Culture',
      'Remote Collaboration Tools Compared',
      'The Importance of System Documentation',
      'Continuous Integration at Scale',
      'Exploring Web3 for Enterprise'
    ];

    const excerpts = [
      'A deep dive into React Server Components and how they change the way we think about rendering.',
      'Understanding edge computing and why latency-sensitive applications are moving closer to users.',
      'How AI is both a cybersecurity threat and a defense mechanism in modern enterprise environments.',
      'Strategies for building products that sell themselves through exceptional user experience.',
      'Comparing serverless functions and container orchestration for modern cloud workloads.',
      'The cognitive science behind great UX and how to apply it to your product design process.',
      'Navigating the complex landscape of GDPR, CCPA, and emerging global privacy frameworks.',
      'Practical techniques for reducing cloud spend without sacrificing performance or reliability.',
      'Patterns and practices for building systems that gracefully handle failures at scale.',
      'How DevOps has evolved from a set of tools to a complete cultural transformation.',
      'Exploring how AI pair programming tools are boosting developer productivity by 40%.',
      'Architectural patterns for building high-performance mobile applications in 2026.',
      'Essential security practices for protecting your APIs from modern attack vectors.',
      'How low-code platforms are empowering business teams to build their own solutions.',
      'Reducing the carbon footprint of software through efficient architecture and green hosting.',
      'Frameworks and methodologies for leading complex technical projects to success.',
      'Building product roadmaps that balance user needs with technical feasibility.',
      'Real-world blockchain applications in supply chain, healthcare, and digital identity.',
      'How 6G networks will revolutionize IoT with ultra-low latency and massive connectivity.',
      'Designing a hybrid cloud strategy that maximizes flexibility and minimizes vendor lock-in.',
      'Why accessibility-first design leads to better products for everyone, not just users with disabilities.',
      'Advanced techniques for optimizing JavaScript runtime performance in complex applications.',
      'Strategies for managing workloads across AWS, Azure, and GCP without operational chaos.',
      'The infrastructure challenges and opportunities shaping the next generation of financial technology.',
      'How automated testing pipelines are eliminating bugs before they reach production.',
      'Building stakeholder confidence through transparent IT governance and reporting.',
      'When to choose microservices over monoliths and how to migrate between them.',
      'The current state of quantum computing and its potential impact on software development.',
      'Frameworks for ensuring AI systems are fair, transparent, and accountable.',
      'Leveraging data analytics to make faster, more informed technology decisions.',
      'Creating an engineering culture that attracts top talent and drives innovation.',
      'Comparing Slack, Teams, Notion, and emerging tools for distributed team productivity.',
      'Why comprehensive documentation is a competitive advantage for engineering teams.',
      'Scaling CI/CD pipelines to support hundreds of deployments per day reliably.',
      'How enterprises are exploring Web3 technologies for decentralized applications and services.'
    ];

    const categories = ['Technology', 'Technology', 'Technology', 'AI / SaaS', 'Technology',
      'Education', 'Business', 'Business', 'Technology', 'Education',
      'AI / SaaS', 'Technology', 'Technology', 'Business', 'Startup',
      'Business', 'Startup', 'Technology', 'Technology', 'Business',
      'Education', 'Technology', 'Technology', 'AI / SaaS', 'Technology',
      'Business', 'Technology', 'Technology', 'AI / SaaS', 'Business',
      'Startup', 'Business', 'Education', 'Technology', 'Technology'];

    return titles.map((title, i) => ({
      id: i + 6,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      excerpt: excerpts[i],
      content: 'Full detailed content coming soon in our weekly technical digest. This article explores the deep intricacies of modern systems and business logic.',
      category: categories[i],
      image: `https://images.unsplash.com/${uniqueImages[i + 5]}?auto=format&fit=crop&w=800&q=80`,
      createdAt: new Date(Date.now() - (i + 5) * 86400000).toISOString()
    }));
  })()
];
