export default function IdeaInput({ value, onChange }) {
  return (
    <div className="idea-input-container">
      <label htmlFor="idea-input">Your Idea</label>
      <textarea
        id="idea-input"
        className="idea-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your idea here... (e.g., 'An AI-powered study assistant for college students')"
        rows="4"
      />
    </div>
  )
}
