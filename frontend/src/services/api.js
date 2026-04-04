import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const submitWorkflow = async (payload) => {
  try {
    const response = await apiClient.post('/workflow', payload)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'API request failed')
  }
}
