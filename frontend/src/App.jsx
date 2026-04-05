import { useEffect, useState } from 'react'

const infoCards = [
  {
    title: 'How Workflow Works',
    description:
      'Interrogation, validation, market research, and execution planning are combined into one guided pipeline.'
  },
  {
    title: 'Model Usage',
    description:
      'The model converts your natural prompt into structured decision data, risk signals, and practical build steps.'
  },
  {
    title: 'Why Use This',
    description:
      'You avoid wasted effort, test ideas earlier, and move into execution with clearer confidence and direction.'
  }
]

const workflowSteps = [
  'Interrogating the business idea...',
  'Validating market potential...',
  'Conducting competitive research...',
  'Generating project roadmap...',
  'Drafting content and learning path...',
  'Finalizing execution package...'
]

function App() {
  const [view, setView] = useState('landing')
  const [activeOutputTab, setActiveOutputTab] = useState('overview')
  const [formData, setFormData] = useState({
    idea: '',
    userType: 'student'
  })
  const [loading, setLoading] = useState(false)
  const [pipelineProgress, setPipelineProgress] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    let intervalId

    if (loading) {
      setPipelineProgress(0)
      intervalId = setInterval(() => {
        setPipelineProgress((prev) => {
          if (prev < workflowSteps.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, 3500)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [loading])

  const getOutputSections = (payload) => {
    if (!payload) return []

    const execution = payload.executionPackage || {}
    const decision = payload.buildScore?.decision || execution.validation?.decision || 'N/A'

    const sections = [
      {
        id: 'overview',
        label: 'Overview',
        data: {
          stage: payload.stage || 'COMPLETED',
          userType: payload.userType || formData.userType,
          decision,
          confidenceLevel: payload.buildScore?.confidenceLevel || 'N/A',
          marketPotential: payload.buildScore?.marketPotential || 'N/A'
        }
      }
    ]

    Object.entries(execution).forEach(([key, value]) => {
      sections.push({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        data: value
      })
    })

    return sections
  }

  const renderCardValue = (value) => {
    if (value === null || value === undefined) {
      return <p className="text-sm text-slate-400">N/A</p>
    }

    if (Array.isArray(value)) {
      if (!value.length) return <p className="text-sm text-slate-400">No data</p>

      return (
        <ul className="space-y-2 text-sm text-slate-200">
          {value.map((item, index) => (
            <li key={index} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              {typeof item === 'object' ? JSON.stringify(item) : String(item)}
            </li>
          ))}
        </ul>
      )
    }

    if (typeof value === 'object') {
      return (
        <pre className="overflow-auto rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-200">
          {JSON.stringify(value, null, 2)}
        </pre>
      )
    }

    return <p className="text-sm text-slate-100">{String(value)}</p>
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.idea.trim()) {
      setError('Please enter a prompt to generate output data.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://localhost:5000/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      setResult(data.data)
      setActiveOutputTab('overview')
    } catch (err) {
      setError(err.message || 'An error occurred while generating output data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-20 top-28 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur-xl">
          Build or Kill AI
        </div>

        <nav className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <button
            onClick={() => setView('landing')}
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => setView('app')}
            className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Workflow
          </button>
          <button
            onClick={() => setView('app')}
            className="rounded-xl border border-indigo-300/30 bg-gradient-to-r from-indigo-500/90 to-blue-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(73,105,255,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(73,105,255,0.6)]"
          >
            Create Project
          </button>
        </nav>
      </header>

      {view === 'landing' ? (
        <main className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-16 pt-6">
          <section className="animate-[fadeUp_700ms_ease-out] rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight text-white md:text-6xl">
              Turn ideas into clear build decisions
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Share your concept and get structured output data: viability signals, risk areas, research direction,
              and practical execution guidance without losing weeks in blind iteration.
            </p>
            <button
              onClick={() => setView('app')}
              className="mt-8 rounded-2xl border border-indigo-300/35 bg-gradient-to-r from-indigo-500 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(73,105,255,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_10px_34px_rgba(73,105,255,0.65)]"
            >
              Create Project
            </button>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-3">
            {infoCards.map((card, index) => (
              <article
                key={card.title}
                className="animate-[fadeUp_800ms_ease-out] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-indigo-300/30 hover:shadow-[0_14px_36px_rgba(70,95,255,0.25)]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{card.description}</p>
              </article>
            ))}
          </section>
        </main>
      ) : (
        <main className="mx-auto w-full max-w-3xl px-6 pb-16 pt-6">
          <section className="animate-[fadeUp_700ms_ease-out] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <h2 className="text-2xl font-semibold text-white">Create a Project</h2>
            <p className="mt-2 text-sm text-slate-300">Enter your prompt to generate structured output data.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="idea" className="mb-2 block text-sm font-medium text-slate-200">
                  Project Prompt
                </label>
                <textarea
                  id="idea"
                  name="idea"
                  rows={5}
                  value={formData.idea}
                  onChange={handleInputChange}
                  placeholder="Describe your idea, users, and expected outcome..."
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none backdrop-blur-xl transition focus:border-indigo-300/45 focus:ring-2 focus:ring-indigo-400/30"
                />
              </div>

              <div>
                <label htmlFor="userType" className="mb-2 block text-sm font-medium text-slate-200">
                  Role
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none backdrop-blur-xl transition focus:border-indigo-300/45 focus:ring-2 focus:ring-indigo-400/30"
                >
                  <option value="student" className="bg-slate-900 text-slate-100">Student</option>
                  <option value="founder" className="bg-slate-900 text-slate-100">Founder</option>
                  <option value="creator" className="bg-slate-900 text-slate-100">Creator</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl border border-indigo-300/35 bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(73,105,255,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_10px_34px_rgba(73,105,255,0.65)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Get Output Data
              </button>
            </form>
          </section>

          {loading && (
            <section className="mt-5 animate-[fadeUp_500ms_ease-out] rounded-3xl border border-indigo-300/25 bg-indigo-500/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-indigo-200">Pipeline execution in progress</h3>
                <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                  Step {pipelineProgress + 1} / {workflowSteps.length}
                </span>
              </div>

              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 ease-out"
                  style={{ width: `${((pipelineProgress + 1) / workflowSteps.length) * 100}%` }}
                />
              </div>

              <div className="space-y-3">
                {workflowSteps.map((step, index) => {
                  const isDone = index < pipelineProgress
                  const isActive = index === pipelineProgress

                  return (
                    <div key={step} className="flex items-center gap-3 text-sm">
                      {isDone ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                          ✓
                        </div>
                      ) : isActive ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-300/30 border-t-indigo-300" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-500/60" />
                      )}
                      <span
                        className={
                          isDone
                            ? 'text-slate-200'
                            : isActive
                              ? 'font-medium text-indigo-200'
                              : 'text-slate-400'
                        }
                      >
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {error && (
            <section className="mt-5 rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-xl">
              {error}
            </section>
          )}

          {result && (() => {
            const sections = getOutputSections(result)
            const currentSection = sections.find((section) => section.id === activeOutputTab) || sections[0]
            const currentData = currentSection?.data
            const entries = currentData && typeof currentData === 'object' && !Array.isArray(currentData)
              ? Object.entries(currentData)
              : [['data', currentData]]

            return (
              <section className="mt-5 animate-[fadeUp_500ms_ease-out] rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Output Data</h3>
                  <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                    {result?.stage || 'COMPLETED'}
                  </span>
                </div>

                <nav className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/20 p-2 backdrop-blur-xl">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveOutputTab(section.id)}
                      className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
                        activeOutputTab === section.id
                          ? 'border border-indigo-300/30 bg-gradient-to-r from-indigo-500/90 to-blue-500/90 text-white'
                          : 'border border-transparent bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>

                <div className="grid gap-4 sm:grid-cols-2">
                  {entries.map(([key, value]) => (
                    <article
                      key={key}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(70,95,255,0.2)]"
                    >
                      <h4 className="mb-2 text-sm font-semibold text-indigo-200">
                        {String(key).replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                      </h4>
                      {renderCardValue(value)}
                    </article>
                  ))}
                </div>
              </section>
            )
          })()}
        </main>
      )}
    </div>
  )
}

export default App
