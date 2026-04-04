const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflow.controller');

// Main workflow endpoint
router.post('/workflow', workflowController.processWorkflow);

module.exports = router;
