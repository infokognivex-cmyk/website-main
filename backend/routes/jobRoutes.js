const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Admin routes (should ideally have auth middleware)
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
