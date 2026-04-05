const interrogationService = require('./interrogation.service');
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

    // Step 2: Research - Market research (BEFORE validation for evidence-based decisions)
    const research = await researchService.conductResearch(interrogation, userType);
    pipeline.push('Research Complete');

    // Step 3: Project - Use interrogation and research outputs
    const project = await projectService.createProject(interrogation, research, userType);
    pipeline.push('Project Created');

    // Step 4: Content - Use interrogation and project outputs
    const content = await contentService.generateContent(interrogation, project, userType);
    pipeline.push('Content Generated');

    // Step 5: Learning - Use project and research outputs
    const learning = await learningService.createLearningPath(project, research, userType, interrogation);
    pipeline.push('Learning Path Created');

    // Step 6: Build final output with pipeline trace
    const finalOutput = {
      ideaSummary: idea,
      userType,
      stage: 'COMPLETE',
      pipeline,
      executionPackage: {
        interrogation,
        research,
        project,
        content,
        learning
      },
      nextSteps: buildNextSteps(project, learning)
    };

    return finalOutput;

  } catch (error) {
    console.error('Workflow execution failed:', error);
    throw error;
  }
};

const buildNextSteps = (project, learning) => {
  const phaseSteps = (project?.phases || []).map((phase, index) => {
    const name = phase?.phase || `Phase ${index + 1}`;
    const focus = phase?.focus ? ` (${phase.focus})` : '';
    return `Phase ${index + 1}: ${name}${focus}`;
  });

  const milestoneSteps = (learning?.milestones || []).slice(0, 3).map((milestone) => `${milestone}`);

  return [...phaseSteps, ...milestoneSteps];
};

module.exports = {
  executeWorkflow
};
