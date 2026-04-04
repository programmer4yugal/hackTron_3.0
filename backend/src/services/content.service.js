const contentService = {
  generateContent: async (interrogation, project, userType) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const ideaSummary = project.title || interrogation.uniqueValue;
    return {
      pitchSummary: getPitch(ideaSummary, userType),
      landingPageCopy: getLandingCopy(ideaSummary, userType),
      socialPosts: getSocialPosts(ideaSummary, userType),
      emailSequence: getEmailSequence(userType),
      marketingAngles: getAngles(userType),
      contentAssets: getAssets(userType),
      tagline: getTagline(ideaSummary, userType),
      coreMessage: getCoreMessage(userType)
    };
  }
};

function getPitch(idea, userType) {
  const pitches = {
    student: `"${idea}" is a portfolio project that helps you learn real development. Launch your career in 8 weeks.`,
    founder: `We're building "${idea}" to solve a $10B problem. MVP done, raising seed round.`,
    creator: `"${idea}" helps creators reach more people and earn sooner. Join 100K+ creators.`
  };
  return pitches[userType] || pitches.student;
}

function getLandingCopy(idea, userType) {
  const copy = {
    student: { headline: `Build ${idea}. Launch Your Career.`, cta: 'Start Building' },
    founder: { headline: `${idea} - Now Funded`, cta: 'Join Us' },
    creator: { headline: `Create More. Earn More. With ${idea}.`, cta: 'Become Creator' }
  };
  return copy[userType] || copy.student;
}

function getSocialPosts(idea, userType) {
  const posts = {
    student: [
      `Just started building ${idea}. 8 weeks to portfolio-ready. #DevJourney`,
      `Shipped MVP of ${idea}. Feels amazing. Open to feedback 🚀 #Coding`,
      `Check out my project on GitHub: ${idea}`
    ],
    founder: [
      `${idea} MVP is live. $X MRR in month 1. Raising seed round. DM for deck.`,
      `${idea} just hit our first milestone. Solving a real problem for real people.`,
      `We're on ProductHunt today - ${idea}! Would love your feedback`
    ],
    creator: [
      `New content dropped: ${idea}. Link in bio 🎬 #Content`,
      `POV: You just learned everything about ${idea} 📹✨`,
      `FULL breakdown of ${idea}. Watch this: [link]`
    ]
  };
  return posts[userType] || posts.student;
}

function getEmailSequence(userType) {
  const sequences = {
    student: [
      { day: 1, subject: 'You\'re building what?', preview: 'Why this matters for your career...' },
      { day: 3, subject: 'Setting up your environment', preview: 'Quick guide to save 2 hours...' },
      { day: 7, subject: 'Halfway there! 🎉', preview: 'Look at what you\'ve built...' }
    ],
    founder: [
      { day: 1, subject: 'We raised $X seed round', preview: 'Join us as we scale...' },
      { day: 2, subject: 'Why we\'re solving this', preview: 'Our story and unique position...' }
    ],
    creator: [
      { day: 1, subject: 'Your 3-month content plan', preview: 'What to create to hit goals...' },
      { day: 7, subject: 'Your earnings report', preview: 'You made $X this week...' }
    ]
  };
  return sequences[userType] || sequences.student;
}

function getAngles(userType) {
  const angles = {
    student: ['Portfolio hack: Recruiter attention', 'Fast-track to senior roles', 'Join community'],
    founder: ['$10B market, 2x growth', 'Team has 3 exits', '$X MRR in 3 months'],
    creator: ['Earn on day 1', '50% less planning time', '100K+ creators on platform']
  };
  return angles[userType] || angles.student;
}

function getAssets(userType) {
  const assets = {
    student: ['README template', 'Setup guide', 'Video walkthrough', 'GitHub template'],
    founder: ['Pitch deck', '3-year financials', 'One-pager', 'Investor emails'],
    creator: ['Content calendar', 'Thumbnails', 'Welcome emails', 'Social graphics']
  };
  return assets[userType] || assets.student;
}

function getTagline(idea, userType) {
  const taglines = {
    student: `Build ${idea}. Get Hired.`,
    founder: `${idea}. Funded.`,
    creator: `${idea}. Get Paid.`
  };
  return taglines[userType] || `Build with ${idea}`;
}

function getCoreMessage(userType) {
  const messages = {
    student: 'Build something people want to hire you for.',
    founder: 'From idea to funded in 16 weeks.',
    creator: 'Create what you love. Get paid immediately.'
  };
  return messages[userType] || 'Build, validate, ship.';
}

module.exports = contentService;
