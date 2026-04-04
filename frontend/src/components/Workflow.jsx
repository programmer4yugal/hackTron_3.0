export default function WorkflowStep({ step, status }) {
  return (
    <div className={`workflow-step ${status}`}>
      <div className="step-circle">✓</div>
      <div className="step-label">{step}</div>
    </div>
  )
}
