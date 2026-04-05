import React from "react";

export default function Landing() {
	return (
		<main className="prose max-w-4xl mx-auto p-6">
			<h1>Build or Kill AI</h1>

			<p>
				A full-stack AI workflow application that converts a raw idea into a
				structured execution package. The project is designed to protect the
				core essence of an idea while forcing practical validation before deeper
				execution planning.
			</p>

			<h2>1) Project Goal</h2>
			<p>
				<strong>Input:</strong> one idea prompt + user persona.
				<br />
				<strong>Output:</strong> a pipeline-driven decision package containing:
			</p>
			<ul>
				<li>Problem and user interrogation</li>
				<li>Build or Kill validation</li>
				<li>Market research framing</li>
				<li>Project execution plan</li>
				<li>Marketing content assets</li>
				<li>Learning path with optional YouTube resources</li>
			</ul>

			<h2>2) Tech Stack</h2>
			<h3>Frontend</h3>
			<ul>
				<li>React 19</li>
				<li>Vite 8</li>
				<li>Tailwind CSS v4 (via @tailwindcss/vite)</li>
				<li>Native Fetch API for backend communication</li>
			</ul>

			<h3>Backend</h3>
			<ul>
				<li>Node.js + Express</li>
				<li>Axios for outbound API calls</li>
				<li>CORS middleware</li>
				<li>dotenv for environment-based configuration</li>
			</ul>

			<h3>Runtime / Tooling</h3>
			<ul>
				<li>nodemon (backend dev)</li>
				<li>ESLint (frontend linting)</li>
			</ul>

			<h2>3) High-Level Workflow</h2>
			<p>Pipeline order:</p>
			<ol>
				<li>Interrogation</li>
				<li>Validation</li>
				<li>Research</li>
				<li>Project Planning</li>
				<li>Content Generation</li>
				<li>Learning Path</li>
			</ol>
			<p>
				The backend orchestrator is deterministic in order and composes each
				step from previous outputs, not from random disconnected prompts.
			</p>

			<h2>4) How the Pipeline Preserves the Real Essence</h2>
			<ul>
				<li>
					Stage 1 extracts core meaning from the raw idea into structured
					fields (problem, target users, unique value, risks, assumptions).
				</li>
				<li>
					Every later stage consumes this structured context instead of
					reinterpreting the raw idea independently.
				</li>
				<li>
					Validation is based on interrogation artifacts, so the Build or Kill
					decision is tied to discovered user/problem clarity.
				</li>
				<li>
					Research, project planning, and content are generated from the same
					canonical idea representation.
				</li>
				<li>Learning path is aligned with project outputs and user persona.</li>
			</ul>

			<h2>5) APIs Used by Each Service</h2>
			<h3>A) OpenRouter Chat Completions API</h3>
			<p>Endpoint: https://openrouter.ai/api/v1/chat/completions</p>
			<p>Used by: Interrogation, Validation, Research, Project, Content, Learning</p>
			<p>Implementation notes:</p>
			<ul>
				<li>JSON-only response contract is enforced through prompts.</li>
				<li>
					The OpenRouter service strips markdown code fences and extracts first
					valid JSON block.
				</li>
				<li>Multi-model fallback via OPENROUTER_MODELS.</li>
			</ul>

			<h3>B) YouTube Data API v3</h3>
			<p>Endpoint: https://www.googleapis.com/youtube/v3/search</p>
			<p>Used by: Learning Service only</p>
			<p>
				Behavior: If YOUTUBE_API_KEY is valid, enriches learning output with
				videoResources; otherwise returns an empty array without crashing.
			</p>

			<h3>C) Configured but Not Actively Used</h3>
			<ul>
				<li>OpenAI API</li>
				<li>Serper API</li>
				<li>Stripe API</li>
			</ul>

			<h2>6) Backend Request/Response Contract</h2>
			<p>
				Base URL: <strong>http://localhost:5000</strong>
			</p>
			<p>Health: GET /health</p>
			<p>Main Workflow Endpoint: POST /api/workflow</p>
			<p>Request body:</p>
			<pre>{`{ "idea": "Your startup/product idea", "userType": "student | founder | creator" }`}</pre>
			<p>Validation rules: idea and userType required; userType must be student, founder, or creator.</p>

			<h2>7) Frontend UX Flow</h2>
			<p>The frontend currently includes:</p>
			<ul>
				<li>Landing view with product messaging and CTA</li>
				<li>Workflow form for idea + role</li>
				<li>Loading state with pipeline-progress simulation steps</li>
				<li>Structured output section with tab navigation and card-based rendering</li>
			</ul>

			<h2>8) Monorepo Structure</h2>
			<pre>
{`- backend/
	- server.js
	- src/app.js
	- src/routes/workflow.route.js
	- src/controllers/workflow.controller.js
	- src/services/*
- frontend/
	- src/App.jsx
	- src/index.css
	- vite.config.js`}
			</pre>

			<h2>9) Environment Variables</h2>
			<p>Create backend/.env with at least:</p>
			<pre>{`PORT=5000
OPENROUTER_API_KEY=your_key_here`}</pre>

			<h2>10) Run Locally</h2>
			<p>Backend:</p>
			<pre>{`cd backend
npm install
npm run dev`}</pre>
			<p>Frontend:</p>
			<pre>{`cd frontend
npm install
npm run dev`}</pre>

			<h2>11) Scripts</h2>
			<p>Backend: npm start, npm run dev</p>
			<p>Frontend: npm run dev, npm run build, npm run lint, npm run preview</p>

			<h2>12) Practical Notes (PS)</h2>
			<ul>
				<li>The backend is stateless and currently does not persist outputs.</li>
				<li>Pipeline stages are sequential and synchronous from client perspective.</li>
				<li>AI outputs depend on model quality; JSON extraction hardening is included in openrouter service.</li>
				<li>YouTube enrichment is best-effort and non-blocking.</li>
				<li>Frontend progress tracker is time-based simulation; for realtime use SSE/WebSockets.</li>
			</ul>

			<h2>13) Suggested Next Improvements</h2>
			<ol>
				<li>Add SSE/WebSocket events from backend for real progress per stage.</li>
				<li>Add persistent storage for execution packages and history.</li>
				<li>Add auth and per-user quotas.</li>
				<li>Add retry/backoff + circuit-breaking around external APIs.</li>
				<li>Add schema validation (zod/joi) for strict response contracts.</li>
				<li>Add automated integration tests for COMPLETE and TERMINATED branches.</li>
			</ol>

			<h2>14) License</h2>
			<p>MIT</p>
		</main>
	);
}