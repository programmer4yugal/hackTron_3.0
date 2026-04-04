const axios = require('axios');

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_CANDIDATES = (process.env.OPENROUTER_MODELS || 'openai/gpt-4o-mini,openai/gpt-3.5-turbo,mistralai/mistral-7b-instruct')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

const extractJsonText = (raw) => {
  if (!raw || typeof raw !== 'string') {
    throw new Error('Empty response content from OpenRouter');
  }

  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const firstObject = cleaned.indexOf('{');
  const lastObject = cleaned.lastIndexOf('}');
  if (firstObject !== -1 && lastObject !== -1 && lastObject > firstObject) {
    return cleaned.slice(firstObject, lastObject + 1);
  }

  const firstArray = cleaned.indexOf('[');
  const lastArray = cleaned.lastIndexOf(']');
  if (firstArray !== -1 && lastArray !== -1 && lastArray > firstArray) {
    return cleaned.slice(firstArray, lastArray + 1);
  }

  return cleaned;
};

const formatOpenRouterError = (error) => {
  const status = error?.response?.status;
  const payload = error?.response?.data;
  const message = payload?.error?.message || error?.message || 'Unknown OpenRouter error';
  return `status=${status || 'N/A'} message=${message}`;
};

const requestJson = async ({ systemPrompt, userPrompt, maxTokens = 600, temperature = 0.7 }) => {
  if (!API_KEY) {
    throw new Error('OPENROUTER_API_KEY is missing. Add it to backend/.env');
  }

  let lastError = null;

  for (const model of MODEL_CANDIDATES) {
    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature,
          max_tokens: maxTokens
        },
        {
          timeout: 30000,
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5000',
            'X-Title': 'Build or Kill AI'
          }
        }
      );

      const content = response?.data?.choices?.[0]?.message?.content;
      const jsonText = extractJsonText(content);
      return JSON.parse(jsonText);
    } catch (error) {
      lastError = error;
      const status = error?.response?.status;
      const shouldTryNextModel = status === 400 || status === 404 || status === 422;
      if (!shouldTryNextModel) {
        break;
      }
    }
  }

  throw lastError || new Error('OpenRouter request failed');
};

module.exports = {
  requestJson,
  formatOpenRouterError
};
