const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const interrogationService = {
  interrogateIdea: async (idea, userType) => {
    try {
      const prompt = `Analyze this business idea: "${idea}"
      
User type: ${userType}

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{
  "problem": "Core problem being solved",
  "targetUsers": ["user1", "user2", "user3"],
  "uniqueValue": "What makes this different",
  "marketSize": {"TAM": "$XB", "SAM": "$YB", "SOM": "$ZB"},
  "competitors": ["competitor1", "competitor2"],
  "riskFactors": ["risk1", "risk2", "risk3"],
  "assumptions": ["assumption1", "assumption2"],
  "followupQuestions": ["question1", "question2"]
}`;

      const response = await axios.post(OPENAI_ENDPOINT, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a business analyst. Respond with ONLY valid JSON, no markdown.'
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
      console.error('Interrogation API error:', error.message);
      return getFallbackInterrogation(idea, userType);
    }
  }
};

function getFallbackInterrogation(idea, userType) {
  const targetUsers = {
    student: ['CS Students', 'Bootcamp Grads', 'Junior Developers'],
    founder: ['Early-stage Founders', 'Solo Entrepreneurs', 'Idea Generators'],
    creator: ['Content Creators', 'YouTubers', 'Digital Entrepreneurs']
  };

  return {
    problem: `Solving challenges around: ${idea.slice(0, 30)}...`,
    targetUsers: targetUsers[userType] || targetUsers.student,
    uniqueValue: 'Integrated solution with faster execution',
    marketSize: { TAM: '$2B+', SAM: '$500M', SOM: '$50M' },
    competitors: ['Existing solutions in space'],
    riskFactors: ['Market adoption', 'Execution timeline'],
    assumptions: ['Users will pay', 'Market demand exists'],
    followupQuestions: ['How validated is the problem?', 'What is your timeline?']
  };
}

module.exports = interrogationService;
