const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedback-controller'); 

// POST route to create new feedback
router.post('/', FeedbackController.createFeedback);

// POST route to get all feedback entries
router.post('/all', FeedbackController.getAllFeedback);

// POST route to get single feedback by id
router.post('/:id', FeedbackController.getFeedback);

module.exports = router;
