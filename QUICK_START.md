# 🚀 Quick Start: Frontend-Backend Integration

## What's Ready

✅ **Frontend Updates:**
- InputBox component now accepts `idea` + `userType` (student/founder/creator)
- Integrated API service to call backend `/api/workflow` endpoint
- ResultCard displays full execution package with tabbed interface
- App.tsx renders workflow form + results on main landing page
- Environment variable configured: `REACT_APP_API_URL=http://localhost:5000`

✅ **Files Updated:**
- `frontend/src/components/InputBox.jsx` — now calls backend
- `frontend/src/components/ResultCard.jsx` — displays structured results
- `frontend/src/App.tsx` — integrated workflow section
- `frontend/src/services/api.js` — API gateway (new)
- `frontend/.env` — backend URL config (new)

---

## Testing Locally

### Step 1: Start Frontend (Already Running)

The frontend dev server should still be running on **http://localhost:5174**

If not:
```bash
cd frontend
npm run dev
```

### Step 2: Create Backend Structure

```bash
cd "c:\Users\vedic\OneDrive\Desktop\Project 2"
mkdir backend
cd backend
npm init -y
npm install express cors dotenv axios
npm install --save-dev nodemon
```

### Step 3: Create Backend Files

Create `backend/.env`:
```
PORT=5000
OPENROUTER_API_KEY=your_key_here
YOUTUBE_API_KEY=optional_key_here
```

Create `backend/server.js`:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/workflow', async (req, res) => {
  const { idea, userType } = req.body;

  if (!idea || !userType) {
    return res.status(400).json({ error: 'idea and userType are required' });
  }

  if (!['student', 'founder', 'creator'].includes(userType)) {
    return res.status(400).json({ error: 'userType must be: student, founder, or creator' });
  }

  try {
    // TODO: Implement actual workflow service
    // For now, return mock response
    res.json({
      success: true,
      stage: 'COMPLETE',
      pipeline: ['interrogation', 'validation', 'research', 'project', 'content', 'learning'],
      executionPackage: {
        interrogation: { problem: "...", targetUsers: "...", uniqueValue: "..." },
        validation: { decision: 'BUILD', confidence: 0.85, score: 82 },
        research: { trends: [], competitors: [], marketGap: "" },
        project: { phases: [], timeline: "", resources: "" },
        content: { pitch: "", messaging: "", socialPosts: [] },
        learning: { roadmap: [], courses: [], mentors: "" }
      },
      buildScore: 82,
      nextSteps: [
        'Validate with 10 target users',
        'Build MVP in 2 weeks',
        'Launch beta program'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Workflow execution failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
```

Create `backend/package.json` (update scripts):
```json
{
  "name": "build-or-kill-backend",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 4: Start Backend

```bash
cd backend
npm run dev
```

**You should see:**
```
✅ Backend running on http://localhost:5000
```

### Step 5: Test the Integration

1. Open **http://localhost:5174** in browser
2. Scroll to "Start Your Analysis" section
3. Fill the form:
   - Select user type: **founder** (or student/creator)
   - Enter idea: **"An AI tool that converts ideas into execution plans"**
   - Click **► Analyze Idea**

4. **Expected result within 2-5 seconds:**
   - Large BUILD/KILL decision displayed
   - Pipeline stages shown (interrogation ✓ validation ✓ etc.)
   - Tabbed interface with results from each stage
   - Next steps listed

---

## Next Steps

1. **Implement workflow orchestrator** (`backend/src/services/workflow.service.js`)
   - Interrogation service → extracts structured idea
   - Validation service → BUILD/KILL decision
   - Research service → market analysis
   - Project service → execution plan
   - Content service → marketing assets
   - Learning service → skill roadmap

2. **Connect to OpenRouter API** for LLM calls

3. **Add persistent storage** (database)

4. **Deploy to production** (Vercel + Render/Railway)

---

## Troubleshooting

**Error: "Failed to process idea"**
- Check backend is running on port 5000
- Verify `frontend/.env` has `REACT_APP_API_URL=http://localhost:5000`
- Check browser console for CORS errors

**Port already in use**
- Kill previous process: `netstat -ano | findstr :5000` (Windows)
- Or change `PORT=5001` in `.env`

**Blank results**
- Backend response may not match expected format
- Check `ResultCard.jsx` handling of `result` object structure

---

## Full Monorepo Structure

```
Project 2/
├── frontend/
│   ├── src/
│   │   ├── App.tsx ✅ [Updated - has InputBox + ResultCard]
│   │   ├── components/
│   │   │   ├── InputBox.jsx ✅ [Updated - calls backend]
│   │   │   ├── ResultCard.jsx ✅ [Updated - displays results]
│   │   │   └── sections/
│   │   │       ├── Hero.tsx ✅ [Updated - "Build or Kill AI"]
│   │   │       ├── Features.tsx ✅ [Updated - 6 pipeline stages]
│   │   │       ├── Pricing.tsx ✅ [Updated]
│   │   │       └── FAQ.tsx ✅ [Updated]
│   │   └── services/
│   │       └── api.js ✅ [New - API gateway]
│   ├── .env ✅ [New - REACT_APP_API_URL]
│   └── package.json
│
├── backend/
│   ├── server.js [Create]
│   ├── .env [Create]
│   ├── package.json [Create]
│   ├── src/
│   │   ├── services/
│   │   │   ├── workflow.service.js [TODO]
│   │   │   ├── interrogation.service.js [TODO]
│   │   │   ├── validation.service.js [TODO]
│   │   │   ├── research.service.js [TODO]
│   │   │   ├── project.service.js [TODO]
│   │   │   ├── content.service.js [TODO]
│   │   │   ├── learning.service.js [TODO]
│   │   │   └── openrouter.service.js [TODO]
│   │   ├── controllers/
│   │   │   └── workflow.controller.js [TODO]
│   │   └── routes/
│   │       └── workflow.route.js [TODO]
│
└── INTEGRATION_GUIDE.md ✅ [Reference doc]
```

---

**Your landing page is now ready to receive ideas and call the backend workflow API!** 🎯
