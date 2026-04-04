# Build or Kill AI - Sample API Requests

## Health Check
GET http://localhost:5000/health

---

## Workflow - Student Idea

POST http://localhost:5000/api/workflow
Content-Type: application/json

{
  "idea": "A platform that helps students learn web development by building real projects with AI guidance",
  "userType": "student"
}

---

## Workflow - Founder Idea

POST http://localhost:5000/api/workflow
Content-Type: application/json

{
  "idea": "An AI system that validates startup ideas and generates complete execution plans in minutes",
  "userType": "founder"
}

---

## Workflow - Creator Idea

POST http://localhost:5000/api/workflow
Content-Type: application/json

{
  "idea": "A content creation platform that helps creators plan, produce, and monetize their content",
  "userType": "creator"
}

---

## Kill Decision Example (Check the Response)

POST http://localhost:5000/api/workflow
Content-Type: application/json

{
  "idea": "Yet another generic note-taking app",
  "userType": "founder"
}

---

## CURL Examples

### Health Check
curl http://localhost:5000/health

### Workflow - Founder
curl -X POST http://localhost:5000/api/workflow \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "An AI system that validates startup ideas and generates complete execution plans in minutes",
    "userType": "founder"
  }'

### Workflow - Student
curl -X POST http://localhost:5000/api/workflow \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "A platform that helps students learn web development by building real projects with AI guidance",
    "userType": "student"
  }'

### Workflow - Creator
curl -X POST http://localhost:5000/api/workflow \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "A content creation platform that helps creators plan, produce, and monetize their content",
    "userType": "creator"
  }'

---

## Expected Response (BUILD Decision)

{
  "success": true,
  "data": {
    "ideaSummary": "Your idea here",
    "userType": "founder",
    "stage": "COMPLETE",
    "executionPackage": {
      "interrogation": {
        "problem": "...",
        "targetUsers": [...],
        "marketSize": {...},
        "riskFactors": [...]
      },
      "validation": {
        "score": 7.5,
        "decision": "BUILD",
        "confidence": 75,
        "metrics": {...}
      },
      "research": {
        "marketTrends": [...],
        "competitors": [...],
        "marketGaps": [...]
      },
      "project": {
        "phases": [...],
        "timeline": "16 weeks",
        "budget": {...}
      },
      "content": {
        "pitchSummary": "...",
        "landingPageCopy": {...},
        "socialMediaPosts": [...]
      },
      "learning": {
        "skillsRequired": [...],
        "courses": [...],
        "estimatedHours": 60
      }
    },
    "buildScore": {
      "marketPotential": 7.5,
      "confidenceLevel": 75,
      "decision": "BUILD"
    },
    "nextSteps": [...],
    "generatedAt": "2026-04-04T..."
  },
  "timestamp": "2026-04-04T..."
}

---

## Expected Response (KILL Decision)

{
  "success": true,
  "data": {
    "ideaSummary": "Your idea here",
    "userType": "founder",
    "stage": "TERMINATED",
    "validation": {
      "decision": "KILL",
      "score": 4.2,
      "confidence": 42,
      "reasoning": "This idea scored 4.2/10. Key concerns include market saturation or unclear user value proposition..."
    },
    "message": "Idea did not pass validation. Recommended to pivot or abandon."
  }
}

---

## Testing in Postman

1. Open Postman
2. Create a new POST request
3. URL: http://localhost:5000/api/workflow
4. Headers: Content-Type: application/json
5. Body (raw JSON):
{
  "idea": "Your idea here",
  "userType": "founder"
}
6. Send

---

## Common Response Codes

- 200: Success
- 400: Bad request (missing fields or invalid userType)
- 500: Server error
