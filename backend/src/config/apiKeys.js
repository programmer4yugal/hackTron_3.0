// API Configuration
// Future: Add real API integrations here

const config = {
  // Placeholder for future integrations
  apiKeys: {
    // openai: process.env.OPENAI_API_KEY,
    // serper: process.env.SERPER_API_KEY,
    // stripe: process.env.STRIPE_API_KEY,
  },

  apiBaseUrls: {
    // openai: 'https://api.openai.com/v1',
    // serper: 'https://google.serper.dev/search',
  },

  // Service configuration
  services: {
    timeout: 5000,
    retries: 3,
    cache: false
  }
};

module.exports = config;
