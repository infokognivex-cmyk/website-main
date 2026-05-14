const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ["https://kognivex.in", "https://website-frountend.onrender.com", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));


// Basic Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Kognivex API is running', version: '1.0.0' });
});

// Import Routes
const quoteRoutes = require('./routes/quoteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const jobRoutes = require('./routes/jobRoutes');



// Use Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
console.log('Registering /api/jobs route...');
app.use('/api/jobs', jobRoutes);
console.log('/api/jobs route registered.');



// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});
