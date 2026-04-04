const interrogationService = require('./interrogation.service');
const validationService = require('./validation.service');
const researchService = require('./research.service');
const projectService = require('./project.service');
const contentService = require('./content.service');
const learningService = require('./learning.service');

const executeWorkflow = async (idea, userType) => {
  try {
    const pipeline = [];

    // Step 1: Interrogation - Deep dive into the idea
    const interrogation = await interrogationService.interrogateIdea(idea, userType);
    pipeline.push('Interrogation Complete');

    // Step 2: Validation - Build or Kill decision (use interrogation output, not raw idea)
    const validation = await validationService.validateIdea(interrogation, userType);
    pipeline.push('Validation Complete');

    // If KILL decision, return early with terminated state
    if (validation.decision === 'KILL') {
      return {
        ideaSummary: idea,
        userType,
        stage: 'TERMINATED',
        pipeline,
        executionPackage: {
          interrogation,
          validation
        },
        message: 'Idea did not pass validation. Recommended to pivot or abandon.'
      };
    }

    // Step 3: Research - Use interrogation output, not raw idea
    const research = await researchService.conductResearch(interrogation, userType);
    pipeline.push('Research Complete');

    // Step 4: Project - Use interrogation and research outputs
    const project = await projectService.createProject(interrogation, research, userType);
    pipeline.push('Project Created');

    // Step 5: Content - Use interrogation and project outputs
    const content = await contentService.generateContent(interrogation, project, userType);
    pipeline.push('Content Generated');

    // Step 6: Learning - Use project and research outputs
    const learning = await learningService.createLearningPath(project, research, userType);
    pipeline.push('Learning Path Created');

    // Step 7: Build final output with pipeline trace
    const finalOutput = {
      ideaSummary: idea,
      userType,
      stage: 'COMPLETE',
      pipeline,
      executionPackage: {
        interrogation,
        validation,
        research,
        project,
        content,
        learning
      },
      buildScore: {
        marketPotential: validation.score,
        confidenceLevel: validation.confidence,
        decision: validation.decision
      },
      nextSteps: generateNextSteps(userType, validation.score)
    };

    return finalOutput;

  } catch (error) {
    console.error('Workflow execution failed:', error);
    throw error;
  }
};

const generateNextSteps = (userType, score) => {
  const baseSteps = [
    'Review the execution roadmap',
    'Setup development environment',
    'Begin with Phase 1 tasks'
  ];

  const userTypeSteps = {
    student: [
      'Enroll in the learning path',
      'Build alongside the course',
      'Share progress with mentors'
    ],
    founder: [
      'Schedule investor meetings',
      'Validate with target users',
      'Set up cap table'
    ],
    creator: [
      'Create content outline',
      'Begin content production',
      'Build community'
    ]
  };

  return [...baseSteps, ...(userTypeSteps[userType] || [])];
};

module.exports = {
  executeWorkflow
};
