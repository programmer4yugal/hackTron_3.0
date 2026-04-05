const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function submitWorkflow(idea, userType) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/workflow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea, userType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Workflow failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
