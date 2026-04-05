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

      const result = await requestJson({
        systemPrompt: 'You are a marketing copywriter. Return ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.8,
        maxTokens: 600
      });

      const pitch =
        result?.pitch ||
        result?.pitchSummary ||
        result?.coreMessage ||
        result?.tagline ||
        'No data available';

      const socialPost =
        result?.socialPost ||
        (Array.isArray(result?.socialPosts) && result.socialPosts.length > 0 ? result.socialPosts[0] : 'No data available');

      return {
        ...result,
        pitch,
        socialPost
      };
    } catch (error) {
      console.error('Content generation API error:', formatOpenRouterError(error));
      throw new Error('Content generation failed');
    }
  }
};

module.exports = contentService;
