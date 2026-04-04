const { requestJson, formatOpenRouterError } = require('./openrouter.service');

const validationService = {
  validateIdea: async (interrogation, userType) => {
    try {
      const prompt = `Validate this business idea based on these factors:
Problem: ${interrogation.problem}
Target Users: ${interrogation.targetUsers.join(', ')}
Unique Value: ${interrogation.uniqueValue}
Competitors: ${interrogation.competitors.join(', ')}
Risk Factors: ${interrogation.riskFactors.join(', ')}

User type: ${userType}

Return ONLY valid JSON:
{
  "score": 1-10,
  "decision": "BUILD" or "KILL",
  "confidence": 0-100,
  "reasoning": "Why you decided this",
  "metrics": {
    "marketFit": 1-10,
    "technicalFeasibility": 1-10,
    "userClarity": 1-10,
    "competitiveAdvantage": 1-10
  },
  "recommendations": ["rec1", "rec2", "rec3"]
}`;

      const result = await requestJson({
        systemPrompt: 'You are a startup validator. Return ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.7,
        maxTokens: 400
      });
      
      return {
        ...result,
        score: Math.min(Math.max(result.score, 1), 10),
        confidence: Math.min(Math.max(result.confidence, 0), 100)
      };
    } catch (error) {
      console.error('Validation API error:', formatOpenRouterError(error));
      return getFallbackValidation(interrogation, userType);
    }
  }
};

function getFallbackValidation(interrogation, userType) {
  let score = 6;
  
  if (interrogation.uniqueValue && interrogation.uniqueValue.length > 20) score += 1;
  if (interrogation.competitors && interrogation.competitors.length > 0) score += 0.5;
  if (userType === 'founder') score += 1;
  
  score = Math.min(Math.max(score, 1), 10);
  const decision = score >= 6 ? 'BUILD' : 'KILL';

  return {
    score,
    decision,
    confidence: Math.round((score / 10) * 100),
    reasoning: decision === 'BUILD' 
      ? 'Clear market need with viable execution path'
      : 'Needs more validation before committing',
    metrics: {
      marketFit: Math.floor(score * 0.9),
      technicalFeasibility: Math.floor(score * 0.8),
      userClarity: Math.floor(score * 0.85),
      competitiveAdvantage: Math.floor(score * 0.75)
    },
    recommendations: [
      'Validate with target users',
      'Define MVP clearly',
      'Research competitors',
      decision === 'BUILD' ? 'Prioritize execution' : 'Consider pivoting or iterating'
    ]
  };
}

module.exports = validationService;
