const { requestJson, formatOpenRouterError } = require('./openrouter.service');

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
      return await requestJson({
        systemPrompt: 'You are a business analyst. Respond with ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.7,
        maxTokens: 500
      });
    } catch (error) {
      console.error('Interrogation API error:', formatOpenRouterError(error));
      throw new Error('Interrogation generation failed');
    }
  }
};

module.exports = interrogationService;
