const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Build or Kill AI Backend running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/workflow`);
});
