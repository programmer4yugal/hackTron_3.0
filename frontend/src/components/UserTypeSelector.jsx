export default function UserTypeSelector({ value, onChange }) {
  const userTypes = [
    { id: 'student', label: '🎓 Student' },
    { id: 'founder', label: '👨‍💼 Founder' },
    { id: 'creator', label: '🎨 Creator' }
  ]

  return (
    <div className="user-type-container">
      <label>I am a</label>
      <div className="user-type-options">
        {userTypes.map(type => (
          <button
            key={type.id}
            className={`user-type-btn ${value === type.id ? 'active' : ''}`}
            onClick={() => onChange(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  )
}
