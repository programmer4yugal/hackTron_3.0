const config = {
  apiKeys: {
    openrouter: process.env.OPENROUTER_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    serper: process.env.SERPER_API_KEY,
    youtube: process.env.YOUTUBE_API_KEY,
    stripe: process.env.STRIPE_API_KEY
  },

  apiBaseUrls: {
    openrouter: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    openai: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    serper: process.env.SERPER_BASE_URL || 'https://google.serper.dev/search',
    youtube: process.env.YOUTUBE_BASE_URL || 'https://www.googleapis.com/youtube/v3'
  },

  services: {
    timeout: Number(process.env.SERVICE_TIMEOUT_MS || 30000),
    retries: Number(process.env.SERVICE_RETRIES || 2),
    cache: (process.env.SERVICE_CACHE || 'false').toLowerCase() === 'true'
  }
};

module.exports = config;
