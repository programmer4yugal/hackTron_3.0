export default function ResultDisplay({ results }) {
  const renderSection = (title, data) => {
    if (!data) return null

    return (
      <div className="result-section">
        <h3>{title}</h3>
        {typeof data === 'object' ? (
          <pre className="result-content">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p className="result-content">{data}</p>
        )}
      </div>
    )
  }

  return (
    <div className="result-display">
      {renderSection('🎯 Decision', results.decision)}
      {renderSection('🔍 Interrogation', results.interrogation)}
      {renderSection('✅ Validation', results.validation)}
      {renderSection('📚 Research', results.research)}
      {renderSection('📋 Project Plan', results.project)}
      {renderSection('✍️ Content', results.content)}
      {renderSection('🧠 Learning', results.learning)}
    </div>
  )
}
