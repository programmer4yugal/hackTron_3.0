const axios = require('axios');
const { requestJson, formatOpenRouterError } = require('./openrouter.service');

const YOUTUBE_API_KEY = (process.env.YOUTUBE_API_KEY || '').trim().split(/\s+/)[0];
const hasValidYouTubeKey = /^AIza[\w-]{20,}$/.test(YOUTUBE_API_KEY);

const learningService = {
  createLearningPath: async (project, research, userType) => {
    try {
      const projectTitle = project?.title || 'Project';
      const prompt = `Create a learning path for: "${projectTitle}"
User type: ${userType}
Skills to develop: [${getSkillsList(userType)}]

Return ONLY valid JSON:
{
  "title": "Learning Path Title",
  "skillsRequired": ["skill1", "skill2"],
  "courses": [{"name": "Course", "platform": "Platform", "hours": 10, "cost": "$X"}],
  "resources": ["resource1", "resource2"],
  "milestones": ["milestone1", "milestone2"],
  "estimatedHours": 80,
  "difficulty": "Beginner|Intermediate|Advanced",
  "tools": ["tool1", "tool2"],
  "communities": ["community1", "community2"],
  "mentorship": {"type": "Mentor type", "value": "What they help with"}
}`;

      const result = await requestJson({
        systemPrompt: 'You are an education strategist. Return ONLY valid JSON, no markdown.',
        userPrompt: prompt,
        temperature: 0.7,
        maxTokens: 600
      });
      
      // Try to fetch real YouTube videos if API key is set
      if (hasValidYouTubeKey) {
        result.videoResources = await fetchYouTubeVideos(projectTitle, userType);
      } else {
        console.warn('YouTube API key is missing or invalid format. Returning no video resources.');
        result.videoResources = [];
      }
      
      return result;
    } catch (error) {
      console.error('Learning path API error:', formatOpenRouterError(error));
      throw new Error('Learning path generation failed');
    }
  }
};

async function fetchYouTubeVideos(projectTitle, userType) {
  try {
    const searchQuery = `${projectTitle} ${userType} tutorial`;
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: searchQuery,
        part: 'snippet',
        maxResults: 5,
        key: YOUTUBE_API_KEY,
        type: 'video'
      }
    });

    return response.data.items.map(item => ({
      title: item.snippet.title,
      url: `https://youtube.com/watch?v=${item.id.videoId}`,
      channel: item.snippet.channelTitle
    }));
  } catch (error) {
    console.error('YouTube API error:', error.response?.data?.error?.message || error.message);
    return [];
  }
}

function getSkillsList(userType) {
  const skills = {
    student: 'Full-stack dev, Database design, API development',
    founder: 'Customer discovery, Business models, Finance',
    creator: 'Content strategy, Video production, Growth hacking'
  };
  return skills[userType] || skills.student;
}

module.exports = learningService;
