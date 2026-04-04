import { useState } from 'react'
import IdeaInput from '../components/IdeaInput'
import UserTypeSelector from '../components/UserTypeSelector'
import ResultDisplay from '../components/ResultDisplay'
import WorkflowStep from '../components/WorkflowStep'
import { submitWorkflow } from '../services/api'

export default function Home() {
  const [idea, setIdea] = useState('')
  const [userType, setUserType] = useState('student')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError('Please enter an idea')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await submitWorkflow({ idea, userType })
      setResults(data)
    } catch (err) {
      setError(err.message || 'Failed to process workflow')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>🚀 AI Workflow System</h1>
        <p>Transform your idea into actionable insights</p>
      </header>

      <main className="main-content">
        {!results ? (
          <div className="input-section">
            <IdeaInput value={idea} onChange={setIdea} />
            <UserTypeSelector value={userType} onChange={setUserType} />
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              className="submit-btn" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Analyze Idea'}
            </button>
          </div>
        ) : (
          <div className="results-section">
            <button 
              className="back-btn"
              onClick={() => {
                setResults(null)
                setIdea('')
                setError(null)
              }}
            >
              ← New Idea
            </button>
            
            <div className="workflow-visualization">
              <h2>Workflow Pipeline</h2>
              <div className="workflow-steps">
                <WorkflowStep step="Idea" status="complete" />
                <WorkflowStep step="Interrogation" status="complete" />
                <WorkflowStep step="Validation" status="complete" />
                <WorkflowStep step="Research" status="complete" />
                <WorkflowStep step="Project" status="complete" />
                <WorkflowStep step="Content" status="complete" />
                <WorkflowStep step="Learning" status="complete" />
              </div>
            </div>

            <ResultDisplay results={results} />
          </div>
        )}
      </main>
    </div>
  )
}
