const learningService = {
  createLearningPath: async (project, research, userType) => {
    await new Promise(resolve => setTimeout(resolve, 250));

    return {
      title: `${project.title || 'Learning Path'} - Skills & Resources`,
      skillsRequired: getSkills(userType),
      courses: getCourses(userType),
      resources: getResources(userType),
      milestones: getMilestones(userType),
      estimatedHours: getHours(userType),
      difficulty: getDifficulty(userType),
      tools: getTools(userType),
      communities: getCommunities(userType),
      mentorship: getMentorship(userType)
    };
  }
};

function getSkills(userType) {
  const skills = {
    student: ['Full-stack dev', 'Database design', 'API development', 'DevOps basics', 'Git'],
    founder: ['Customer discovery', 'Business models', 'Finance', 'Pitching', 'Sales'],
    creator: ['Content strategy', 'Video production', 'Growth hacking', 'Monetization', 'Branding']
  };
  return skills[userType] || skills.student;
}

function getCourses(userType) {
  const courses = {
    student: [
      { name: 'Complete Web Dev Bootcamp', platform: 'Udemy', hours: 50, cost: '$15' },
      { name: 'JavaScript Algorithms', platform: 'Udemy', hours: 30, cost: '$15' },
      { name: 'System Design Prep', platform: 'Educative', hours: 20, cost: '$49' }
    ],
    founder: [
      { name: 'How to Start a Startup', platform: 'Y Combinator', hours: 10, cost: 'Free' },
      { name: 'Startup School', platform: 'Y Combinator', hours: 30, cost: 'Free' },
      { name: 'Business Model Canvas', platform: 'Strategyzer', hours: 5, cost: 'Free' }
    ],
    creator: [
      { name: 'Filmmaking Masterclass', platform: 'MasterClass', hours: 10, cost: '$180/yr' },
      { name: 'YouTube Growth 2024', platform: 'Skillshare', hours: 15, cost: '$32/mo' },
      { name: 'Personal Branding', platform: 'LinkedIn Learning', hours: 8, cost: '$20/mo' }
    ]
  };
  return courses[userType] || courses.student;
}

function getResources(userType) {
  const resources = {
    student: ['MDN Web Docs', 'Stack Overflow', 'Dev.to', 'GitHub', 'LeetCode', 'freeCodeCamp'],
    founder: ['Y Combinator Blog', 'AngelList', 'Crunchbase', 'Paul Graham Essays', 'Podcasts'],
    creator: ['YouTube Creator Academy', 'Canva tutorials', 'CreatorOS', 'VidIQ', 'TikTok Handbook']
  };
  return resources[userType] || resources.student;
}

function getMilestones(userType) {
  const milestones = {
    student: ['Week 1: Setup', 'Week 2: First feature', 'Week 4: 80% complete', 'Week 6: Deploy', 'Week 8: Done'],
    founder: ['Week 1: Interviews', 'Week 2: Business model', 'Week 4: Finance', 'Week 8: Pitch deck', 'Week 12: MVP'],
    creator: ['Week 1: Calendar', 'Week 2: 3 pieces', 'Week 4: 1K followers', 'Week 8: Monetization', 'Week 13: $1K/mo']
  };
  return milestones[userType] || milestones.student;
}

function getHours(userType) {
  return { student: 80, founder: 60, creator: 50 }[userType] || 60;
}

function getDifficulty(userType) {
  return { student: 'Intermediate', founder: 'Intermediate', creator: 'Beginner' }[userType] || 'Intermediate';
}

function getTools(userType) {
  const tools = {
    student: ['VS Code', 'Git', 'npm', 'Docker', 'Figma', 'Postman', 'DevTools'],
    founder: ['Notion', 'Figma', 'Google Sheets', 'Stripe', 'Mixpanel', 'LinkedIn', 'Pitch'],
    creator: ['Canva', 'Adobe Suite', 'CapCut', 'Buffer', 'ConvertKit', 'TubeBuddy']
  };
  return tools[userType] || tools.student;
}

function getCommunities(userType) {
  const communities = {
    student: ['Dev.to', 'GitHub', 'r/learnprogramming', 'Discord', 'Hashnode'],
    founder: ['Y Combinator', 'Startup Grind', 'Founder Institute', 'Growth Hackers', 'Product Hunt'],
    creator: ['r/ContentCreators', 'Creator Discord', 'YouTubers Guild', 'Indie Hackers', 'CreatorOS']
  };
  return communities[userType] || communities.student;
}

function getMentorship(userType) {
  const mentorship = {
    student: { type: 'Senior developer', value: 'Code review, career guidance' },
    founder: { type: 'Founder', value: 'Strategy, investor intros' },
    creator: { type: 'Successful creator', value: 'Growth tips, monetization' }
  };
  return mentorship[userType] || mentorship.student;
}

module.exports = learningService;
