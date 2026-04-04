const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY_HERE';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const learningService = {
  createLearningPath: async (project, research, userType) => {
    try {
      const prompt = `Create a learning path for: "${project.title}"
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

      const response = await axios.post(OPENAI_ENDPOINT, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an education strategist. Return ONLY valid JSON, no markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content.trim();
      const result = JSON.parse(content);
      
      // Try to fetch real YouTube videos if API key is set
      if (YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY_HERE') {
        result.videoResources = await fetchYouTubeVideos(project.title, userType);
      } else {
        result.videoResources = generateVideoFallback(project.title, userType);
      }
      
      return result;
    } catch (error) {
      console.error('Learning path API error:', error.message);
      return getFallbackLearningPath(project, userType);
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
    console.error('YouTube API error:', error.message);
    return generateVideoFallback(projectTitle, userType);
  }
}

function generateVideoFallback(projectTitle, userType) {
  return [
    {
      title: `Getting Started with ${projectTitle}`,
      url: 'https://youtube.com/results?search_query=' + encodeURIComponent(projectTitle),
      channel: 'Tutorial Channel'
    },
    {
      title: `Advanced ${projectTitle} for ${userType}s`,
      url: 'https://youtube.com/results?search_query=' + encodeURIComponent(projectTitle + ' advanced'),
      channel: 'Pro Tips'
    }
  ];
}

function getSkillsList(userType) {
  const skills = {
    student: 'Full-stack dev, Database design, API development',
    founder: 'Customer discovery, Business models, Finance',
    creator: 'Content strategy, Video production, Growth hacking'
  };
  return skills[userType] || skills.student;
}

function getFallbackLearningPath(project, userType) {
  return {
    title: `${project.title || 'Project'} - Learning Path`,
    skillsRequired: getDefaultSkills(userType),
    courses: getDefaultCourses(userType),
    resources: getDefaultResources(userType),
    milestones: getDefaultMilestones(userType),
    estimatedHours: getDefaultHours(userType),
    difficulty: getDefaultDifficulty(userType),
    tools: getDefaultTools(userType),
    communities: getDefaultCommunities(userType),
    mentorship: getDefaultMentorship(userType),
    videoResources: generateVideoFallback(project.title, userType)
  };
}

function getDefaultSkills(userType) {
  const skills = {
    student: ['Full-stack dev', 'Database design', 'API development', 'DevOps basics'],
    founder: ['Customer discovery', 'Business models', 'Finance', 'Pitching'],
    creator: ['Content strategy', 'Video production', 'Growth hacking', 'Monetization']
  };
  return skills[userType] || skills.student;
}

function getDefaultCourses(userType) {
  const courses = {
    student: [
      { name: 'Complete Web Dev', platform: 'Udemy', hours: 50, cost: '$15' },
      { name: 'JavaScript Algorithms', platform: 'Udemy', hours: 30, cost: '$15' }
    ],
    founder: [
      { name: 'How to Start a Startup', platform: 'Y Combinator', hours: 10, cost: 'Free' },
      { name: 'Startup School', platform: 'Y Combinator', hours: 30, cost: 'Free' }
    ],
    creator: [
      { name: 'YouTube Growth', platform: 'Skillshare', hours: 15, cost: '$32/mo' },
      { name: 'Personal Branding', platform: 'LinkedIn', hours: 8, cost: '$20/mo' }
    ]
  };
  return courses[userType] || courses.student;
}

function getDefaultResources(userType) {
  const resources = {
    student: ['MDN Web Docs', 'Stack Overflow', 'Dev.to', 'GitHub', 'freeCodeCamp'],
    founder: ['Y Combinator Blog', 'AngelList', 'Crunchbase', 'Podcasts'],
    creator: ['YouTube Creator Academy', 'Canva', 'CreatorOS', 'VidIQ']
  };
  return resources[userType] || resources.student;
}

function getDefaultMilestones(userType) {
  const milestones = {
    student: ['Week 1: Setup', 'Week 2: First feature', 'Week 4: 80% complete', 'Week 6: Deploy', 'Week 8: Done'],
    founder: ['Week 1: Interviews', 'Week 2: Business model', 'Week 4: Finance', 'Week 8: Pitch deck'],
    creator: ['Week 1: Plan', 'Week 2: 3 pieces', 'Week 4: 1K followers', 'Week 13: $1K/mo']
  };
  return milestones[userType] || milestones.student;
}

function getDefaultHours(userType) {
  return { student: 80, founder: 60, creator: 50 }[userType] || 60;
}

function getDefaultDifficulty(userType) {
  return { student: 'Intermediate', founder: 'Intermediate', creator: 'Beginner' }[userType] || 'Intermediate';
}

function getDefaultTools(userType) {
  const tools = {
    student: ['VS Code', 'Git', 'npm', 'Docker', 'Figma', 'Postman'],
    founder: ['Notion', 'Figma', 'Google Sheets', 'Stripe', 'LinkedIn'],
    creator: ['Canva', 'Adobe Suite', 'CapCut', 'Buffer', 'ConvertKit']
  };
  return tools[userType] || tools.student;
}

function getDefaultCommunities(userType) {
  const communities = {
    student: ['Dev.to', 'GitHub', 'r/learnprogramming', 'Discord', 'Hashnode'],
    founder: ['Y Combinator', 'Startup Grind', 'Growth Hackers', 'Product Hunt'],
    creator: ['r/ContentCreators', 'Creator Discord', 'YouTubers Guild', 'Indie Hackers']
  };
  return communities[userType] || communities.student;
}

function getDefaultMentorship(userType) {
  const mentorship = {
    student: { type: 'Senior developer', value: 'Code review, career guidance' },
    founder: { type: 'Founder mentor', value: 'Strategy, investor intros' },
    creator: { type: 'Successful creator', value: 'Growth tips, monetization' }
  };
  return mentorship[userType] || mentorship.student;
}

module.exports = learningService;
