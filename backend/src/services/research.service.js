const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const researchService = {
  conductResearch: async (interrogation, userType) => {
    try {
      const prompt = `Research insights for this idea:
Problem: ${interrogation.problem}
Target Users: ${interrogation.targetUsers.join(', ')}
Competitors: ${interrogation.competitors.join(', ')}

Return ONLY valid JSON:
{
  "marketTrends": ["trend1", "trend2", "trend3"],
  "competitors": [
    {"name": "comp1", "strength": "strength", "weakness": "weakness"}
  ],
  "userInsights": {"painPoint": "", "behavior": "", "willingness": ""},
  "marketGap": "Unmet need",
  "pricingStrategy": "How to price",
  "gtmStrategy": "Go-to-market approach",
  "estimatedMarketSize": "$XB opportunity"
}`;

      const response = await axios.post(OPENAI_ENDPOINT, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a market researcher. Return ONLY valid JSON, no markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content.trim();
      const result = JSON.parse(content);
      
      return result;
    } catch (error) {
      console.error('Research API error:', error.message);
      return getFallbackResearch(userType);
    }
  }
};

function getFallbackResearch(userType) {
  const insights = {
    student: {
      painPoint: 'Lack of real-world project experience',
      behavior: 'Learn from tutorials and open-source',
      willingness: 'Prefer affordable or free tools'
    },
    founder: {
      painPoint: 'Need rapid validation and market insights',
      behavior: 'Customer research and analytics review',
      willingness: 'Invest in faster decision-making'
    },
    creator: {
      painPoint: 'Time spent on planning reduces creation time',
      behavior: 'Use content calendars and analytics',
      willingness: 'Pay for monetization enablement'
    }
  };

  return {
    marketTrends: [
      'Growing demand for integrated tools',
      'AI adoption accelerating',
      'User preference for simplicity over bloatware'
    ],
    competitors: [
      { name: 'ChatGPT', strength: 'Versatile AI', weakness: 'Not business-focused' },
      { name: 'Notion', strength: 'Flexible', weakness: 'Steep learning curve' },
      { name: 'Industry incumbents', strength: 'Established', weakness: 'Expensive' }
    ],
    userInsights: insights[userType] || insights.student,
    marketGap: 'No unified tool for idea validation and execution',
    pricingStrategy: getPricingStrategy(userType),
    gtmStrategy: 'Start with free tier, upsell to premium',
    estimatedMarketSize: '$2B+ opportunity'
  };
}

function getPricingStrategy(userType) {
  const pricing = {
    student: 'Freemium - 1 free analysis/month, $10/mo unlimited',
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
