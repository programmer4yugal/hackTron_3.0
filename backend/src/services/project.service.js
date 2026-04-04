const projectService = {
  createProject: async (interrogation, research, userType) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const title = `${interrogation.uniqueValue || 'Project'} - Execution Plan`;
    return {
      title,
      phases: getPhases(userType),
      timeline: getTimeline(userType),
      milestones: getMilestones(userType),
      features: getFeatures(userType),
      resources: getResources(userType),
      budget: getBudget(userType),
      team: getTeam(userType),
      risks: ['Scope creep', 'Timeline slip', 'Tech changes']
    };
  }
};

function getPhases(userType) {
  const phases = {
    student: [
      { phase: 'Foundation', duration: '2 weeks', tasks: 3, focus: 'Setup and learn' },
      { phase: 'Build MVP', duration: '4 weeks', tasks: 4, focus: 'Core features' },
      { phase: 'Validate', duration: '2 weeks', tasks: 2, focus: 'User feedback' }
    ],
    founder: [
      { phase: 'Validate', duration: '2 weeks', tasks: 3, focus: 'Customer interviews' },
      { phase: 'MVP & Pitch', duration: '6 weeks', tasks: 4, focus: 'Build + pitch deck' },
      { phase: 'Fund & Scale', duration: '8 weeks', tasks: 3, focus: 'Raise capital' }
    ],
    creator: [
      { phase: 'Strategy', duration: '1 week', tasks: 2, focus: 'Content pillars' },
      { phase: 'Produce', duration: '8 weeks', tasks: 4, focus: '30+ content pieces' },
      { phase: 'Monetize', duration: '4 weeks', tasks: 3, focus: 'Revenue launch' }
    ]
  };
  return phases[userType] || phases.student;
}

function getTimeline(userType) {
  return { student: '8 weeks', founder: '16 weeks', creator: '13 weeks' }[userType] || '8 weeks';
}

function getMilestones(userType) {
  const milestones = {
    student: ['Week 2: Setup done', 'Week 5: MVP live', 'Week 8: User feedback collected'],
    founder: ['Week 2: 10 interviews done', 'Week 6: Pitch deck ready', 'Week 16: Seed funded'],
    creator: ['Week 1: Strategy set', 'Week 7: 5K followers', 'Week 13: $5K MRR']
  };
  return milestones[userType] || milestones.student;
}

function getFeatures(userType) {
  const features = {
    student: ['Auth', 'Dashboard', 'Progress tracking', 'Deploy'],
    founder: ['CRM', 'Analytics', 'Roadmap', 'Investor portal'],
    creator: ['Content calendar', 'Analytics', 'Email integration', 'Monetization']
  };
  return features[userType] || features.student;
}

function getResources(userType) {
  const resources = {
    student: ['GitHub', 'Figma', 'Stack Overflow', 'YouTube'],
    founder: ['Y Combinator', 'Legal', 'Customer research', 'Market data'],
    creator: ['Canva', 'Adobe', 'Buffer', 'ConvertKit']
  };
  return resources[userType] || resources.student;
}

function getBudget(userType) {
  const budgets = {
    student: { monthly: '$0-50', total: 'Free-$500', note: 'Free tier possible' },
    founder: { monthly: '$500-5K', total: '$50K-200K', note: 'Seed funded' },
    creator: { monthly: '$50-200', total: '$2K-20K', note: 'ROI positive at 10K+ audience' }
  };
  return budgets[userType] || budgets.student;
}

function getTeam(userType) {
  const teams = {
    student: ['Solo + mentors'],
    founder: ['CEO/CTO', 'Business lead', 'Advisors'],
    creator: ['Creator', 'Outsource editing later']
  };
  return teams[userType] || teams.student;
}

module.exports = projectService;
