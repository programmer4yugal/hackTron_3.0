const { requestJson, formatOpenRouterError } = require('./openrouter.service');

const contentService = {
  generateContent: async (interrogation, project, userType) => {
    try {
      const ideaSummary = project.title || interrogation.uniqueValue;
      const prompt = `Generate marketing content for: "${ideaSummary}"
User type: ${userType}
Problem: ${interrogation.problem}
Target Users: ${interrogation.targetUsers.join(', ')}

Return ONLY valid JSON:
{
  "pitchSummary": "One sentence pitch",
  "landingPageCopy": {"headline": "Headline", "cta": "Call to action"},
  "socialPosts": ["post1", "post2", "post3"],
  "emailSequence": [{"day": 1, "subject": "Subject", "preview": "Preview"}],
  "marketingAngles": ["angle1", "angle2"],
  "contentAssets": ["asset1", "asset2"],
  "tagline": "Short tagline",
  "coreMessage": "Core value message"
}`;

      return await requestJson({
        systemPrompt: 'You are a marketing copywriter. Return ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.8,
        maxTokens: 600
      });
    } catch (error) {
      console.error('Content generation API error:', formatOpenRouterError(error));
      return getFallbackContent(project, userType);
    }
  }
};

function getFallbackContent(project, userType) {
  const idea = project.title || 'Your Project';
  
  return {
    pitchSummary: generatePitch(idea, userType),
    landingPageCopy: generateLanding(idea, userType),
    socialPosts: generateSocialPosts(idea, userType),
    emailSequence: generateEmailSequence(userType),
    marketingAngles: generateAngles(userType),
    contentAssets: generateAssets(userType),
    tagline: generateTagline(idea, userType),
    coreMessage: getCoreMessage(userType)
  };
}

function generatePitch(idea, userType) {
  const pitches = {
    student: `Build your portfolio with ${idea}. Launch your dev career in 8 weeks.`,
    founder: `${idea} solves real market problems. MVP ready, scaling now.`,
    creator: `${idea} helps creators earn more in less time.`
  };
  return pitches[userType] || pitches.student;
}

function generateLanding(idea, userType) {
  const copy = {
    student: { headline: `Build ${idea}. Get Hired.`, cta: 'Start Building' },
    founder: { headline: `${idea} - Funded and Growing`, cta: 'Join Us' },
    creator: { headline: `Create More. Earn More. ${idea}.`, cta: 'Get Started' }
  };
  return copy[userType] || copy.student;
}

function generateSocialPosts(idea, userType) {
  const posts = {
    student: [
      `Building ${idea}. 8 weeks to portfolio-ready. #DevJourney`,
      `MVP shipped. Open to feedback. #Coding`,
      `Check it out on GitHub!`
    ],
    founder: [
      `${idea} MVP is live. Raising seed round. DM for deck.`,
      `Solving a real market gap with ${idea}.`,
      `On ProductHunt today! #Startup`
    ],
    creator: [
      `New: ${idea}. Link in bio 🎬`,
      `Everything about ${idea}. Full breakdown 📹`,
      `${idea} - Learn this in 5 minutes`
    ]
  };
  return posts[userType] || posts.student;
}

function generateEmailSequence(userType) {
  const sequences = {
    student: [
      { day: 1, subject: 'Start your journey', preview: 'Why this matters for your career' },
      { day: 3, subject: 'First milestone', preview: 'You\'re on track' }
    ],
    founder: [
      { day: 1, subject: 'Join the team', preview: 'We\'re scaling' },
      { day: 2, subject: 'Our story', preview: 'How we got here' }
    ],
    creator: [
      { day: 1, subject: 'Your growth plan', preview: 'What to focus on' },
      { day: 7, subject: 'Progress update', preview: 'You\'re crushing it' }
    ]
  };
  return sequences[userType] || sequences.student;
}

function generateAngles(userType) {
  const angles = {
    student: ['Build real portfolio', 'Get recruiter attention', 'Join dev community'],
    founder: ['Fast market entry', 'Efficient scaling', 'Clear growth path'],
    creator: ['Earn immediately', 'Save planning time', 'Reach more people']
  };
  return angles[userType] || angles.student;
}

function generateAssets(userType) {
  const assets = {
    student: ['Setup guide', 'GitHub template', 'Demo video', 'README template'],
    founder: ['Pitch deck', 'Financial model', 'One-pager', 'Investor template'],
    creator: ['Content calendar', 'Thumbnails', 'Promotional graphics', 'Email templates']
  };
  return assets[userType] || assets.student;
}

function generateTagline(idea, userType) {
  const taglines = {
    student: `Build ${idea}. Get Hired.`,
    founder: `${idea}. Scaled.`,
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
