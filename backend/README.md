# Build or Kill AI - Backend

A clean, minimal, and production-ready Node.js + Express backend for the AI workflow system.

## 📋 Overview

This backend processes user ideas through an intelligent AI workflow pipeline:

**Idea → Interrogation → Validation (Build/Kill) → Research → Project Plan → Content → Learning Path → Output**

## 🏗️ Architecture

```
backend/
├── src/
│   ├── routes/          # API endpoints
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic (7 workflow stages)
│   ├── config/           # Configuration & API keys
│   ├── utils/            # Helper functions
│   └── app.js            # Express app setup
├── server.js             # Entry point
└── package.json          # Dependencies
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Run the Server

```bash
npm start
```

Server runs on `http://localhost:5000`

### 3. Health Check

```bash
curl http://localhost:5000/health
```

## 📡 API Endpoint

### POST `/api/workflow`

Process an idea through the complete workflow pipeline.

**Request:**
```json
{
  "idea": "An AI tool that validates startup ideas in minutes",
  "userType": "founder"
}
```

**Response (on BUILD decision):**
```json
{
  "success": true,
  "data": {
    "ideaSummary": "string",
    "userType": "founder",
    "stage": "COMPLETE",
    "executionPackage": {
      "interrogation": {...},
      "validation": {...},
      "research": {...},
      "project": {...},
      "content": {...},
      "learning": {...}
    },
    "buildScore": {
      "marketPotential": 7.5,
      "confidenceLevel": 75,
      "decision": "BUILD"
    },
    "nextSteps": [...],
    "generatedAt": "2026-04-04T..."
  }
}
```

## 🔄 Workflow Pipeline

### 1. **Interrogation Service**
- Extracts problem from idea
- Identifies target users
- Assesses market size
- Lists assumptions and risks
- Generates follow-up questions

### 2. **Validation Service**
- Calculates viability score (0-10)
- Makes BUILD/KILL decision
- Provides reasoning and recommendations
- Score-based on market fit, user clarity, competitiveness

### 3. **Research Service**
- Identifies market trends
- Analyzes competitors
- Gathers user insights
- Spots market gaps
- Suggests pricing strategy
- Defines GTM strategy

### 4. **Project Service**
- Creates execution phases
- Generates timeline & milestones
- Lists features & resources
- Estimates budget
- Suggests team structure

### 5. **Content Service**
- Generates elevator pitch
- Creates landing page copy
- Writes social media posts
- Plans email sequences
- Defines marketing angles
- Generates tagline & core message

### 6. **Learning Service**
- Identifies required skills
- Recommends courses
- Lists learning resources
- Creates skill milestones
- Estimates learning hours
- Suggests mentorship

### 7. **Combined Output**
- All 6 stages combined
- Build/Kill decision honored
- Next steps personalized by userType
- Full execution package ready

## 👥 User Type Adaptation

Each service adapts output based on user type:

- **`student`** → Learning-focused, portfolio-building, zero-cost resources
- **`founder`** → Business-focused, fundraising, unit economics
- **`creator`** → Content-focused, audience growth, monetization

### Example: Same Idea, Different Output

**Input:** "Build an AI code generator"

**For Student:**
- Learning path: Full-stack web dev + AI/ML
- Resources: Free tier tools, YouTube, GitHub
- Timeline: 8 weeks
- Goal: Portfolio project

**For Founder:**
- Learning path: Business model + customer discovery
- Resources: Y Combinator, investor networks
- Timeline: 16 weeks
- Goal: Funded startup

**For Creator:**
- Learning path: Content strategy + audience growth
- Resources: Video production, audience engagement
- Timeline: 13 weeks
- Goal: Monetized content business

## 🎯 Early Kill Decision

If validation score < 6, request terminates early:

```json
{
  "success": true,
  "data": {
    "stage": "TERMINATED",
    "validation": {
      "decision": "KILL",
      "buildKillScore": 4.2,
      "reasoning": "..."
    },
    "message": "Idea did not pass validation. Recommended to pivot or abandon."
  }
}
```

## 📊 Service Response Examples

### Validation Service
```json
{
  "score": 7.5,
  "decision": "BUILD",
  "confidence": 75,
  "metrics": {
    "marketFit": 8,
    "technicalFeasibility": 7,
    "userClarity": 8,
    "competitiveAdvantage": 6,
    "executionCapability": 8
  }
}
```

### Research Service
```json
{
  "marketTrends": [...],
  "competitors": [...],
  "martketGaps": [...],
  "pricePoint": {...},
  "goToMarketStrategy": "..."
}
```

### Project Service
```json
{
  "phases": [
    {
      "phase": "MVP Development",
      "duration": "4 weeks",
      "tasks": [...],
      "deliverable": "..."
    }
  ],
  "timeline": "8 weeks",
  "budget": {...},
  "team": {...}
}
```

## 🛠️ Development

### Dev Mode (with nodemon)

```bash
npm run dev
```

### Project Structure Notes

- **No Database:** All data is in-memory (mock data) for hackathon
- **No Authentication:** Open API (add JWT later)
- **Modular Services:** Each stage is independent
- **Clean Async/Await:** All services use proper async patterns
- **Mock Data:** Realistic but simulated for demo purposes

## 🚀 Future Enhancements

- [ ] Real OpenAI integration for better interrogation
- [ ] Serper API for live market research
- [ ] Database (MongoDB/PostgreSQL) for persistence
- [ ] JWT authentication
- [ ] WebSocket for real-time progress
- [ ] Export to PDF/Word
- [ ] User accounts & history

## 📝 Code Style

- Clean, readable variable names
- Minimal but clear comments
- Proper async/await patterns
- Modular function design
- No over-engineering

## 🎓 Learning Resources

- ExpressJS: https://expressjs.com/
- Node.js: https://nodejs.org/docs/
- Async/Await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous

## 📦 Dependencies

- **express:** Web framework
- **cors:** Cross-origin support
- **axios:** HTTP client (future API calls)
- **dotenv:** Environment variables
- **nodemon:** Dev auto-reload

## 🤝 Contributing

Keep it clean, modular, and focused on the workflow pipeline.

---

**Built with ❤️ for hackers wanting to validate ideas faster.**
