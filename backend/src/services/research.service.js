const { requestJson, formatOpenRouterError } = require('./openrouter.service');

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

      const result = await requestJson({
        systemPrompt: 'You are a market researcher. Return ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.7,
        maxTokens: 500
      });

      const trends = result?.trends || result?.marketTrends || [];
      const competitors = Array.isArray(result?.competitors) ? result.competitors : [];
      const insights = Array.isArray(result?.insights)
        ? result.insights
        : [
            result?.userInsights?.painPoint,
            result?.userInsights?.behavior,
            result?.userInsights?.willingness,
            result?.marketGap,
            result?.pricingStrategy,
            result?.gtmStrategy
          ].filter(Boolean);

      return {
        ...result,
        trends,
        competitors,
        insights
      };
    } catch (error) {
      console.error('Research API error:', formatOpenRouterError(error));
      throw new Error('Research generation failed');
    }
  }
};

module.exports = researchService;
