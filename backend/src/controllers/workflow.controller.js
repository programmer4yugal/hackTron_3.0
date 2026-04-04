const workflowService = require('../services/workflow.service');

const processWorkflow = async (req, res) => {
  try {
    const { idea, userType } = req.body;

    // Validation
    if (!idea || !userType) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['idea', 'userType']
      });
    }

    if (!['student', 'founder', 'creator'].includes(userType)) {
      return res.status(400).json({
        error: 'Invalid userType. Must be: student, founder, or creator'
      });
    }

    // Process workflow
    const result = await workflowService.executeWorkflow(idea, userType);

    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Workflow error:', error);
    res.status(500).json({
      error: 'Workflow processing failed',
      message: error.message
    });
  }
};

module.exports = {
  processWorkflow
};
