# Build or Kill AI – Frontend-Backend Integration Guide

## Overview
This guide connects the React frontend landing page to the backend workflow API and orchestrates the 6-stage pipeline.

---

## Part 1: Backend Setup (Node.js + Express)

### Step 1: Create Backend Folders

```bash
cd "c:\Users\vedic\OneDrive\Desktop\Project 2"
mkdir backend
cd backend
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express cors dotenv axios nodemon
npm install --save-dev nodemon
```

### Step 3: Create `.env` File

```
PORT=5000
OPENROUTER_API_KEY=your_openrouter_key_here
YOUTUBE_API_KEY=your_youtube_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
YOUTUBE_BASE_URL=https://www.googleapis.com/youtube/v3
SERVICE_TIMEOUT_MS=30000
SERVICE_RETRIES=2
```

### Step 4: Backend Server Structure

Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main workflow endpoint
app.post('/api/workflow', async (req, res) => {
  const { idea, userType } = req.body;

  // Validation
  if (!idea || !userType) {
    return res.status(400).json({ error: 'idea and userType are required' });
  }

  if (!['student', 'founder', 'creator'].includes(userType)) {
    return res.status(400).json({ error: 'userType must be: student, founder, or creator' });
  }

  try {
    // Import workflow orchestrator service
    const { runWorkflow } = require('./src/services/workflow.service');
    
    const result = await runWorkflow({ idea, userType });
    res.json(result);
  } catch (error) {
    console.error('Workflow error:', error);
    res.status(500).json({ error: 'Workflow execution failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
```

### Step 5: Update `backend/package.json`

```json
{
  "name": "build-or-kill-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 6: Run Backend

```bash
npm run dev
```

**Backend running on:** `http://localhost:5000`

---

## Part 2: Frontend Integration

### Step 1: Create API Service

Create `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function submitWorkflow(idea, userType) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/workflow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea, userType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Workflow failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
```

### Step 2: Update `frontend/.env`

```
REACT_APP_API_URL=http://localhost:5000
```

### Step 3: Modified InputBox Component

Replace `frontend/src/components/InputBox.jsx`:

```jsx
import React, { useState } from "react";
import { submitWorkflow } from "../services/api";

export default function InputBox({ onAnalyze, onLoading }) {
  const [idea, setIdea] = useState("");
  const [userType, setUserType] = useState("founder");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError("Please enter an idea");
      return;
    }

    setIsLoading(true);
    setError(null);
    onLoading?.(true);

    try {
      const result = await submitWorkflow(idea, userType);
      onAnalyze?.(result);
      setIdea("");
    } catch (err) {
      setError(err.message || "Failed to process idea");
      console.error(err);
    } finally {
      setIsLoading(false);
      onLoading?.(false);
    }
  };

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-accentSecondary to-accentTertiary rounded-none cyber-chamfer blur opacity-30 group-hover:opacity-50 transition duration-700 group-hover:duration-200 pointer-events-none" />
      
      <div className="relative flex flex-col bg-input border border-accent/40 cyber-chamfer p-4 shadow-[var(--box-shadow-neon-sm)]">
        
        {/* User Type Selector */}
        <div className="mb-4 flex gap-4">
          {["student", "founder", "creator"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value={type}
                checked={userType === type}
                onChange={(e) => setUserType(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4"
              />
              <span className="text-sm font-accent uppercase capitalize">{type}</span>
            </label>
          ))}
        </div>

        {/* Idea Input */}
        <textarea
          className="w-full bg-transparent text-accent font-mono p-4 resize-none outline-none text-lg min-h-[100px] placeholder:text-mutedForeground/70 cyber-glitch"
          placeholder="> Enter your idea... (e.g. A marketplace for trading custom CSS snippets)"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={isLoading}
          aria-label="Enter your idea"
        />

        {/* Error Message */}
        {error && (
          <div className="text-destructive text-sm mt-2 font-mono">> Error: {error}</div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!idea.trim() || isLoading}
          className="mt-4 px-5 py-3 rounded-none cyber-chamfer font-accent uppercase tracking-widest bg-accent text-background shadow-[var(--box-shadow-neon)] hover:brightness-110 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Submit idea"
        >
          {isLoading ? <span className="animate-pulse">Processing...</span> : "Analyze Idea"}
        </button>
      </div>

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-10" style={{background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)'}} />
    </div>
  );
}
```

### Step 4: Update Main App Component

Modify `frontend/src/App.tsx` to include workflow:

```typescript
import React, { useState } from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/sections/Footer';
import Workflow from './components/Workflow';
import InputBox from './components/InputBox';
import ResultCard from './components/ResultCard';

function App() {
  const [workflowResult, setWorkflowResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Workflow Pipeline Visualization */}
      <Workflow />
      
      {/* Idea Submission Form */}
      <section className="py-24 px-4 bg-background/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-center mb-12 cyber-glitch bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">
            Test Your Idea
          </h2>
          <InputBox 
            onAnalyze={setWorkflowResult}
            onLoading={setIsProcessing}
          />
          {workflowResult && <ResultCard result={workflowResult} />}
        </div>
      </section>
      
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
```

---

## Part 3: Deployment

### Local Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Site on http://localhost:5174
```

### Production Deployment

**Backend Options:**
- Heroku, Render, Railway, Fly.io, AWS Lambda

**Frontend Options:**
- Vercel, Netlify, AWS S3 + CloudFront

**CORS Configuration (Production):**
Update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
```

---

## Part 4: API Contract

### Request
```json
POST http://localhost:5000/api/workflow
{
  "idea": "A platform for AI model orchestration",
  "userType": "founder"
}
```

### Response (Complete)
```json
{
  "success": true,
  "stage": "COMPLETE",
  "pipeline": ["interrogation", "validation", "research", "project", "content", "learning"],
  "executionPackage": {
    "interrogation": {...},
    "validation": {...},
    "research": {...},
    "project": {...},
    "content": {...},
    "learning": {...}
  },
  "buildScore": 82,
  "nextSteps": [...]
}
```

### Response (Terminated - KILL Decision)
```json
{
  "success": true,
  "stage": "TERMINATED",
  "pipeline": ["interrogation", "validation"],
  "executionPackage": {
    "interrogation": {...},
    "validation": {...}
  },
  "message": "KILL decision reached. See recommendations in validation."
}
```

---

## Next Steps

1. ✅ Set up backend server
2. ✅ Implement workflow orchestration services (interrogation, validation, research, project, content, learning)
3. ✅ Connect OpenRouter API for LLM calls
4. ✅ Test full pipeline end-to-end
5. ✅ Deploy frontend and backend to production
