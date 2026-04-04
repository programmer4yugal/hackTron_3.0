const validationService = {
  validateIdea: async (interrogation, userType) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    let score = 5;
    
    // Score based on interrogation analysis
    if (interrogation.uniqueValue && interrogation.uniqueValue.length > 20) score += 1;
    if (interrogation.competitors && interrogation.competitors.length > 0) score += 0.5;
    if (userType === 'founder') score += 1;
    if (interrogation.riskFactors && interrogation.riskFactors.length > 3) score -= 0.5;

    score = Math.min(Math.max(score, 1), 10);
    const decision = score >= 6 ? 'BUILD' : 'KILL';

    return {
      score,
      decision,
      confidence: Math.round((score / 10) * 100),
      reasoning: decision === 'BUILD' 
        ? 'Good opportunity - clear market, viable skillset, reasonable timeline'
        : `Low viability (${score}/10). Consider pivoting or gathering more validation.`,
      metrics: {
        marketFit: Math.floor(Math.random() * 3) + 6,
        technicalFeasibility: Math.floor(Math.random() * 3) + 6,
        userClarity: Math.floor(Math.random() * 3) + 6,
        competitiveAdvantage: Math.floor(Math.random() * 3) + 5
      },
      recommendations: getRecommendations(score, userType)
    };
  }
};

function getRecommendations(score, userType) {
  const base = [
    'Validate core assumption with target users',
    'Define MVP scope clearly',
    'Research competitors thoroughly'
  ];

  if (score >= 8) {
    base.push('This is strong - prioritize execution');
  } else if (score >= 6) {
    base.push('Viable but needs refinement on UVP');
  } else {
    base.push('High risk - reconsider or pivot');
  }

  if (userType === 'founder') {
    base.push('Create financial projections');
  } else if (userType === 'student') {
    base.push('Start with GitHub portfolio');
  }

  return base;
}

module.exports = validationService;
