# Build or Kill AI

A full-stack AI workflow application that converts a raw idea into a structured execution package.

The project is designed to protect the core essence of an idea while forcing practical validation before deeper execution planning.

## 1) Project Goal

Input: one idea prompt + user persona.

Output: a pipeline-driven decision package containing:
- Problem and user interrogation
- Build or Kill validation
- Market research framing
- Project execution plan
- Marketing content assets
- Learning path with optional YouTube resources

## 2) Tech Stack

### Frontend
- React 19
- Vite 8
- Tailwind CSS v4 (via @tailwindcss/vite)
- Native Fetch API for backend communication

### Backend
- Node.js + Express
- Axios for outbound API calls
- CORS middleware
- dotenv for environment-based configuration

### Runtime / Tooling
- nodemon (backend dev)
- ESLint (frontend linting)

## 3) High-Level Workflow

Pipeline order:
1. Interrogation
2. Validation
3. Research
4. Project Planning
5. Content Generation
6. Learning Path

The backend orchestrator is deterministic in order and composes each step from previous outputs, not from random disconnected prompts.

## 4) How the Pipeline Preserves the Real Essence

This is the key architectural principle of the project.

- Stage 1 extracts core meaning from the raw idea into structured fields (problem, target users, unique value, risks, assumptions).
- Every later stage consumes this structured context instead of reinterpreting the raw idea independently.
- Validation is based on interrogation artifacts, so the Build or Kill decision is tied to discovered user/problem clarity.
- Research, project planning, and content are generated from the same canonical idea representation.
- Learning path is aligned with project outputs and user persona.

Result: the product avoids drift and keeps one coherent narrative from start to final output.

## 5) APIs Used by Each Service

### A) OpenRouter Chat Completions API
Endpoint:
- https://openrouter.ai/api/v1/chat/completions

Used by:
1. Interrogation Service
- Purpose: convert raw idea to structured business analysis JSON.

2. Validation Service
- Purpose: score viability, return BUILD/KILL, confidence, metrics, recommendations.

3. Research Service
- Purpose: produce trends, competitor framing, market gap, pricing strategy, GTM direction.

4. Project Service
- Purpose: create title, phases, timeline, milestones, resources, budget, team, risks.

5. Content Service
- Purpose: generate pitch, landing copy, social posts, email sequence, tagline, messaging.

6. Learning Service
- Purpose: generate skill roadmap, courses, milestones, tools, communities, mentorship path.

Implementation notes:
- JSON-only response contract is enforced through prompts.
- The OpenRouter service strips markdown code fences and extracts first valid JSON block.
- Multi-model fallback is implemented via OPENROUTER_MODELS.

Default model candidate list:
- openai/gpt-4o-mini
- openai/gpt-3.5-turbo
- mistralai/mistral-7b-instruct

### B) YouTube Data API v3
Endpoint:
- https://www.googleapis.com/youtube/v3/search

Used by:
- Learning Service only

Purpose:
- Fetch up to 5 tutorial videos related to project title + user type.

Behavior:
- If YOUTUBE_API_KEY is valid, enriches learning output with videoResources.
- If key is missing/invalid, returns an empty videoResources array without crashing workflow.

### C) Configured but Not Actively Used in Current Pipeline
Keys and base URLs exist in configuration but are not called by current service logic:
- OpenAI API
- Serper API
- Stripe API

## 6) Backend Request/Response Contract

### Base URL
- http://localhost:5000

### Health
- GET /health

### Main Workflow Endpoint
- POST /api/workflow

Request body:
{
  "idea": "Your startup/product idea",
  "userType": "student | founder | creator"
}

Validation rules:
- idea is required
- userType is required
- userType must be one of: student, founder, creator

### Success Response (Complete)
- success: true
- data.stage: COMPLETE
- data.pipeline: array of completed stage labels
- data.executionPackage: interrogation + validation + research + project + content + learning
- data.buildScore: decision summary
- data.nextSteps: merged list from project phases, learning milestones, validation recommendations

### Success Response (Terminated Early)
If validation.decision is KILL:
- stage: TERMINATED
- pipeline includes only completed pre-termination stages
- executionPackage contains interrogation + validation
- message explains pivot/abandon recommendation

### Error Codes
- 400: input validation failure
- 404: endpoint not found
- 500: workflow/service failure

## 7) Frontend UX Flow

The frontend currently includes:
- Landing view with product messaging and CTA
- Workflow form for idea + role
- Loading state with pipeline-progress simulation steps
- Structured output section with tab navigation and card-based rendering

Output tabs are generated from executionPackage keys and an overview tab.

## 8) Monorepo Structure

- backend/
  - server.js (server bootstrap)
  - src/app.js (Express app and middleware)
  - src/routes/workflow.route.js
  - src/controllers/workflow.controller.js
  - src/services/
    - workflow.service.js (orchestration)
    - openrouter.service.js (LLM API gateway)
    - interrogation.service.js
    - validation.service.js
    - research.service.js
    - project.service.js
    - content.service.js
    - learning.service.js
  - src/config/apiKeys.js
- frontend/
  - src/App.jsx (main UI, request flow, progress, output cards)
  - src/index.css (global styles + Tailwind entry)
  - vite.config.js

## 9) Environment Variables

Create backend/.env with at least:

PORT=5000
OPENROUTER_API_KEY=your_key_here

Optional and recommended:
OPENROUTER_MODELS=openai/gpt-4o-mini,openai/gpt-3.5-turbo,mistralai/mistral-7b-instruct
YOUTUBE_API_KEY=your_youtube_key

Configured optional placeholders:
OPENAI_API_KEY=
SERPER_API_KEY=
STRIPE_API_KEY=
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENAI_BASE_URL=https://api.openai.com/v1
SERPER_BASE_URL=https://google.serper.dev/search
YOUTUBE_BASE_URL=https://www.googleapis.com/youtube/v3
SERVICE_TIMEOUT_MS=30000
SERVICE_RETRIES=2
SERVICE_CACHE=false

## 10) Run Locally

### Terminal 1: Backend
cd backend
npm install
npm run dev

### Terminal 2: Frontend
cd frontend
npm install
npm run dev

Frontend URL:
- http://localhost:5173

Backend URL:
- http://localhost:5000

## 11) Scripts

### Backend
- npm start: start server
- npm run dev: start with nodemon

### Frontend
- npm run dev: Vite dev server
- npm run build: production build
- npm run lint: lint code
- npm run preview: preview production build

## 12) Practical Notes (PS)

- The backend is stateless and currently does not persist outputs in a database.
- Pipeline stages are sequential and synchronous from client perspective (single API call).
- AI outputs depend on model quality and prompt adherence; JSON extraction hardening is included in openrouter.service.js.
- YouTube enrichment is best-effort and non-blocking.
- Current frontend progress tracker is time-based simulation; for true realtime stage status, use WebSockets or Server-Sent Events from backend pipeline milestones.

## 13) Suggested Next Improvements

1. Add SSE/WebSocket events from backend for real progress per stage.
2. Add persistent storage for execution packages and history.
3. Add auth and per-user quotas.
4. Add retry/backoff + circuit-breaking around external APIs.
5. Add schema validation (zod/joi) for strict response contracts between services.
6. Add automated integration tests for COMPLETE and TERMINATED branches.

## 14) License

MIT
