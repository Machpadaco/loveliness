const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();   // Load environment variables

connectDB();       // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Loveliness Backend Running ✅');
});

// Sample API test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});