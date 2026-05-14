const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const projectController = require('../controllers/projectController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', projectController.getAllProjects);
router.get('/:slug', projectController.getProjectBySlug);
router.post('/', upload.any(), projectController.createProject);
router.put('/:id', upload.any(), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
