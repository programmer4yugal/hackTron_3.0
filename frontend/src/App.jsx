import { useState } from 'react'
import './App.css'

// Helper function to render data nicely
const renderValue = (value) => {
  if (value === null || value === undefined) {
    return <span className="value-null">—</span>
  }
  
  if (typeof value === 'boolean') {
    return <span className={`value-${value}`}>{value ? 'Yes' : 'No'}</span>
  }
  
  if (typeof value === 'number') {
    return <span className="value-number">{value}</span>
  }
  
  return <span className="value-text">{String(value)}</span>
}

const renderArray = (arr, title = null) => {
  if (!Array.isArray(arr) || arr.length === 0) return null
  
  return (
    <div className="array-section">
      {title && <div className="section-title">{title}</div>}
      <ul className="array-list">
        {arr.map((item, idx) => (
          <li key={idx} className="array-item">
            {typeof item === 'object' ? renderObject(item) : renderValue(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}

const renderObject = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return renderValue(obj)
  }

  if (Array.isArray(obj)) {
    return renderArray(obj)
  }

  return (
    <div className="object-section">
      {Object.entries(obj).map(([key, value], idx) => (
        <div key={idx} className="object-item">
          <div className="item-key">{key}:</div>
          <div className="item-value">
            {Array.isArray(value) ? (
              renderArray(value)
            ) : typeof value === 'object' && value !== null ? (
              renderObject(value)
            ) : (
              renderValue(value)
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const DetailBox = ({ title, data }) => {
  return (
    <div className="detail-box">
      <h4>{title}</h4>
      <div className="detail-content-formatted">
        {renderObject(data)}
      </div>
    </div>
  )
}

function App() {
  const [formData, setFormData] = useState({
    idea: '',
    userType: 'student'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.idea.trim()) {
      setError('Please enter your idea')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:5000/api/workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: formData.idea,
          userType: formData.userType
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process workflow')
      }

      setResult(data.data)
      setError(null)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'An error occurred while processing your idea')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Build or Kill AI</h1>
        <p>Validate your idea and get a comprehensive roadmap</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleSubmit} className="workflow-form">
          <div className="form-group">
            <label htmlFor="idea">Describe Your Idea</label>
            <textarea
              id="idea"
              name="idea"
              value={formData.idea}
              onChange={handleInputChange}
              placeholder="Enter your business or project idea..."
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">I am a</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="founder">Founder</option>
              <option value="creator">Creator</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : 'Analyze Idea'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="results-container">
            <div className="result-header">
              <h2>Workflow Analysis Results</h2>
              <span className={`stage-badge ${result.stage.toLowerCase()}`}>
                {result.stage}
              </span>
            </div>

            {result.stage === 'TERMINATED' ? (
              <div className="terminated-section">
                <div className="decision-badge kill">
                  Recommendation: {result.executionPackage.validation.decision}
                </div>
                <p className="message">{result.message}</p>
              </div>
            ) : (
              <>
                <div className="build-score">
                  <h3>Build Score Analysis</h3>
                  <div className="score-grid">
                    <div className="score-item">
                      <span className="score-label">Market Potential</span>
                      <span className="score-value">{result.buildScore.marketPotential}</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Confidence Level</span>
                      <span className="score-value">{result.buildScore.confidenceLevel}%</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Decision</span>
                      <span className={`decision-badge ${result.buildScore.decision.toLowerCase()}`}>
                        {result.buildScore.decision}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pipeline-section">
                  <h3>Processing Pipeline</h3>
                  <ul className="pipeline-list">
                    {result.pipeline.map((step, index) => (
                      <li key={index} className="pipeline-step">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-name">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="details-section">
                  <h3>Analysis Details</h3>
                  
                  {result.executionPackage.interrogation && (
                    <DetailBox 
                      title="🔍 Interrogation Analysis" 
                      data={result.executionPackage.interrogation}
                    />
                  )}

                  {result.executionPackage.validation && (
                    <DetailBox 
                      title="✓ Validation Results" 
                      data={result.executionPackage.validation}
                    />
                  )}

                  {result.executionPackage.research && (
                    <DetailBox 
                      title="📊 Market Research" 
                      data={result.executionPackage.research}
                    />
                  )}

                  {result.executionPackage.project && (
                    <DetailBox 
                      title="🗺️ Project Roadmap" 
                      data={result.executionPackage.project}
                    />
                  )}

                  {result.executionPackage.content && (
                    <DetailBox 
                      title="📝 Content Strategy" 
                      data={result.executionPackage.content}
                    />
                  )}

                  {result.executionPackage.learning && (
                    <DetailBox 
                      title="📚 Learning Path" 
                      data={result.executionPackage.learning}
                    />
                  )}
                </div>

                <div className="next-steps-section">
                  <h3>Next Steps for {result.userType.charAt(0).toUpperCase() + result.userType.slice(1)}</h3>
                  <ol className="next-steps-list">
                    {result.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </>
            )}

            <button
              onClick={() => {
                setResult(null)
                setFormData({ idea: '', userType: 'student' })
              }}
              className="reset-btn"
            >
              Analyze Another Idea
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
