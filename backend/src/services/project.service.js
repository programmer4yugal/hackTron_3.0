const { requestJson, formatOpenRouterError } = require('./openrouter.service');

const projectService = {
  createProject: async (interrogation, research, userType) => {
    try {
      const prompt = `Create an execution plan for this startup idea.

User type: ${userType}
Problem: ${interrogation.problem}
Target users: ${(interrogation.targetUsers || []).join(', ')}
Unique value: ${interrogation.uniqueValue}
Market gap: ${research.marketGap}
GTM: ${research.gtmStrategy}
Pricing: ${research.pricingStrategy}

Return ONLY valid JSON:
{
  "title": "Execution plan title",
  "phases": [{"phase":"Name","duration":"2 weeks","tasks":3,"focus":"Focus area"}],
  "timeline": "Total timeline",
  "milestones": ["m1","m2","m3"],
  "features": ["f1","f2","f3"],
  "resources": ["r1","r2","r3"],
  "budget": {"monthly":"$X","total":"$Y","note":"note"},
  "team": ["role1","role2"],
  "risks": ["risk1","risk2","risk3"]
}`;

      return await requestJson({
        systemPrompt: 'You are a startup execution planner. Return ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.7,
        maxTokens: 700
      });
    } catch (error) {
      console.error('Project generation API error:', formatOpenRouterError(error));
      throw new Error('Project generation failed');
    }
  }
};

module.exports = projectService;
