const axios = require('axios');
const { requestJson, formatOpenRouterError } = require('./openrouter.service');

const YOUTUBE_API_KEY = (process.env.YOUTUBE_API_KEY || '').trim().split(/\s+/)[0];
const hasValidYouTubeKey = /^AIza[\w-]{20,}$/.test(YOUTUBE_API_KEY);

const learningService = {
  createLearningPath: async (project, research, userType, interrogation) => {
    try {
      const projectTitle = project?.title || 'Project';
      const problem = interrogation?.problem || 'Not specified';
      const solution = interrogation?.uniqueValue || 'Not specified';

      const prompt = `Create a learning path for: "${projectTitle}"
Problem this solves: "${problem}"
Unique solution: "${solution}"
User type: ${userType}
Skills to develop: [${getSkillsList(userType)}]

Return ONLY valid JSON:
{
  "title": "Learning Path Title",
  "skillsRequired": ["skill1", "skill2"],
  "youtubeSearchQueries": ["precise 3-4 word query for tutorials", "another specific tutorial query"],
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
        const generatedQueries = Array.isArray(result?.youtubeSearchQueries) && result.youtubeSearchQueries.length > 0 
          ? result.youtubeSearchQueries 
          : [];
        result.videoResources = await fetchYouTubeVideos(projectTitle, userType, interrogation, generatedQueries);
      } else {
        console.warn('YouTube API key is missing or invalid format. Returning no video resources.');
        result.videoResources = [];
      }

      const normalizeVideoObject = (item) => {
        if (!item || typeof item !== 'object') return null;
        const url = item.url || item.link || '';
        const title = item.title || item.name || 'Video';
        const isValidUrl =
          typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
        if (!isValidUrl) return null;
        return {
          title,
          url,
          channel: item.channel || item.source || ''
        };
      };

      const fallbackVideos = Array.isArray(result?.videos)
        ? result.videos
            .map((item) => normalizeVideoObject(item))
            .filter(Boolean)
        : [];

      const videoResources = Array.isArray(result?.videoResources)
        ? result.videoResources
            .map((item) => normalizeVideoObject(item))
            .filter(Boolean)
        : [];

      const videos = videoResources.length > 0 ? videoResources : fallbackVideos;
      
      return {
        ...result,
        videoResources,
        videos
      };
    } catch (error) {
      console.error('Learning path API error:', formatOpenRouterError(error));
      throw new Error('Learning path generation failed');
    }
  }
};

async function fetchYouTubeVideos(projectTitle, userType, interrogation = {}, generatedQueries = []) {
  try {
    let queriesToRun = [];

    // Prioritize LLM-generated highly targeted queries
    if (generatedQueries.length > 0) {
      queriesToRun = generatedQueries.slice(0, 2);
    } else {
      // Fallback if LLM failed to provide specific queries 
      const problem = (interrogation?.problem || '').substring(0, 50).trim();
      const solution = (interrogation?.uniqueValue || '').substring(0, 50).trim();
      
      let searchQuery = `${projectTitle} ${userType} tutorial`;
      if (problem && solution) {
        searchQuery = `${solution} solving ${problem} tutorial`.substring(0, 100);
      } else if (problem) {
        searchQuery = `how to solve ${problem} tutorial`.substring(0, 100);
      }
      queriesToRun.push(searchQuery);
    }

    const allVideos = [];
    const seenIds = new Set();

    // Iterate through top queries and fetch top 3 per query
    for (const query of queriesToRun) {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: query,
          part: 'snippet',
          maxResults: 3,
          key: YOUTUBE_API_KEY,
          type: 'video'
        }
      });

      for (const item of response.data.items) {
        const videoId = item.id.videoId;
        if (!seenIds.has(videoId)) {
          seenIds.add(videoId);
          allVideos.push({
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${videoId}`,
            channel: item.snippet.channelTitle
          });
        }
      }
    }

    // Return the top 5 unique, most relevant results
    return allVideos.slice(0, 5);
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
