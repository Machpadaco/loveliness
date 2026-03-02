const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Loveliness Backend Running ✅');
});

// Sample API test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});