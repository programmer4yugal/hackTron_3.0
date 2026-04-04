const interrogationService = {
  interrogateIdea: async (idea, userType) => {
    // Simple processing - no need to overthink
    await new Promise(resolve => setTimeout(resolve, 250));

    const targetUsers = {
      student: ['CS Students', 'Bootcamp Grads', 'Junior Developers'],
      founder: ['Early-stage Founders', 'Solo Entrepreneurs', 'Idea Generators'],
      creator: ['Content Creators', 'YouTubers', 'Digital Entrepreneurs']
    };

    return {
      problem: `The core issue: ${idea.toLowerCase().includes('ai') ? 'manual processes slowing down work' : 'inefficient workflows'}`,
      targetUsers: targetUsers[userType] || targetUsers.student,
      uniqueValue: 'Faster validation, clearer roadmap, less wasted time',
      marketSize: estimateMarketSize(userType),
      competitors: ['ChatGPT', 'Notion', 'Manual process'],
      riskFactors: ['Market saturation', 'Execution complexity', 'User adoption'],
      assumptions: [
        'Target users face this problem regularly',
        'They will pay for a solution',
        'The solution can be built in reasonable time'
      ],
      followupQuestions: getFollowupQuestions(userType)
    };
  }
};

function estimateMarketSize(userType) {
  const sizes = {
    student: { TAM: '$2B', SAM: '$400M', SOM: '$40M' },
    founder: { TAM: '$5B', SAM: '$1.5B', SOM: '$150M' },
    creator: { TAM: '$8B', SAM: '$2B', SOM: '$200M' }
  };
  return sizes[userType] || sizes.student;
}

function getFollowupQuestions(userType) {
  const questions = {
    student: ['How does this fit your portfolio?', 'Will you share with peers?'],
    founder: ['What is your GTM?', 'Customer validation done?'],
    creator: ['Current audience size?', 'Time spent planning?']
  };
  return questions[userType] || questions.student;
}

module.exports = interrogationService;
