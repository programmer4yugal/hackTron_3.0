const researchService = {
  conductResearch: async (interrogation, userType) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      marketTrends: [
        'AI-driven automation growing 45% YoY',
        'SaaS adoption increasing across segments',
        'User demand for integrated tools rising'
      ],
      competitors: [
        { name: 'ChatGPT', strength: 'General purpose', weakness: 'Not specialized' },
        { name: 'Notion', strength: 'Flexible workspace', weakness: 'Steep learning curve' },
        { name: 'Industry tools', strength: 'Domain specific', weakness: 'Expensive' }
      ],
      userInsights: getUserInsights(userType),
      marketGap: 'No integrated validation + execution tool exists',
      pricingStrategy: getPricingForUserType(userType),
      gtmStrategy: getGTMStrategy(userType),
      estimatedMarketSize: getMarketEstimate(userType)
    };
  }
};

function getUserInsights(userType) {
  const insights = {
    student: {
      painPoint: 'Overwhelmed with tools and don\'t know where to start',
      behavior: 'Bounce between Discord, YouTube, and docs',
      willingness: 'Prefer free or low-cost solutions'
    },
    founder: {
      painPoint: 'Validation takes too long and costs too much',
      behavior: 'Manually research, ask networks, run surveys',
      willingness: 'Will pay for faster decisions'
    },
    creator: {
      painPoint: 'Planning takes too much time away from creating',
      behavior: 'Mix of Notion, spreadsheets, and intuition',
      willingness: 'Pay if it helps with monetization'
    }
  };
  return insights[userType] || insights.student;
}

function getPricingForUserType(userType) {
  const pricing = {
    student: 'Freemium - 1 free idea/month, $10/mo for unlimited',
    founder: 'SaaS - $49/mo (Starter) to $199/mo (Pro)',
    creator: 'Subscription - $20/mo (Basic) to $80/mo (Pro)'
  };
  return pricing[userType] || pricing.student;
}

function getGTMStrategy(userType) {
  const strategies = {
    student: 'University partnerships, Discord/GitHub communities, viral loops',
    founder: 'Y Combinator network, startup communities, Product Hunt',
    creator: 'Influencer partnerships, content creator networks, YouTube'
  };
  return strategies[userType] || strategies.student;
}

function getMarketEstimate(userType) {
  const estimates = {
    student: { size: '$2-3B', addressable: '$400M', capture: '$40M' },
    founder: { size: '$5-8B', addressable: '$1.5B', capture: '$150M' },
    creator: { size: '$10B+', addressable: '$2B', capture: '$200M' }
  };
  return estimates[userType] || estimates.student;
}

module.exports = researchService;
