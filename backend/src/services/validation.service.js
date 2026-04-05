const { requestJson, formatOpenRouterError } = require('./openrouter.service');

const validationService = {
  // Helper for exponential backoff retries
  withRetry: async (fn, retries = 2, delay = 1000) => {
    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries) throw error;
        console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  },

  parseNumber: (value, fallback) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const parsed = Number(value.replace('%', '').trim());
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    return fallback;
  },

  clamp: (value, min, max) => Math.min(Math.max(value, min), max),

  parseMetric: (value, fallback = 5) => {
    const parsed = validationService.parseNumber(value, NaN);
    const isValid = Number.isFinite(parsed);
    const normalized = validationService.clamp(Math.round(isValid ? parsed : fallback), 1, 10);
    return { value: normalized, isValid };
  },

  getDecisionByScore: (score) => {
    if (score >= 7) return 'BUILD';
    if (score >= 4) return 'IMPROVE';
    return 'KILL';
  },

  computeConfidence: ({
    score,
    modelScore,
    researchQuality,
    hasAudience,
    hasProblem,
    hasUniqueness,
    demand,
    competition,
    feasibility,
    demandValid,
    competitionValid,
    feasibilityValid
  }) => {
    const completeness = [hasAudience, hasProblem, hasUniqueness].filter(Boolean).length / 3;
    const metricValidity = [demandValid, competitionValid, feasibilityValid].filter(Boolean).length / 3;

    const scoreAgreement = Number.isFinite(modelScore)
      ? Math.max(0, 1 - Math.min(Math.abs(modelScore - score), 3) / 3)
      : 0.5;

    const scoreSignal = score >= 8 ? 0.75 : score >= 7 ? 0.6 : score >= 4 ? 0.45 : 0.3;

    const effectiveCompetition = validationService.clamp(11 - competition, 1, 10);
    const metricMax = Math.max(demand, feasibility, effectiveCompetition);
    const metricMin = Math.min(demand, feasibility, effectiveCompetition);
    const metricSpread = metricMax - metricMin;

    // Lower confidence when a score is near a decision threshold (4 or 7).
    const boundaryDistance = Math.min(Math.abs(score - 4), Math.abs(score - 7));
    const boundaryPenalty = (1 - validationService.clamp(boundaryDistance / 1.5, 0, 1)) * 8;

    // Lower confidence when primary metrics disagree too much.
    const spreadPenalty = validationService.clamp(metricSpread * 1.2, 0, 9);

    // Penalize overconfidence when input quality is strong but research evidence is weak.
    const overconfidencePenalty =
      completeness > 0.9 && metricValidity > 0.9 && researchQuality < 0.5 ? 8 : 0;

    // Use a continuous max-confidence curve to avoid repeated fixed caps (like always 75).
    const maxConfidence = validationService.clamp(
      Math.round(
        62 +
          score * 1.35 +
          researchQuality * 8 +
          completeness * 4 +
          metricValidity * 4 +
          scoreAgreement * 2
      ),
      68,
      85
    );

    const raw =
      17 +
      completeness * 14 +
      metricValidity * 12 +
      scoreAgreement * 10 +
      researchQuality * 17 +
      scoreSignal * 16 -
      boundaryPenalty -
      spreadPenalty -
      overconfidencePenalty;

    return validationService.clamp(Math.round(raw), 30, maxConfidence);
  },

  validateIdea: async (interrogation, research, userType) => {
    const validatorVersion = 'validation-v3.4';

    const hasAudience = Array.isArray(interrogation?.targetUsers) && interrogation.targetUsers.length > 0;
    const hasProblem = Boolean(interrogation?.problem && interrogation.problem.trim());
    const hasUniqueness = Boolean(interrogation?.uniqueValue && interrogation.uniqueValue.trim());

    const audience = (interrogation?.targetUsers || []).join(', ') || 'Not clearly defined';
    const problem = interrogation?.problem || 'Not clearly defined';
    const uniqueness = interrogation?.uniqueValue || 'Limited information';

    const trendCount = Array.isArray(research?.trends)
      ? research.trends.length
      : Array.isArray(research?.marketTrends)
        ? research.marketTrends.length
        : 0;
    const competitorCount = Array.isArray(research?.competitors) ? research.competitors.length : 0;
    const hasMarketGap = Boolean(research?.marketGap);
    const userInsightFields = [
      research?.userInsights?.painPoint,
      research?.userInsights?.behavior,
      research?.userInsights?.willingness
    ].filter(Boolean).length;

    const researchQuality = (
      Math.min(trendCount, 3) / 3 +
      Math.min(competitorCount, 3) / 3 +
      (hasMarketGap ? 1 : 0) +
      userInsightFields / 3
    ) / 4;

    const researchSummary = {
      trends: Array.isArray(research?.trends)
        ? research.trends.join(', ')
        : Array.isArray(research?.marketTrends)
          ? research.marketTrends.join(', ')
          : 'Not provided',
      competitors: Array.isArray(research?.competitors)
        ? research.competitors
            .map((c) => (typeof c === 'object' && c !== null ? c.name || c.title || 'Competitor' : String(c)))
            .join(', ')
        : 'Not provided',
      marketGap: research?.marketGap || 'Not provided'
    };

    const prompt = `You are a startup validation engine.

Your job is to evaluate a startup idea and return STRICTLY valid JSON.

IMPORTANT RULES:
- Return ONLY JSON
- Do NOT include any explanation
- Do NOT include text before or after JSON
- Do NOT use markdown
- Ensure the JSON is valid and parseable

Evaluate the idea:

Audience: ${audience}
Problem: ${problem}
Uniqueness: ${uniqueness}
User Type: ${userType || 'General'}

Research Context:
Market Trends: ${researchSummary.trends}
Competitors: ${researchSummary.competitors}
Market Gap: ${researchSummary.marketGap}

Scoring rules:
- Demand: How strong the market need is (1-10)
- Competition: How saturated the market is (1-10)
- Feasibility: How easy it is to build (1-10)

Decision rules:
- BUILD → average ≥ 7
- IMPROVE → average between 4 and 6
- KILL → average < 4

Return ONLY this JSON format:

{
  "demand": number,
  "competition": number,
  "feasibility": number,
  "score": number,
  "decision": "BUILD" | "IMPROVE" | "KILL"
}`;

    // Wrap the API call in a retry loop
    return await validationService.withRetry(async () => {
      try {
        const result = await requestJson({
          systemPrompt: 'You are a startup validation engine. Return ONLY valid JSON matching the requested schema.',
          userPrompt: prompt,
          temperature: 0.3,
          maxTokens: 500
        });

        const demandMetric = validationService.parseMetric(result?.demand, 5);
        const competitionMetric = validationService.parseMetric(result?.competition, 5);
        const feasibilityMetric = validationService.parseMetric(result?.feasibility, 5);

        const demand = demandMetric.value;
        const competition = competitionMetric.value;
        const feasibility = feasibilityMetric.value;

        // Competition represents market saturation (higher = worse), so invert before averaging.
        const effectiveCompetition = 11 - competition;

        // Enforce score and decision deterministically from metrics.
        const calculatedScore = Number(((demand + effectiveCompetition + feasibility) / 3).toFixed(1));
        const score = validationService.clamp(calculatedScore, 1, 10);
        const decision = validationService.getDecisionByScore(score);

        const modelScore = validationService.parseNumber(result?.score, NaN);
        const confidence = validationService.computeConfidence({
          score,
          modelScore,
          researchQuality,
          hasAudience,
          hasProblem,
          hasUniqueness,
          demand,
          competition,
          feasibility,
          demandValid: demandMetric.isValid,
          competitionValid: competitionMetric.isValid,
          feasibilityValid: feasibilityMetric.isValid
        });

        const confidenceBand = confidence >= 65 ? '65-85' : confidence >= 50 ? '50-70' : '35-55';
        const reasoning =
          result?.reasoning ||
          `Demand ${demand}/10, competition saturation ${competition}/10 (effective ${effectiveCompetition}/10), feasibility ${feasibility}/10 produced an average score of ${score}.`;

        const recommendations =
          decision === 'BUILD'
            ? ['Build an MVP quickly', 'Run pilot with early users', 'Track retention and unit economics weekly']
            : decision === 'IMPROVE'
              ? ['Refine target audience and positioning', 'Strengthen uniqueness against competitors', 'Validate willingness to pay before full build']
              : ['Reassess the core problem urgency', 'Narrow to a sharper niche', 'Test alternative value proposition before building'];

        return {
          validatorVersion,
          demand,
          competition,
          feasibility,
          score,
          decision,
          confidence,
          confidenceBand,
          reasoning,
          metrics: {
            marketFit: demand,
            technicalFeasibility: feasibility,
            userClarity: validationService.clamp(Math.round((demand + feasibility) / 2), 1, 10),
            competitiveAdvantage: validationService.clamp(11 - competition, 1, 10)
          },
          recommendations
        };
      } catch (error) {
        console.error('Validation API error:', formatOpenRouterError(error));
        throw new Error('Validation generation failed'); 
      }
    });
  }
};

module.exports = validationService;
